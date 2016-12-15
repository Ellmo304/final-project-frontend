angular.module('finalProject')
.controller('MainController', MainController);

MainController.$inject = ['$auth', '$state', '$rootScope', 'Garden'];
function MainController($auth, $state, $rootScope, Garden) {
  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;

  main.message = null;
  // main.isCurrentUser = isCurrentUser;

  
  main.currentUser = $auth.getPayload().id;


  // function isCurrentUser() {
  //   if ($auth.getPayload()) {
  //     return $auth.getPayload().id;
  //   }
  // }
  function logout() {
    $auth.logout()
    .then(() => {
      $state.go('landing');
    });
  }


  const protectedPages = ['gardensEdit', 'itemsNew', 'imagesNew', 'designsNew'];


  function protectPages(e, toState, toParams) {
    Garden.get({id: parseFloat(toParams.id)}, (myGarden) => {
      console.log(myGarden);
      if((!$auth.isAuthenticated() &&
      protectedPages.includes(toState.name)) ||
      (protectedPages.indexOf(toState.name) !== -1) && (parseFloat(myGarden.user.id) !== $auth.getPayload().id)) {
        e.preventDefault();
        $state.go('login');
      } else if ((!$auth.isAuthenticated() &&
      protectedStates.includes(toState.name)) ||
      (protectedStates.indexOf(toState.name) !== -1) && (parseFloat(toParams.id) !== $auth.getPayload().id)) {
        e.preventDefault();
        $state.go('login');
      }
    });
  }


  const protectedStates = ['usersEdit'];



  $rootScope.$on('$stateChangeStart', protectPages);

  main.logout = logout;
}
