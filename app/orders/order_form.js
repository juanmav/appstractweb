angular.module('myApp.orders')
    .component('orderForm', {
        templateUrl: 'orders/order_form.html',
        controller: ordersFormCtrl,
        bindings: {
            item: '=',
            items: '='
        }
    });


// https://material.angularjs.org/latest/demo/dialog
/**
 * En este caso las orders solamente son un update.
 * Si fuera una creacion habria que verificar item != null
 * asi sabemos si es un alta o una edicion.
 * En este caso **siempre** es edicion.
 * */
function ordersFormCtrl($rootScope, $location, $mdDialog, firebase, $mdToast, AuthService) {
    console.log('Order form!');

    setTimeout(() => {
        this.item.dt_duedate = new Date(this.item.dt_duedate);
    }, 100);

    AuthService.checkLogin();

    this.cancel = function() {
        console.log('cancelo');
        $mdDialog.cancel();
    };

    // Update de los atributos de la Order.
    this.save = function() {
        console.log('Salvo');

        this.updateOrder();

        $mdDialog.hide();
    };


    this.askToConfirm = function(message) {
        var confirm = $mdDialog.confirm({
            title: 'Alert',
            ariaLabel: 'Alert',
            content: message,
            clickOutsideToClose: true,
            ok: 'Yes',
            cancel: 'Cancel'
        });

        return $mdDialog.show(confirm)
    };

    this.approve = function() {
        var newStatus = null;
        console.log(this.item.status);
        switch (this.item.status) {
            case 'on_hold':
            {
                newStatus = 'pending';
                break;
            }
            case 'produced':
            {
                newStatus = 'delivered';
                break;
            }
        }

        let message = 'Would you like to update the status from "' +
            this.item.status + '" to "' + newStatus + '"?';

        this.askToConfirm(message)
            .then(() => {
                updateOrderStatus(this.item, newStatus)
            })
            .catch(() => {
                console.log('Dijo que no');
            })
    };

    this.reject =  function () {
        var newStatus = null;
        switch (this.item.status) {
            case 'on_hold':
            {
                newStatus = 'rejected';
                break;
            }
            case 'produced':
            {
                newStatus = 'pending';
                break;
            }
        }

        let message = 'Would you like to update the status from "' + this.item.status + '" to "' + newStatus + '"?';

        this.askToConfirm(message).then(() => {
            updateOrderStatus(this.item, newStatus)
        })
    };

    function updateOrderStatus(order, newStatus) {
        firebase.database().ref().child("orders/" + order.order_id).once('value')
            .then(function(snapshot) {
                snapshot.ref.update({"status": newStatus})
                    .then(function (success) {
                        $mdToast.show($mdToast.simple().content('Order ' + order.order_id + ' has been updated successfully to status: ' + newStatus));
                        notifyUpdate();
                    })
                    .catch(function (err) {
                        $mdToast.show($mdToast.simple().content('Error on updating order ' + order.order_id + ' to status: ' + newStatus));
                    })
            });
    }

    function notifyUpdate() {
        $rootScope.$broadcast('orderUpdated');
    }


    this.updateOrder = function() {
        // Get original order
        this.item.dt_duedate = this.item.dt_duedate.toString();
        this.items.$save(this.item);

    };

    this.showChangeStateButtons = function() {
        return this.item.status == 'on_hold' || this.item.status == 'produced';
    };

    /**
     * Helpers para obtener las referencias reales.
     * */

    this.celebrity = function () {
        return getReal(this.item.celebrities);
    };

    this.recipient = function() {
        return getReal(this.item.recipient);
    };

    this.user = function () {
        return getReal(this.item.user);
    };

    function getReal(parent){
        return parent[Object.keys(parent)[0]]
    }
}

