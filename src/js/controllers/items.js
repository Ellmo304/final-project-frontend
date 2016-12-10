angular.module('finalProject')
.controller('ItemsNewController', ItemsNewController)
.controller('ItemsIndexController', ItemsIndexController)
.controller('ItemsShowController', ItemsShowController)
.controller('ItemsEditController', ItemsEditController);



ItemsNewController.$inject = ['Item', '$state'];
function ItemsNewController(Item, $state) {
  const itemsNew = this;
  itemsNew.item = {};

  itemsNew.item.garden_ids = [];
  // itemsNew.item.garden_id = parseInt($state.params.id);

  itemsNew.item.garden_ids = [1,2,3];
  // itemsNew.item.garden_ids.push(itemsNew.item.garden_id);
  //
  // console.log(typeof $state.params.id, $state.params.id);
  // console.log(typeof itemsNew.item.garden_id, itemsNew.item.garden_id);
  function create() {
    console.log('item: ', itemsNew.item);
    Item.save(itemsNew.item, () => {
      $state.reload();
    });
  }
  itemsNew.create = create;
}




ItemsIndexController.$inject = ['Item'];
function ItemsIndexController(Item) {
  const itemsIndex = this;
  itemsIndex.all = Item.query();
}




ItemsShowController.$inject = ['Item', '$state', '$auth'];
function ItemsShowController(Item, $state, $auth) {
  const itemsShow = this;
  this.isLoggedIn = $auth.isAuthenticated;
  itemsShow.item = Item.get($state.params);
  // function isCurrentUser() {
  //   Item.get({ id: ($state.params) }, (item) => {
  //     itemsShow.item = item;
  //   });
  //   return itemsShow.item.user.id === $auth.getPayload().id;
  // }
  function deleteItem() {
    itemsShow.item.$remove(() => {
      $state.go('itemsIndex');
    });
  }
  this.deleteItem = deleteItem;
}




ItemsEditController.$inject = ['Item', '$state'];
function ItemsEditController(Item, $state) {
  const itemsEdit = this;
  itemsEdit.item = Item.get($state.params);

  function update() {
    itemsEdit.item.$update(() => {
      $state.go('itemsShow', $state.params);
    });
  }
  itemsEdit.update = update;
}
