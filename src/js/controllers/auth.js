angular.module('finalProject')
  .controller('RegisterController', RegisterController)
  .controller('LoginController', LoginController)
  .controller('LandingController', LandingController);


RegisterController.$inject = ['$auth', '$state'];
function RegisterController($auth, $state) {
  const register = this;
  document.getElementById('myMainBg').style.backgroundImage = 'url("http://www.abroughtondesign.com/wp-content/uploads/2015/04/SAMPLE-PHOTO.jpg")';

  register.user = {};

  function submit() {
    $auth.signup(register.user)
    .then(() => {
      $state.go('login');
    });
  }

  register.submit = submit;
}


LoginController.$inject = ['$auth', '$state'];
function LoginController($auth, $state) {
  const login = this;
  document.getElementById('myMainBg').style.backgroundImage = 'url("http://www.gardenclublondon.co.uk/wp-content/uploads/2012/08/small-garden-design-London.jpg")';


  login.credentials = {};

  function submit() {
    $auth.login(login.credentials)
    .then(() => {
      $state.go('gardensIndex');
    });
  }

  login.submit = submit;
}

function LandingController() {
  document.getElementById('myMainBg').style.backgroundImage = 'url("http://www.echinopsgardendesign.co.uk/wordpress/wp-content/uploads/2012/03/long_thin_garden.jpg")';
}
