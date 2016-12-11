angular.module('finalProject')
.controller('ImagesNewController', ImagesNewController);
// .controller('ImagesIndexController', ImagesIndexController)
// .controller('ImagesShowController', ImagesShowController)
// .controller('ImagesEditController', ImagesEditController);



ImagesNewController.$inject = ['Image', '$state'];
function ImagesNewController(Image, $state) {
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
  imagesNew.addDesign = addDesign;
  imagesNew.create = create;
}
