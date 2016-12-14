angular.module('finalProject')
.controller('CarouselDemoCtrl', CarouselDemoCtrl);


CarouselDemoCtrl.$inject = ['$scope', 'Garden', '$state'];
function CarouselDemoCtrl($scope, Garden, $state) {
  const myCarousel = this;
  $scope.slides = [];
  $scope.myInterval = 3000;


  Garden.get({ id: $state.params.id }, (thisGarden) => {
    for(let i = 0; i < thisGarden.images.length; i++) {
      $scope.slides.push(thisGarden.images[i]);
    }
  });


}
