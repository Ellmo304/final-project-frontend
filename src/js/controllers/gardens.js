angular.module('finalProject')
.controller('GardensNewController', GardensNewController)
.controller('GardensIndexController', GardensIndexController)
.controller('GardensShowController', GardensShowController)
.controller('GardensEditController', GardensEditController);



GardensNewController.$inject = ['Garden', '$state', '$auth'];
function GardensNewController(Garden, $state, $auth) {
  const gardensNew = this;
  gardensNew.garden = {};
  gardensNew.garden.user_id = $auth.getPayload().id;

  function create() {
    Garden.save(gardensNew.garden, (garden) => {
      $state.go('imagesNew', {id: garden.id});
    });
  }
  gardensNew.create = create;
}




GardensIndexController.$inject = ['Garden', '$auth', '$state'];
function GardensIndexController(Garden, $auth, $state) {
  const gardensIndex = this;
  gardensIndex.all = Garden.query();


  function like(id) {
    Garden.get({id: id}, (garden) => {
      const likeUser = ($auth.getPayload().id).toString();
      if(garden.likes.indexOf(likeUser) === -1) {
        garden.likes.push(likeUser);
      }
      garden.$update();
    });
    setTimeout(function(){
      $state.reload();
    }, 500);
  }

  this.like = like;
}




GardensShowController.$inject = ['Garden', '$state', '$auth', 'Comment', 'Item'];
function GardensShowController(Garden, $state, $auth, Comment, Item) {
  const gardensShow = this;
  // const commentsAll = Comment.query();
  this.isLoggedIn = $auth.isAuthenticated;
  Garden.get($state.params, (garden) => {
    gardensShow.garden = garden;
    getGardenRating(garden);
    slideInterval();
  });

  var slideInterval = setInterval(nextSlide,8000);


  function showDesign(id) {
    $state.go('designsShow', {id: id});
  }

  function isCurrentUser() {
    return gardensShow.garden.user.id === $auth.getPayload().id;
  }

  function deleteGarden() {
    gardensShow.garden.$remove(() => {
      $state.go('gardensIndex');
    });
  }

  function destroyComment(comment) {
    Comment.get(comment, (thiscomment) => {
      thiscomment.$remove();
      $state.reload();
    });
  }

  function getPoster(post) {
    Comment.get({id: post}, (comment) => {
      const author = comment.user.username;
      return { author };
    });
  }

  function isCommentPoster(comment) {
    return comment.user_id === $auth.getPayload().id;
  }

  function removeItem(item) {
    Item.get(item, (thisItem) => {
      const index = thisItem.garden_ids.indexOf(parseInt($state.params.id));
      thisItem.garden_ids.splice(index, 1);
      thisItem.$update();
      gardensShow.garden.$update();
    });
  }

  function getGardenRating(garden) {
    for (let i = 0; i < garden.comments.length; i++) {
      gardensShow.sum += garden.comments[i].rating;
    }
    gardensShow.gardenRating = Math.floor(gardensShow.sum / garden.comments.length);
  }

  var currentSlide = 0;
  this.slides = document.querySelectorAll('#slides .slide');
  console.log(this.slides);




  function nextSlide(){
    gardensShow.slides[currentSlide].className = 'slide';
    currentSlide = (currentSlide+1)%gardensShow.slides.length;
    gardensShow.slides[currentSlide].className = 'slide showing';
  }

  this.getPoster = getPoster;
  gardensShow.sum = 0;
  this.gardenRating = 0;
  this.removeItem = removeItem;
  this.isCommentPoster = isCommentPoster;
  this.destroyComment = destroyComment;
  this.isCurrentUser = isCurrentUser;
  this.showDesign = showDesign;
  this.deleteGarden = deleteGarden;
}




GardensEditController.$inject = ['Garden', '$state', 'Image'];
function GardensEditController(Garden, $state, Image) {
  const gardensEdit = this;
  gardensEdit.garden = Garden.get($state.params);

  function update() {
    gardensEdit.garden.$update(() => {
      $state.go('gardensShow', $state.params);
    });
  }

  function deleteImage(image) {
    Image.get({id: image.id}, (thisImage) => {
      thisImage.$remove(() => {
        gardensEdit.garden.$update();
        $state.reload();
      });
    });
  }

  this.deleteImage = deleteImage;
  gardensEdit.update = update;
}
