angular.module('finalProject')
.controller('ItemsNewController', ItemsNewController)
.controller('ItemsIndexController', ItemsIndexController)
.controller('ItemsShowController', ItemsShowController)
.controller('ItemsEditController', ItemsEditController);



ItemsNewController.$inject = ['Item', '$state'];
function ItemsNewController(Item, $state) {
  const itemsNew = this;
  itemsNew.item = {};
  itemsNew.displayedResults = [];
  itemsNew.searchTerm = null;

  function searchAmazon() {
    itemsNew.displayedResults = [];
    itemsNew.itemsSearched = null;
    Item.search({query: itemsNew.searchTerm }).$promise.then((data) => {
      itemsNew.itemsSearched = data.ItemSearchResponse.Items.Item;
      for (let i = 0; i < itemsNew.itemsSearched.length; i++) {
        itemsNew.displayedResults.push({
          name: itemsNew.itemsSearched[i].ItemAttributes.Title,
          image: itemsNew.itemsSearched[i].LargeImage.URL,
          description: itemsNew.itemsSearched[i].ItemAttributes.Feature[0],
          price: itemsNew.itemsSearched[i].ItemAttributes.ListPrice.FormattedPrice
        });
      }
    });
  }

  function createNew(item) {
    item.garden_ids = [];
    item.item_type = itemsNew.item_type;
    item.garden_ids.push(parseInt($state.params.id));
    Item.save(item, () => {
      $state.reload();
    });
  }

  this.createNew = createNew;
  this.searchAmazon = searchAmazon;
  itemsNew.item.garden_ids = [];
  itemsNew.garden_id = parseInt($state.params.id);
  itemsNew.item.garden_ids.push(itemsNew.garden_id);

  function create() {
    console.log('item: ', itemsNew.item);
    Item.save(itemsNew.item, () => {
      $state.reload();
    });
  }

  itemsNew.create = create;
}




ItemsIndexController.$inject = ['Item', 'Garden', '$state'];
function ItemsIndexController(Item, Garden, $state) {
  const itemsIndex = this;
  itemsIndex.all = Item.query();

  function addItem(item) {
    console.log(item);
    Garden.get($state.params, (garden) => {
      console.log(garden);
      item.garden_ids.push(garden.id);
      item.$update();
      $state.reload();
    }
  );}
  this.addItem = addItem;
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
