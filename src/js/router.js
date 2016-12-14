angular.module('finalProject')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('landing', {
    url: '/',
    templateUrl: '/templates/landing.html'
  })
  .state('usersIndex', {
    url: '/users',
    templateUrl: '/templates/users/usersIndex.html',
    controller: 'UsersIndexController as usersIndex'
  })
  .state('usersShow', {
    url: '/users/:id',
    templateUrl: '/templates/users/usersShow.html',
    controller: 'UsersShowController as usersShow'
  })
  .state('usersEdit', {
    url: '/users/:id/edit',
    templateUrl: '/templates/users/usersEdit.html',
    controller: 'UsersEditController as usersEdit'
  })
  .state('gardensNew', {
    url: '/gardens/new',
    templateUrl: '/templates/gardens/gardensNew.html',
    controller: 'GardensNewController as gardensNew'
  })
  .state('gardensIndex', {
    url: '/gardens',
    templateUrl: '/templates/gardens/gardensIndex.html',
    controller: 'GardensIndexController as gardensIndex'
  })
  .state('gardensShow', {
    url: '/gardens/:id',
    templateUrl: '/templates/gardens/gardensShow.html'
    // controller: 'GardensShowController as gardensShow'
  })
  .state('gardensEdit', {
    url: '/gardens/:id/edit',
    templateUrl: '/templates/gardens/gardensEdit.html',
    controller: 'GardensEditController as gardensEdit'
  })
  .state('imagesNew', {
    url: '/gardens/:id/imagesNew',
    templateUrl: '/templates/images/imagesNew.html',
    controller: 'ImagesNewController as imagesNew'
  })
  .state('itemsIndex', {
    url: '/items',
    templateUrl: '/templates/items/itemsIndex.html',
    controller: 'ItemsIndexController as itemsIndex'
  })
  .state('itemsNew', {
    url: '/gardens/:id/items/new',
    templateUrl: '/templates/items/itemsNew.html'
    // controller: 'ItemsNewController as itemsNew'
  })
  .state('itemsShow', {
    url: '/items/:id',
    templateUrl: '/templates/items/itemsShow.html',
    controller: 'ItemsShowController as itemsShow'
  })
  .state('commentsIndex', {
    url: '/comments',
    templateUrl: '/templates/comments.html',
    controller: 'CommentsIndexController as commentsIndex'
  })
  .state('designsIndex', {
    url: '/designs',
    templateUrl: '/templates/designs/designsIndex.html',
    controller: 'DesignsIndexController as designsIndex'
  })
  .state('designsNew', {
    url: '/gardens/:id/designsNew',
    templateUrl: '/templates/designs/designsNew.html',
    controller: 'DesignsNewController as designsNew'
  })
  .state('designsShow', {
    url: '/designs/:id',
    templateUrl: '/templates/designs/designsShow.html',
    controller: 'DesignsShowController as designsShow'
  })
  .state('tilesIndex', {
    url: '/tiles',
    templateUrl: '/templates/tilesIndex.html',
    controller: 'TilesIndexController as tilesIndex'
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

  $urlRouterProvider.otherwise('/gardens');
}
