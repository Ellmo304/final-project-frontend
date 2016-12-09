angular.module('finalProject')
  .factory('Garden', Garden);

Garden.$inject = ['$resource', 'API_URL'];
function Garden($resource, API_URL) {
  return new $resource(`${API_URL}/gardens/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
