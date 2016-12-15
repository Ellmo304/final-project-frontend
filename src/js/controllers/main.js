angular.module('finalProject')
.controller('MainController', MainController);

MainController.$inject = ['$auth', '$state', '$rootScope', 'Garden'];
function MainController($auth, $state, $rootScope, Garden) {
  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;

  main.message = null;
  // main.isCurrentUser = isCurrentUser;





  // if ($auth.getPayload()) {
  //   return $auth.getPayload().id;
  // }

  function logout() {
    $auth.logout()
    .then(() => {
      $state.go('landing');
    });
  }


  const protectedPages = ['gardensEdit', 'itemsNew', 'imagesNew', 'designsNew'];


  function protectPages(e, toState) {
    const payload = $auth.getPayload();
    if(payload) {
      main.currentUser = $auth.getPayload().id;
    }
    if(!$auth.isAuthenticated() &&
    protectedPages.includes(toState.name)) {
      e.preventDefault();
      $state.go('login');
    }

  }



  $rootScope.$on('$stateChangeStart', protectPages);

  main.logout = logout;
}
