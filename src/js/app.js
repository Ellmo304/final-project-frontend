angular.module('finalProject', ['ngResource', 'ui.router', 'satellizer', 'ui.bootstrap'])
  .constant('API_URL', window.location.hostname === 'localhost' ? 'http://localhost:3000/api' : '//my-garden-design-app.herokuapp.com/api/')
  .config(Auth);

Auth.$inject = ['$authProvider', 'API_URL'];
function Auth($authProvider, API_URL) {
  $authProvider.loginUrl = `${API_URL}/login`;
  $authProvider.signupUrl = `${API_URL}/register`;

  $authProvider.tokenPrefix = '';
}
