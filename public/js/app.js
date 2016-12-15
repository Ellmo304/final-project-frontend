"use strict";function Auth(e,t){e.loginUrl=t+"/login",e.signupUrl=t+"/register",e.tokenPrefix=""}function RegisterController(e,t){function n(){e.signup(r.user).then(function(){t.go("login")})}var r=this;r.user={},r.submit=n}function LoginController(e,t){function n(){e.login(r.credentials).then(function(){t.go("gardensIndex")})}var r=this;r.credentials={},r.submit=n}function MyCarouselController(e,t,n){this.galleryItems=[{content:"First",color:"#B3ECFF"},{content:"Second",color:"#BA415B"}],t.get({id:n.params.id},function(t){for(var n=0;n<t.images.length;n++)e.slides.push(t.images[n])})}function Comment(e,t){return new e(t+"/comments/:id",{id:"@id"},{update:{method:"PUT"}})}function CommentsNewController(e,t,n){function r(){console.log("comment: ",o.comment),e.save(o.comment,function(){t.reload()})}var o=this;o.comment={},o.comment.garden_id=parseInt(t.params.id),o.comment.user_id=parseInt(n.getPayload().id),o.create=r}function CommentsIndexController(e){var t=this;t.all=e.query()}function CommentsShowController(e,t,n){function r(){o.comment.$remove(function(){t.go("commentsIndex")})}var o=this;this.isLoggedIn=n.isAuthenticated,o.comment=e.get(t.params),this.deleteComment=r}function CommentsEditController(e,t){function n(){r.comment.$update(function(){t.go("commentsShow",t.params)})}var r=this;r.comment=e.get(t.params),r.update=n}function Design(e,t){return new e(t+"/designs/:id",{id:"@id"},{update:{method:"PUT"}})}function DesignsNewController(e,t,n,r){function o(){n.get({id:r.params.id},function(e){m=e.design.id;for(var n=0;n<u.length;n++)d.tile={},d.tile.image=u[n].dataset.image,d.tile.class_type=u[n].className,d.tile.position=u[n].id,d.tile.design_id=m,t.save(d.tile);r.go("itemsNew",{id:r.params.id})})}function s(){e.save(d.design,function(){d.tilesCreate()})}function l(e){d.selectedClass=e,d.selectedPng="http://downloads2.esri.com/support/TechArticles/blank256.png"}function i(e){console.log(u[e].className),u[e].className=""+d.selectedClass,u[e].dataset.image=d.selectedPng,u[e].innerHTML="<img src="+d.selectedPng+">",console.log(u[e])}function a(e){d.selectedPng=e,console.log(d.selectedPng,e)}var d=this;d.design={},d.design.garden_id=parseInt(r.params.id),d.design.name=null;var m=null;d.selectedClass="grass",d.myArr=new Array(200);var u=document.getElementById("designGrid").getElementsByTagName("li");d.tile={},n.get({id:r.params.id},function(e){d.design.name=e.title}),d.selectedPng="http://downloads2.esri.com/support/TechArticles/blank256.png",this.setPng=a,this.tilesCreate=o,this.create=s,this.setClass=l,this.setTile=i}function DesignsIndexController(e){var t=this;t.all=e.query()}function DesignsShowController(e,t,n){function r(){return s.design.user.id===n.getPayload().id}function o(){s.design.$remove(function(){t.go("designsIndex")})}var s=this;this.isLoggedIn=n.isAuthenticated,s.design=e.get(t.params),this.isCurrentUser=r,this.deleteDesign=o}function DesignsEditController(e,t){function n(){r.design.$update(function(){t.go("designsShow",t.params)})}var r=this;r.design=e.get(t.params),r.update=n}function Garden(e,t){return new e(t+"/gardens/:id",{id:"@id"},{update:{method:"PUT"},like:{method:"POST",url:t+"/gardens/:id/like"},unlike:{method:"POST",url:t+"/gardens/:id/unlike"}})}function GardensNewController(e,t,n){function r(){e.save(o.garden,function(e){t.go("imagesNew",{id:e.id})})}var o=this;o.garden={},o.garden.user_id=n.getPayload().id,o.create=r}function GardensIndexController(e,t,n){function r(e){e.$like(function(){n.reload()})}function o(e){e.$unlike(function(){n.reload()})}function s(e){var n=t.getPayload().id.toString(),r=e.likes;return r.indexOf(n)===-1}var l=this;l.all=e.query(),this.hasLiked=s,this.like=r,this.unlike=o}function GardensShowController(e,t,n,r,o){function s(e){t.go("designsShow",{id:e})}function l(){return h.garden.user.id===n.getPayload().id}function i(){h.garden.$remove(function(){t.go("gardensIndex")})}function a(e){r.get(e,function(e){e.$remove(),t.reload()})}function d(e){r.get({id:e},function(e){var t=e.user.username;return{author:t}})}function m(e){return e.user.id===n.getPayload().id}function u(e){o.get(e,function(e){var n=e.garden_ids.indexOf(parseInt(t.params.id));e.garden_ids.splice(n,1),e.$update(),h.garden.$update()})}function c(e){for(var t=0;t<e.comments.length;t++)h.sum+=e.comments[t].rating;h.gardenRating=Math.floor(h.sum/e.comments.length)}function g(){h.slides[f].className="slide",f=(f+1)%h.slides.length,h.slides[f].className="slide showing"}var h=this;this.isLoggedIn=n.isAuthenticated,e.get(t.params,function(e){h.garden=e,c(e),C()});var C=setInterval(g,8e3),f=0;this.slides=document.querySelectorAll("#slides .slide"),console.log(this.slides),this.getPoster=d,h.sum=0,this.gardenRating=0,this.removeItem=u,this.isCommentPoster=m,this.destroyComment=a,this.isCurrentUser=l,this.showDesign=s,this.deleteGarden=i}function GardensEditController(e,t,n){function r(){s.garden.$update(function(){t.go("gardensShow",t.params)})}function o(e){n.get({id:e.id},function(e){e.$remove(function(){s.garden.$update(),t.reload()})})}var s=this;s.garden=e.get(t.params),this.deleteImage=o,s.update=r}function Image(e,t){return new e(t+"/images/:id",{id:"@id"},{update:{method:"PUT"}})}function ImagesNewController(e,t){function n(){e.save(o.image,function(){t.reload()})}function r(){t.go("designsNew",{id:t.params.id})}var o=this;o.image={},o.image.garden_id=t.params.id,o.addDesign=r,o.create=n}function Item(e,t){return new e(t+"/items/:id",{id:"@id"},{update:{method:"PUT"},search:{url:t+"/items/search",method:"GET",params:{query:"@query"}}})}function ItemsNewController(e,t){function n(){s.displayedResults=[],s.itemsSearched=null,e.search({query:s.searchTerm}).$promise.then(function(e){s.itemsSearched=e.ItemSearchResponse.Items.Item;for(var t=0;t<s.itemsSearched.length;t++)s.displayedResults.push({name:s.itemsSearched[t].ItemAttributes.Title,image:s.itemsSearched[t].LargeImage.URL,description:s.itemsSearched[t].ItemAttributes.Feature[0],price:s.itemsSearched[t].ItemAttributes.ListPrice.FormattedPrice})})}function r(n){n.garden_ids=[],n.item_type=s.item_type,n.garden_ids.push(parseInt(t.params.id)),e.save(n,function(){t.reload()})}function o(){console.log("item: ",s.item),e.save(s.item,function(){t.reload()})}var s=this;s.item={},s.displayedResults=[],s.searchTerm=null,this.createNew=r,this.searchAmazon=n,s.item.garden_ids=[],s.garden_id=parseInt(t.params.id),s.item.garden_ids.push(s.garden_id),s.create=o}function ItemsIndexController(e,t,n){function r(e){console.log(e),t.get(n.params,function(t){console.log(t),e.garden_ids.push(t.id),e.$update()})}var o=this;o.all=e.query(),this.addItem=r}function ItemsShowController(e,t,n){function r(){o.item.$remove(function(){t.go("itemsIndex")})}var o=this;this.isLoggedIn=n.isAuthenticated,o.item=e.get(t.params),this.deleteItem=r}function ItemsEditController(e,t){function n(){r.item.$update(function(){t.go("itemsShow",t.params)})}var r=this;r.item=e.get(t.params),r.update=n}function MainController(e,t,n,r){function o(){e.logout().then(function(){t.go("landing")})}function s(n,o,s){r.get({id:parseFloat(s.id)},function(r){console.log(r),!e.isAuthenticated()&&i.includes(o.name)||i.indexOf(o.name)!==-1&&parseFloat(r.user.id)!==e.getPayload().id?(n.preventDefault(),t.go("login")):(!e.isAuthenticated()&&a.includes(o.name)||a.indexOf(o.name)!==-1&&parseFloat(s.id)!==e.getPayload().id)&&(n.preventDefault(),t.go("login"))})}var l=this;if(l.isLoggedIn=e.isAuthenticated,l.message=null,e.getPayload())return l.currentUser=e.getPayload().id;var i=["gardensEdit","itemsNew","imagesNew","designsNew"],a=["usersEdit"];n.$on("$stateChangeStart",s),l.logout=o}function Router(e,t){e.state("landing",{url:"/",templateUrl:"/templates/landing.html"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("usersIndex",{url:"/users",templateUrl:"/templates/users/usersIndex.html",controller:"UsersIndexController as usersIndex"}).state("usersShow",{url:"/users/:id",templateUrl:"/templates/users/usersShow.html",controller:"UsersShowController as usersShow"}).state("usersEdit",{url:"/users/:id/edit",templateUrl:"/templates/users/usersEdit.html",controller:"UsersEditController as usersEdit"}).state("gardensNew",{url:"/gardens/new",templateUrl:"/templates/gardens/gardensNew.html",controller:"GardensNewController as gardensNew"}).state("gardensIndex",{url:"/gardens",templateUrl:"/templates/gardens/gardensIndex.html",controller:"GardensIndexController as gardensIndex"}).state("gardensShow",{url:"/gardens/:id",templateUrl:"/templates/gardens/gardensShow.html"}).state("gardensEdit",{url:"/gardens/:id/edit",templateUrl:"/templates/gardens/gardensEdit.html",controller:"GardensEditController as gardensEdit"}).state("imagesNew",{url:"/gardens/:id/imagesNew",templateUrl:"/templates/images/imagesNew.html",controller:"ImagesNewController as imagesNew"}).state("itemsIndex",{url:"/items",templateUrl:"/templates/items/itemsIndex.html",controller:"ItemsIndexController as itemsIndex"}).state("itemsNew",{url:"/gardens/:id/items/new",templateUrl:"/templates/items/itemsNew.html"}).state("itemsShow",{url:"/items/:id",templateUrl:"/templates/items/itemsShow.html",controller:"ItemsShowController as itemsShow"}).state("commentsIndex",{url:"/comments",templateUrl:"/templates/comments.html",controller:"CommentsIndexController as commentsIndex"}).state("designsIndex",{url:"/designs",templateUrl:"/templates/designs/designsIndex.html",controller:"DesignsIndexController as designsIndex"}).state("designsNew",{url:"/gardens/:id/designsNew",templateUrl:"/templates/designs/designsNew.html",controller:"DesignsNewController as designsNew"}).state("designsShow",{url:"/designs/:id",templateUrl:"/templates/designs/designsShow.html",controller:"DesignsShowController as designsShow"}).state("tilesIndex",{url:"/tiles",templateUrl:"/templates/tilesIndex.html",controller:"TilesIndexController as tilesIndex"}),t.otherwise("/gardens")}function Tile(e,t){return new e(t+"/tiles/:id",{id:"@id"},{update:{method:"PUT"}})}function TilesIndexController(e){var t=this;t.all=e.query()}function User(e,t){return new e(t+"/users/:id",{id:"@id"},{update:{method:"PUT"}})}function UsersIndexController(e){var t=this;t.all=e.query()}function UsersShowController(e,t,n){function r(){s.user.$remove(function(){t.go("usersIndex")})}function o(){return n.getPayload().id===Number(t.params.id)}var s=this;this.isLoggedIn=n.isAuthenticated,s.user=e.get(t.params),s.isCurrentUser=o,s.user=e.get(t.params),s.deleteUser=r}function UsersEditController(e,t){function n(){r.user.$update(function(){t.go("usersShow",t.params)})}var r=this;r.user=e.get(t.params),r.update=n}angular.module("finalProject",["ngResource","ui.router","satellizer","ui.bootstrap"]).constant("API_URL","http://localhost:3000/api").config(Auth),Auth.$inject=["$authProvider","API_URL"],angular.module("finalProject").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("finalProject").controller("MyCarouselController",MyCarouselController),MyCarouselController.$inject=["$scope","Garden","$state"],angular.module("finalProject").factory("Comment",Comment),Comment.$inject=["$resource","API_URL"],angular.module("finalProject").controller("CommentsNewController",CommentsNewController).controller("CommentsIndexController",CommentsIndexController).controller("CommentsShowController",CommentsShowController).controller("CommentsEditController",CommentsEditController),CommentsNewController.$inject=["Comment","$state","$auth"],CommentsIndexController.$inject=["Comment"],CommentsShowController.$inject=["Comment","$state","$auth"],CommentsEditController.$inject=["Comment","$state"],angular.module("finalProject").factory("Design",Design),Design.$inject=["$resource","API_URL"],angular.module("finalProject").controller("DesignsNewController",DesignsNewController).controller("DesignsIndexController",DesignsIndexController).controller("DesignsShowController",DesignsShowController).controller("DesignsEditController",DesignsEditController),DesignsNewController.$inject=["Design","Tile","Garden","$state"],DesignsIndexController.$inject=["Design"],DesignsShowController.$inject=["Design","$state","$auth"],DesignsEditController.$inject=["Design","$state"],angular.module("finalProject").factory("Garden",Garden),Garden.$inject=["$resource","API_URL"],angular.module("finalProject").controller("GardensNewController",GardensNewController).controller("GardensIndexController",GardensIndexController).controller("GardensShowController",GardensShowController).controller("GardensEditController",GardensEditController),GardensNewController.$inject=["Garden","$state","$auth"],GardensIndexController.$inject=["Garden","$auth","$state"],GardensShowController.$inject=["Garden","$state","$auth","Comment","Item"],GardensEditController.$inject=["Garden","$state","Image"],angular.module("finalProject").factory("Image",Image),Image.$inject=["$resource","API_URL"],angular.module("finalProject").controller("ImagesNewController",ImagesNewController),ImagesNewController.$inject=["Image","$state"],angular.module("finalProject").factory("Item",Item),Item.$inject=["$resource","API_URL"],angular.module("finalProject").controller("ItemsNewController",ItemsNewController).controller("ItemsIndexController",ItemsIndexController).controller("ItemsShowController",ItemsShowController).controller("ItemsEditController",ItemsEditController),ItemsNewController.$inject=["Item","$state"],ItemsIndexController.$inject=["Item","Garden","$state"],ItemsShowController.$inject=["Item","$state","$auth"],ItemsEditController.$inject=["Item","$state"],angular.module("finalProject").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope","Garden"],angular.module("finalProject").config(Router),Router.$inject=["$stateProvider","$urlRouterProvider"],angular.module("finalProject").factory("Tile",Tile),Tile.$inject=["$resource","API_URL"],angular.module("finalProject").controller("TilesIndexController",TilesIndexController),TilesIndexController.$inject=["Tile"],angular.module("finalProject").factory("User",User),User.$inject=["$resource","API_URL"],angular.module("finalProject").controller("UsersIndexController",UsersIndexController).controller("UsersShowController",UsersShowController).controller("UsersEditController",UsersEditController),UsersIndexController.$inject=["User"],UsersShowController.$inject=["User","$state","$auth"],UsersEditController.$inject=["User","$state"];
//# sourceMappingURL=app.js.map
