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




GardensShowController.$inject = ['Garden', '$state', '$auth'];
function GardensShowController(Garden, $state, $auth) {
  const gardensShow = this;
  this.isLoggedIn = $auth.isAuthenticated;
  gardensShow.garden = Garden.get($state.params);
  console.log(gardensShow.garden);

  function showDesign(id) {
    $state.go('designsShow', {id: id});
  }

  // function isCurrentUser() {
  //   Garden.get({ id: ($state.params) }, (garden) => {
  //     gardensShow.garden = garden;
  //   });
  //   return gardensShow.garden.user.id === $auth.getPayload().id;
  // }
  function deleteGarden() {
    gardensShow.garden.$remove(() => {
      $state.go('gardensIndex');
    });
  }
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
