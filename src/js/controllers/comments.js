angular.module('finalProject')
.controller('CommentsNewController', CommentsNewController)
.controller('CommentsIndexController', CommentsIndexController)
.controller('CommentsShowController', CommentsShowController)
.controller('CommentsEditController', CommentsEditController);



CommentsNewController.$inject = ['Comment', '$state', '$auth'];
function CommentsNewController(Comment, $state, $auth) {
  const commentsNew = this;
  commentsNew.comment = {};

  commentsNew.comment.garden_id = parseInt($state.params.id);
  commentsNew.comment.user_id = parseInt($auth.getPayload().id);
  function create() {
    console.log('comment: ', commentsNew.comment);
    Comment.save(commentsNew.comment, () => {
      $state.reload();
    });
  }
  commentsNew.create = create;
}




CommentsIndexController.$inject = ['Comment'];
function CommentsIndexController(Comment) {
  const commentsIndex = this;
  commentsIndex.all = Comment.query();
}




CommentsShowController.$inject = ['Comment', '$state', '$auth'];
function CommentsShowController(Comment, $state, $auth) {
  const commentsShow = this;
  this.isLoggedIn = $auth.isAuthenticated;
  commentsShow.comment = Comment.get($state.params);
  // function isCurrentUser() {
  //   Comment.get({ id: ($state.params) }, (comment) => {
  //     commentsShow.comment = comment;
  //   });
  //   return commentsShow.comment.user.id === $auth.getPayload().id;
  // }
  function deleteComment() {
    commentsShow.comment.$remove(() => {
      $state.go('commentsIndex');
    });
  }
  this.deleteComment = deleteComment;
}




CommentsEditController.$inject = ['Comment', '$state'];
function CommentsEditController(Comment, $state) {
  const commentsEdit = this;
  commentsEdit.comment = Comment.get($state.params);

  function update() {
    commentsEdit.comment.$update(() => {
      $state.go('commentsShow', $state.params);
    });
  }
  commentsEdit.update = update;
}
