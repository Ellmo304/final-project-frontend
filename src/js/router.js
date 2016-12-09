angular.module('finalProject')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('usersIndex', {
    url: '/users',
    templateUrl: '/templates/usersIndex.html',
    controller: 'UsersIndexController as usersIndex'
  })
  .state('usersShow', {
    url: '/users/:id',
    templateUrl: '/templates/usersShow.html',
    controller: 'UsersShowController as usersShow'
  })
  .state('usersEdit', {
    url: '/users/:id/edit',
    templateUrl: '/templates/usersEdit.html',
    controller: 'UsersEditController as usersEdit'
  })
  .state('gardensNew', {
    url: '/gardens/new',
    templateUrl: '/templates/gardensNew.html',
    controller: 'GardensNewController as gardensNew'
  })
  .state('gardensIndex', {
    url: '/gardens',
    templateUrl: '/templates/gardensIndex.html',
    controller: 'GardensIndexController as gardensIndex'
  })
  .state('gardensShow', {
    url: '/gardens/:id',
    templateUrl: '/templates/gardensShow.html',
    controller: 'GardensShowController as gardensShow'
  })
  .state('gardensEdit', {
    url: '/gardens/:id/edit',
    templateUrl: '/templates/gardensEdit.html',
    controller: 'GardensEditController as gardensEdit'
  })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'RegisterController as register'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'LoginController as login'
    });

  $urlRouterProvider.otherwise('/users');
}
