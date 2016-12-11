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
  designsNew.design.name = Garden.get({ id: $state.params.id }) ;

  designsNew.selectedClass = 'grass';
  designsNew.myArr = new Array(200);
  const tiles = document.getElementById('designGrid').getElementsByTagName('li');
  designsNew.tile = {};


  function tilesCreate() {
    // designsNew.all = Design.query();
    const x = Garden.get({ id: $state.params.id }, () => {
      console.log(x.design);
    });
    for (let i=0; i < tiles.length; i++) {
      designsNew.tile.type = tiles[i].className;
      designsNew.tile.position = tiles[i].id;
      designsNew.tile.design_id = designsNew.all[designsNew.all.length-1]._id;
      Tile.save(designsNew.tile);
    }
    designsNew.tile = {};
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
    // console.log(tiles[index].className);
    tiles[index].className = `${designsNew.selectedClass}`;
  }
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
  // console.log(designsShow.design);

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
