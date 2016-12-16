angular.module('finalProject')
.controller('ImagesNewController', ImagesNewController);
// .controller('ImagesIndexController', ImagesIndexController)
// .controller('ImagesShowController', ImagesShowController)
// .controller('ImagesEditController', ImagesEditController);



ImagesNewController.$inject = ['Image', '$state', 'Garden'];
function ImagesNewController(Image, $state, Garden) {
  const imagesNew = this;
  imagesNew.image = {};
  imagesNew.image.garden_id = $state.params.id;
  // console.log($state.params.id);
  function create() {
    Image.save(imagesNew.image, () => {
      $state.reload();
    });
  }

  function addDesign() {
    $state.go('designsNew', {id: $state.params.id});
  }

  Garden.get({id: ($state.params.id)}, (garden) => {
    imagesNew.gardenImages = garden.images;
  });

  imagesNew.addDesign = addDesign;
  imagesNew.create = create;
}
