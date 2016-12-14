angular.module('finalProject')
.controller('DesignsNewController', DesignsNewController)
.controller('DesignsIndexController', DesignsIndexController)
.controller('DesignsShowController', DesignsShowController)
.controller('DesignsEditController', DesignsEditController);



DesignsNewController.$inject = ['Design', 'Tile', 'Garden', '$state'];
function DesignsNewController(Design, Tile, Garden, $state) {
  const designsNew = this;
  designsNew.design = {};
  designsNew.design.garden_id = parseInt($state.params.id);
  designsNew.design.name = null;
  let designId = null;

  designsNew.selectedClass = 'grass';
  designsNew.myArr = new Array(200);
  const tiles = document.getElementById('designGrid').getElementsByTagName('li');
  designsNew.tile = {};

  Garden.get({ id: $state.params.id }, (garden) => {
    designsNew.design.name = garden.title;
  });



  function tilesCreate() {
    Garden.get({ id: $state.params.id }, (garden) => {
      designId = garden.design.id;
      for (let i=0; i < tiles.length; i++) {
        designsNew.tile = {};
        designsNew.tile.image = tiles[i].dataset.image;
        designsNew.tile.class_type = tiles[i].className;
        designsNew.tile.position = tiles[i].id;
        designsNew.tile.design_id = designId;
        Tile.save(designsNew.tile);
      }
      $state.go('itemsNew', {id: $state.params.id});
    });
  }

  function create() {
    Design.save(designsNew.design, () => {
      designsNew.tilesCreate();
    });
  }

  function setClass(texture) {
    designsNew.selectedClass = texture;
  }

  function setTile(index) {
    console.log(tiles[index].className);
    tiles[index].className = `${designsNew.selectedClass}`;
    tiles[index].dataset.image = designsNew.selectedPng;
    tiles[index].innerHTML = `<img src=${designsNew.selectedPng}>`;
    designsNew.selectedPng = 'http://downloads2.esri.com/support/TechArticles/blank256.png';
    console.log(tiles[index]);
  }

  function setPng(string) {
    designsNew.selectedPng = string;
    console.log(designsNew.selectedPng, string);
  }

  designsNew.selectedPng = 'http://downloads2.esri.com/support/TechArticles/blank256.png';
  this.setPng = setPng;
  this.tilesCreate = tilesCreate;
  this.create = create;
  this.setClass = setClass;
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

  function isCurrentUser() {
    return designsShow.design.user.id === $auth.getPayload().id;
  }

  function deleteDesign() {
    designsShow.design.$remove(() => {
      $state.go('designsIndex');
    });
  }
  this.isCurrentUser = isCurrentUser;
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
