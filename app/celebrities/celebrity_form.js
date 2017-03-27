angular.module('myApp.users')
    .component('celebrityForm', {
        templateUrl: 'celebrities/celebrity_form.html',
        controller: celebritiesFormCtrl,
        bindings: {
            item: '<',
            items: '<'
        }
    });


// https://material.angularjs.org/latest/demo/dialog
// https://github.com/firebase/angularfire/issues/922
function celebritiesFormCtrl($mdDialog, firebase, $firebaseArray, $firebaseObject) {
    console.log('Celebrity form!');

    this.$onInit = function () {
        // Si no tengo item es creacion

        if (!this.item){
            this.item = {};

            $firebaseObject(firebase.database().ref().child("product_types/EN"))
                .$loaded((value) => {
                    this.item.product_types = {};
                    this.item.product_types.MEM = value.MEM;
                    this.item.product_types.EXP = value.EXP;
                    this.item.product_types.VIC = value.VIC;
                    this.item.product_types.VID = value.VID;
                })
        }
    };

    this.cancel = function() {
        console.log('cancelo');
        $mdDialog.cancel();
    };

    this.save = function() {

        console.log('vamos a salvar!');

        if (this.item.$id){
            // Es un update
            this.items.$save(this.item).then(function(ref) {
                console.log('Item actualizado');
                $mdDialog.hide();
            });
        } else {
            // Es una creacion
            console.log('por el add');
            this.items.$add(this.item).then(function(ref) {
                console.log('Item Agregado');

            });
            console.log('despues del add');
            $mdDialog.hide();
        }

    };
}
