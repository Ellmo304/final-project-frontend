angular.module('finalProject')
.controller('ItemsNewController', ItemsNewController);
// .controller('ImagesIndexController', ImagesIndexController)
// .controller('ImagesShowController', ImagesShowController)
// .controller('ImagesEditController', ImagesEditController);



ItemsNewController.$inject = ['Item', '$state'];
function ItemsNewController(Item, $state) {
  const itemsNew = this;
  itemsNew.item = {};
  itemsNew.item.garden_id = $state.params.id;
  // console.log($state.params.id);
  function create() {
    Item.save(itemsNew.item, () => {
      $state.reload();
    });
  }
  itemsNew.create = create;
}
