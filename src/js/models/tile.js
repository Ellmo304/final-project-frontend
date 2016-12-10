angular.module('finalProject')
  .factory('Tile', Tile);

Tile.$inject = ['$resource', 'API_URL'];
function Tile($resource, API_URL) {
  return new $resource(`${API_URL}/tiles/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
