angular.module('myApp.orders')
    .filter( 'filterOrder', function() {
        return function(items, filter) {
            if (filter){
                filter = filter.toLowerCase();
                let filtered = items.filter(function (item) {
                    let celebrity = item.celebrities[item.celebrity_id];
                    let userEmail = item.user[Object.keys(item.user)[0]].email;
                    let recipientEmail = item.recipient[Object.keys(item.recipient)[0]].email;
                    let product = Object.keys(item.product_type)[0];
                    return item.$id.toLowerCase().search(filter) > -1 ||
                        celebrity.last_name.toLowerCase().search(filter) > -1 ||
                        item.status.toLowerCase().search(filter) > -1 ||
                        (userEmail ? userEmail.toLowerCase().search(filter) > -1 : false)||
                        (recipientEmail ? recipientEmail.toLowerCase().search(filter) > -1: false) ||
                        product.toLowerCase().search(filter) > -1;
                });
                return filtered;
            } else {
                return items
            }
        }
    });