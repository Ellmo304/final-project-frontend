angular.module('finalProject')
.controller('DesignsNewController', DesignsNewController)
.controller('DesignsIndexController', DesignsIndexController)
.controller('DesignsShowController', DesignsShowController)
.controller('DesignsEditController', DesignsEditController);



DesignsNewController.$inject = ['Design', '$state'];
function DesignsNewController(Design, $state) {
  const designsNew = this;
  designsNew.design = {};
  designsNew.design.garden_id = parseInt($state.params.id);
  designsNew.selectedClass = 'grass';
  designsNew.myArr = new Array(200);

  function create() {
    Design.save(designsNew.design, (design) => {
      $state.go('imagesNew', {id: design.id});
    });
  }

  function setClass(texture) {
    designsNew.selectedClass = texture;
  }

  function setTile(index) {
    console.log(designsNew.selectedClass);
    const tiles = document.getElementById('designGrid').getElementsByTagName('li');
    tiles[index].className = `${designsNew.selectedClass}`;
    console.log(tiles[index]);


  }
  this.setClass = setClass;
  this.create = create;
  this.setTile = setTile;
}




DesignsIndexController.$inject = ['Design'];
function DesignsIndexController(Design) {
  const designsIndex = this;
  designsIndex.all = Design.query();
}




DesignsShowController.$inject = ['Design', '$state', '$auth'];
function DesignsShowController(Design, $state, $auth) {
  const designsShow = this;
  this.isLoggedIn = $auth.isAuthenticated;
  designsShow.design = Design.get($state.params);
  console.log(designsShow.design);

  // function isCurrentUser() {
  //   Design.get({ id: ($state.params) }, (design) => {
  //     designsShow.design = design;
  //   });
  //   return designsShow.design.user.id === $auth.getPayload().id;
  // }
  function deleteDesign() {
    designsShow.design.$remove(() => {
      $state.go('designsIndex');
    });
  }
  this.deleteDesign = deleteDesign;
}




DesignsEditController.$inject = ['Design', '$state'];
function DesignsEditController(Design, $state) {
  const designsEdit = this;
  designsEdit.design = Design.get($state.params);

  function update() {
    designsEdit.design.$update(() => {
      $state.go('designsShow', $state.params);
    });
  }
  designsEdit.update = update;
}
