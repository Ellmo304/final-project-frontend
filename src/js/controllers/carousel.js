angular.module('finalProject')
.controller('MyCarouselController', MyCarouselController);


MyCarouselController.$inject = ['$scope', 'Garden', '$state'];
function MyCarouselController($scope, Garden, $state) {
  const myCarousel = this;

  this.galleryItems = [
      {content: 'First', color: '#B3ECFF'},
      {content: 'Second', color: '#BA415B'}
  ];
  Garden.get({ id: $state.params.id }, (thisGarden) => {
    for(let i = 0; i < thisGarden.images.length; i++) {
      $scope.slides.push(thisGarden.images[i]);
    }
  });


}
