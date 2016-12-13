angular.module('finalProject')
.factory('Item', Item);

Item.$inject = ['$resource', 'API_URL'];
function Item($resource, API_URL) {
  return new $resource(`${API_URL}/items/:id`, { id: '@id' }, {
    update: { method: 'PUT' },
    search: { url: `${API_URL}/items/search`,
      method: 'GET',
      params: {
        query: '@query'
      }
    }
  });
}
