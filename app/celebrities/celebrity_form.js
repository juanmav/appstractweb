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

    setTimeout(function() {
        console.log('Para arriba!');
        document.getElementById('8080').parentElement.scrollTop = 0;
    }, 500);

    this.$onInit = function() {
        // Si no tengo item es creacion
        this.saving = false;

        if (!this.item) {
            this.item = {};

            this.item.gallery = {};
            this.item.gallery.IMG1 = {
                image_id: "IMG1",
                image_url: ""
            };
            this.item.gallery.IMG2 = {
                image_id: "IMG2",
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

            this.item.celebrity_id = "";

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

        this.saving = true;

        console.log('vamos a salvar!');

        this.uploadImages().then(() => {
            if (this.item.$id) {
                // Es un update
                this.items.$save(this.item).then(function(ref) {
                    console.log('Item actualizado');
                    console.log(ref);
                    $mdDialog.hide();
                });
            } else {
                // Es una creacion
                // Creo el usuario
                /*UserService.save({
                 "email" : this.item.email,
                 "emailVerified" : true,
                 "password": "nueva.123",
                 "displayName": this.item.first_name + ' ' + this.item.last_name
                 }).$promise
                 .then(() => {*/
                // Grabo la celebrity
                this.items.$add(this.item).then((ref) => {
                    console.log('Item agregado');
                    firebase.database().ref().child("celebrities/" + ref.key).update({
                        celebrity_id: ref.key
                    });
                    $rootScope.$broadcast('celebrityUpdated');
                    $mdDialog.hide();
                });
                /*})
                 .catch(e => {
                 console.log(e);
                 })*/
            }
        });
    };

    this.uploadImages = function() {
        let profilepicFile = this.picFile;
        let backgroundFile = this.backFile;
        let image2 = this.backFile2;

        let promise1 = new Promise((resolve, reject) => {
            if (profilepicFile) {
                let uploadTask = firebase.storage().ref().child(profilepicFile.name).put(profilepicFile);

                uploadTask.on('state_changed', (snapshot) => {
                    console.log(snapshot);

                    this.image1Total = snapshot.totalBytes;
                    this.image1Subtotal = snapshot.bytesTransferred;
                    this.totalSubUpload = this.image1Subtotal + this.image2Subtotal + this.image3Subtotal;

                    this.totalUpload = this.image1Total + this.image2Total + this.image3Total;
                    this.determinateValue = (this.totalSubUpload / this.totalUpload) * 100;
                }, (error) => {
                    console.error(error);

                    reject();
                }, () => {
                    console.log(uploadTask.snapshot.downloadURL);
                    this.item.profile_pic = uploadTask.snapshot.downloadURL;

                    $scope.$apply();
                    resolve();
                });
            } else { resolve(); }
        });

        let promise2 = new Promise((resolve, reject) => {
            if (backgroundFile) {

                let uploadTask2 = firebase.storage().ref().child(backgroundFile.name).put(backgroundFile);
                uploadTask2.on('state_changed', (snapshot) => {
                    console.log(snapshot);

                    this.image2Total = snapshot.totalBytes;
                    this.image2Subtotal = snapshot.bytesTransferred;
                    this.totalSubUpload = this.image1Subtotal + this.image2Subtotal + this.image3Subtotal;

                    this.totalUpload = this.image1Total + this.image2Total + this.image3Total;
                    this.determinateValue = (this.totalSubUpload / this.totalUpload) * 100;
                }, (error) => {
                    console.error(error);

                    reject();
                }, () => {
                    console.log(uploadTask2.snapshot.downloadURL);
                    this.item.gallery.IMG1.image_url = uploadTask2.snapshot.downloadURL;

                    $scope.$apply();
                    resolve();
                });
            } else { resolve(); }
        });

        let promise3 = new Promise((resolve, reject) => {
            if (backgroundFile) {

                let uploadTask3 = firebase.storage().ref().child(image2.name).put(image2);

                uploadTask3.on('state_changed', (snapshot) => {
                    console.log(snapshot);

                    this.image3Total = snapshot.totalBytes;
                    this.image3Subtotal = snapshot.bytesTransferred;
                    this.totalSubUpload = this.image1Subtotal + this.image2Subtotal + this.image3Subtotal;

                    this.totalUpload = this.image1Total + this.image2Total + this.image3Total;
                    this.determinateValue = (this.totalSubUpload / this.totalUpload) * 100;
                }, (error) => {
                    console.error(error);

                    reject();
                }, () => {
                    console.log(uploadTask3.snapshot.downloadURL);
                    this.item.gallery.IMG2.image_url = uploadTask3.snapshot.downloadURL;

                    $scope.$apply();
                    resolve();
                });
            } else { resolve(); }
        });

        return Promise.all([promise1, promise2, promise3]);
    }
}
