angular.module('finalProject')
  .factory('Design', Design);

Design.$inject = ['$resource', 'API_URL'];
function Design($resource, API_URL) {
  return new $resource(`${API_URL}/designs/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
