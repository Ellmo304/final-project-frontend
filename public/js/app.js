"use strict";function Auth(e,t){e.loginUrl=t+"/login",e.signupUrl=t+"/register",e.tokenPrefix=""}function RegisterController(e,t){function n(){e.signup(r.user).then(function(){t.go("login")})}var r=this;r.user={},r.submit=n}function LoginController(e,t){function n(){e.login(r.credentials).then(function(){t.go("usersIndex")})}var r=this;r.credentials={},r.submit=n}function Comment(e,t){return new e(t+"/comments/:id",{id:"@id"},{update:{method:"PUT"}})}function CommentsNewController(e,t,n){function r(){console.log("comment: ",o.comment),e.save(o.comment,function(){t.reload()})}var o=this;o.comment={},o.comment.garden_id=parseInt(t.params.id),o.comment.user_id=parseInt(n.getPayload().id),o.create=r}function CommentsIndexController(e){var t=this;t.all=e.query()}function CommentsShowController(e,t,n){function r(){o.comment.$remove(function(){t.go("commentsIndex")})}var o=this;this.isLoggedIn=n.isAuthenticated,o.comment=e.get(t.params),this.deleteComment=r}function CommentsEditController(e,t){function n(){r.comment.$update(function(){t.go("commentsShow",t.params)})}var r=this;r.comment=e.get(t.params),r.update=n}function Design(e,t){return new e(t+"/designs/:id",{id:"@id"},{update:{method:"PUT"}})}function DesignsNewController(e,t,n,r){function o(){for(var e=n.get({id:r.params.id},function(){console.log(e.design)}),o=0;o<d.length;o++)a.tile.type=d[o].className,a.tile.position=d[o].id,a.tile.design_id=a.all[a.all.length-1]._id,t.save(a.tile);a.tile={}}function l(){e.save(a.design,function(){a.tilesCreate()})}function s(e){a.selectedClass=e}function i(e){d[e].className=""+a.selectedClass}var a=this;a.design={},a.design.garden_id=parseInt(r.params.id),a.design.name=n.get({id:r.params.id}),a.selectedClass="grass",a.myArr=new Array(200);var d=document.getElementById("designGrid").getElementsByTagName("li");a.tile={},this.tilesCreate=o,this.create=l,this.setClass=s,this.setTile=i}function DesignsIndexController(e){var t=this;t.all=e.query()}function DesignsShowController(e,t,n){function r(){o.design.$remove(function(){t.go("designsIndex")})}var o=this;this.isLoggedIn=n.isAuthenticated,o.design=e.get(t.params),this.deleteDesign=r}function DesignsEditController(e,t){function n(){r.design.$update(function(){t.go("designsShow",t.params)})}var r=this;r.design=e.get(t.params),r.update=n}function Garden(e,t){return new e(t+"/gardens/:id",{id:"@id"},{update:{method:"PUT"}})}function GardensNewController(e,t,n){function r(){e.save(o.garden,function(e){t.go("imagesNew",{id:e.id})})}var o=this;o.garden={},o.garden.user_id=n.getPayload().id,o.create=r}function GardensIndexController(e){var t=this;t.all=e.query()}function GardensShowController(e,t,n){function r(){o.garden.$remove(function(){t.go("gardensIndex")})}var o=this;this.isLoggedIn=n.isAuthenticated,o.garden=e.get(t.params),console.log(o.garden),this.deleteGarden=r}function GardensEditController(e,t){function n(){r.garden.$update(function(){t.go("gardensShow",t.params)})}var r=this;r.garden=e.get(t.params),r.update=n}function Image(e,t){return new e(t+"/images/:id",{id:"@id"},{update:{method:"PUT"}})}function ImagesNewController(e,t){function n(){e.save(o.image,function(){t.reload()})}function r(){t.go("designsNew",{id:t.params.id})}var o=this;o.image={},o.image.garden_id=t.params.id,o.addDesign=r,o.create=n}function Item(e,t){return new e(t+"/items/:id",{id:"@id"},{update:{method:"PUT"}})}function ItemsNewController(e,t){function n(){console.log("item: ",r.item),e.save(r.item,function(){t.reload()})}var r=this;r.item={},r.item.garden_ids=[],r.garden_id=parseInt(t.params.id),r.item.garden_ids.push(r.garden_id),r.create=n}function ItemsIndexController(e){var t=this;t.all=e.query()}function ItemsShowController(e,t,n){function r(){o.item.$remove(function(){t.go("itemsIndex")})}var o=this;this.isLoggedIn=n.isAuthenticated,o.item=e.get(t.params),this.deleteItem=r}function ItemsEditController(e,t){function n(){r.item.$update(function(){t.go("itemsShow",t.params)})}var r=this;r.item=e.get(t.params),r.update=n}function MainController(e,t,n){function r(){e.logout().then(function(){t.go("usersIndex")})}function o(n,r,o){(!e.isAuthenticated()&&s.includes(r.name)||"usersEdit"===r.name&&parseFloat(o.id)!==e.getPayload().id)&&(n.preventDefault(),t.go("login"))}var l=this;l.isLoggedIn=e.isAuthenticated,l.message=null;var s=["usersEdit"];n.$on("$stateChangeStart",o),l.logout=r}function Router(e,t){e.state("usersIndex",{url:"/users",templateUrl:"/templates/users/usersIndex.html",controller:"UsersIndexController as usersIndex"}).state("usersShow",{url:"/users/:id",templateUrl:"/templates/users/usersShow.html",controller:"UsersShowController as usersShow"}).state("usersEdit",{url:"/users/:id/edit",templateUrl:"/templates/users/usersEdit.html",controller:"UsersEditController as usersEdit"}).state("gardensNew",{url:"/gardens/new",templateUrl:"/templates/gardens/gardensNew.html",controller:"GardensNewController as gardensNew"}).state("gardensIndex",{url:"/gardens",templateUrl:"/templates/gardens/gardensIndex.html",controller:"GardensIndexController as gardensIndex"}).state("gardensShow",{url:"/gardens/:id",templateUrl:"/templates/gardens/gardensShow.html"}).state("gardensEdit",{url:"/gardens/:id/edit",templateUrl:"/templates/gardens/gardensEdit.html",controller:"GardensEditController as gardensEdit"}).state("imagesNew",{url:"/gardens/:id/imagesNew",templateUrl:"/templates/images/imagesNew.html",controller:"ImagesNewController as imagesNew"}).state("items",{url:"/gardens/:id/items",templateUrl:"/templates/items/itemsNew.html",controller:"ItemsNewController as itemsNew"}).state("itemsIndex",{url:"/items",templateUrl:"/templates/items/itemsIndex.html",controller:"ItemsIndexController as itemsIndex"}).state("itemsShow",{url:"/items/:id",templateUrl:"/templates/items/itemsShow.html",controller:"ItemsShowController as itemsShow"}).state("commentsIndex",{url:"/comments",templateUrl:"/templates/comments.html",controller:"CommentsIndexController as commentsIndex"}).state("designsNew",{url:"/gardens/:id/designsNew",templateUrl:"/templates/designs/designsNew.html",controller:"DesignsNewController as designsNew"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}),t.otherwise("/users")}function Tile(e,t){return new e(t+"/tiles/:id",{id:"@id"},{update:{method:"PUT"}})}function User(e,t){return new e(t+"/users/:id",{id:"@id"},{update:{method:"PUT"}})}function UsersIndexController(e){var t=this;t.all=e.query()}function UsersShowController(e,t,n){function r(){l.user.$remove(function(){t.go("usersIndex")})}function o(){return n.getPayload().id===Number(t.params.id)}var l=this;this.isLoggedIn=n.isAuthenticated,l.user=e.get(t.params),l.isCurrentUser=o,l.user=e.get(t.params),l.deleteUser=r}function UsersEditController(e,t){function n(){r.user.$update(function(){t.go("usersShow",t.params)})}var r=this;r.user=e.get(t.params),r.update=n}angular.module("finalProject",["ngResource","ui.router","satellizer"]).constant("API_URL","http://localhost:3000/api").config(Auth),Auth.$inject=["$authProvider","API_URL"],angular.module("finalProject").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("finalProject").factory("Comment",Comment),Comment.$inject=["$resource","API_URL"],angular.module("finalProject").controller("CommentsNewController",CommentsNewController).controller("CommentsIndexController",CommentsIndexController).controller("CommentsShowController",CommentsShowController).controller("CommentsEditController",CommentsEditController),CommentsNewController.$inject=["Comment","$state","$auth"],CommentsIndexController.$inject=["Comment"],CommentsShowController.$inject=["Comment","$state","$auth"],CommentsEditController.$inject=["Comment","$state"],angular.module("finalProject").factory("Design",Design),Design.$inject=["$resource","API_URL"],angular.module("finalProject").controller("DesignsNewController",DesignsNewController).controller("DesignsIndexController",DesignsIndexController).controller("DesignsShowController",DesignsShowController).controller("DesignsEditController",DesignsEditController),DesignsNewController.$inject=["Design","Tile","Garden","$state"],DesignsIndexController.$inject=["Design"],DesignsShowController.$inject=["Design","$state","$auth"],DesignsEditController.$inject=["Design","$state"],angular.module("finalProject").factory("Garden",Garden),Garden.$inject=["$resource","API_URL"],angular.module("finalProject").controller("GardensNewController",GardensNewController).controller("GardensIndexController",GardensIndexController).controller("GardensShowController",GardensShowController).controller("GardensEditController",GardensEditController),GardensNewController.$inject=["Garden","$state","$auth"],GardensIndexController.$inject=["Garden"],GardensShowController.$inject=["Garden","$state","$auth"],GardensEditController.$inject=["Garden","$state"],angular.module("finalProject").factory("Image",Image),Image.$inject=["$resource","API_URL"],angular.module("finalProject").controller("ImagesNewController",ImagesNewController),ImagesNewController.$inject=["Image","$state"],angular.module("finalProject").factory("Item",Item),Item.$inject=["$resource","API_URL"],angular.module("finalProject").controller("ItemsNewController",ItemsNewController).controller("ItemsIndexController",ItemsIndexController).controller("ItemsShowController",ItemsShowController).controller("ItemsEditController",ItemsEditController),ItemsNewController.$inject=["Item","$state"],ItemsIndexController.$inject=["Item"],ItemsShowController.$inject=["Item","$state","$auth"],ItemsEditController.$inject=["Item","$state"],angular.module("finalProject").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope"],angular.module("finalProject").config(Router),Router.$inject=["$stateProvider","$urlRouterProvider"],angular.module("finalProject").factory("Tile",Tile),Tile.$inject=["$resource","API_URL"],angular.module("finalProject").factory("User",User),User.$inject=["$resource","API_URL"],angular.module("finalProject").controller("UsersIndexController",UsersIndexController).controller("UsersShowController",UsersShowController).controller("UsersEditController",UsersEditController),UsersIndexController.$inject=["User"],UsersShowController.$inject=["User","$state","$auth"],UsersEditController.$inject=["User","$state"];
//# sourceMappingURL=app.js.map
