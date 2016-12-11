angular.module('finalProject')
  .controller('TilesIndexController', TilesIndexController);


TilesIndexController.$inject = ['Tile'];
function TilesIndexController(Tile) {
  const tilesIndex = this;
  tilesIndex.all = Tile.query();
}
