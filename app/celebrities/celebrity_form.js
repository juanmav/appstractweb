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
function celebritiesFormCtrl($mdDialog, firebase, $firebaseArray, $firebaseObject, $rootScope, $scope) {
    console.log('Celebrity form!');

    setTimeout(function () {
        console.log('Para arriba!');
        document.getElementById('8080').parentElement.scrollTop = 0;
    }, 500);

    this.$onInit = function () {
        // Si no tengo item es creacion

        if (!this.item){
            this.item = {};

            this.item.gallery = {};
            this.item.gallery.IMG1 = {
                image_id : "IMG1",
                image_url: ""
            };
            this.item.gallery.IMG2 = {
                image_id : "IMG2",
                image_url: ""
            };

            this.item.created_at = new Date().toString();
            this.item.updated_at = new Date().toString();
            this.item.bio = "";
            this.item.email = "";
            this.item.profile_pic = "";

            this.item.last_name = "";
            this.item.first_name = "";
            this.item.type = "";

            this.item.celebrity_id= "";

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
        $rootScope.$broadcast('celebrityUpdated');
        $mdDialog.cancel();
    };

    this.save = function() {

        console.log('vamos a salvar!');

        if (this.item.$id){
            // Es un update
            this.items.$save(this.item).then(function(ref) {
                console.log('Item actualizado');
                console.log(ref);
                $mdDialog.hide();
            });
        } else {
            // Es una creacion
            this.items.$add(this.item).then((ref) => {
                console.log('Item agregado');
                firebase.database().ref().child("celebrities/" + ref.key).update({celebrity_id : ref.key});
                $rootScope.$broadcast('celebrityUpdated');
                $mdDialog.hide();
            });
        }
    };

    this.uploadImages = function () {
        let profilepicFile = document.getElementById("profilepic").files[0];
        let image1File = document.getElementById("image1").files[0];

        if (profilepicFile){
            let uploadTask = firebase.storage().ref().child(profilepicFile.name).put(profilepicFile);
            this.uploadingProfilePic = true;
            uploadTask.on('state_changed', (snapshot) =>{
                console.log(snapshot);
            }, (error) =>{
                console.error(error);
                this.uploadingProfilePic = false;
            }, () => {
                console.log(uploadTask.snapshot.downloadURL);
                this.item.profile_pic = uploadTask.snapshot.downloadURL;
                this.uploadingProfilePic = false;
                $scope.$apply();

            });
        }

        if (image1File){

            let uploadTask2 = firebase.storage().ref().child(image1File.name).put(image1File);
            this.uploadingIMG1 = true;
            uploadTask2.on('state_changed', (snapshot) =>{
                console.log(snapshot);
            }, (error) =>{
                console.error(error);
                this.uploadingIMG1 = false;
            }, () => {
                console.log(uploadTask2.snapshot.downloadURL);
                this.item.gallery.IMG1.image_url = uploadTask2.snapshot.downloadURL;
                this.uploadingIMG1 = false;
                $scope.$apply();
            });
        }
    }
}
