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

      /*var ref = firebase.database().ref().child('celebrities/' + this.item.celebrity_id);
      var celebrity = $firebaseObject(ref);

      celebrity.$save()
         .then(result => {
              console.log('Celebrity saved on Firebase');
          })
          .catch( e => {
              console.error(e);
          })*/

        $mdDialog.cancel();
    };
}
