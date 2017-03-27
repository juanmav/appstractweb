angular.module('myApp.users')
    .component('celebrityForm', {
        templateUrl: 'celebrities/celebrity_form.html',
        controller: celebritiesFormCtrl,
        bindings: {
            item: '='
        }
    });


// https://material.angularjs.org/latest/demo/dialog
function celebritiesFormCtrl($mdDialog, $firebaseObject, firebase) {
    console.log('Celebrity form!');

    this.cancel = function() {
        console.log('cancelo');
        $mdDialog.cancel();
    };

    this.save = function() {

      firebase.database().ref().child("celebrities/" + this.item.celebrity_id)
        .once('value')
        .then(function(snapshot) {
          var toUpdate = snapshot.val();

          toUpdate.type = data.video_url;

          // Save modified order
          return firebase.database().ref("celebrities/" + toUpdate.celebrity_id)
            .update(toUpdate);
        });

      $mdDialog.cancel();
    };
}
