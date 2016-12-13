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




GardensIndexController.$inject = ['Garden'];
function GardensIndexController(Garden) {
  const gardensIndex = this;
  gardensIndex.all = Garden.query();
}




GardensShowController.$inject = ['Garden', '$state', '$auth', 'Comment', 'Item'];
function GardensShowController(Garden, $state, $auth, Comment, Item) {
  const gardensShow = this;
  // const commentsAll = Comment.query();
  this.isLoggedIn = $auth.isAuthenticated;
  gardensShow.garden = Garden.get($state.params);
  // console.log(gardensShow.garden);

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

  function isCommentPoster(comment) {
    return comment.user_id === $auth.getPayload().id;
  }

  function removeItem(item) {
    Item.get(item, (thisItem) => {
      var index = thisItem.garden_ids.indexOf(parseInt($state.params.id));
      thisItem.garden_ids.splice(index, 1);
      thisItem.$update();
      gardensShow.garden.$update();
      $state.reload();
    });
  }

  this.removeItem = removeItem;
  this.isCommentPoster = isCommentPoster;
  this.destroyComment = destroyComment;
  this.isCurrentUser = isCurrentUser;
  this.showDesign = showDesign;
  this.deleteGarden = deleteGarden;
}




GardensEditController.$inject = ['Garden', '$state'];
function GardensEditController(Garden, $state) {
  const gardensEdit = this;
  gardensEdit.garden = Garden.get($state.params);

  function update() {
    gardensEdit.garden.$update(() => {
      $state.go('gardensShow', $state.params);
    });
  }
  gardensEdit.update = update;
}
