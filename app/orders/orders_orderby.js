angular.module('myApp.orders')
    .filter( 'orderOrderBy', function(lodash) {
        return function(items, filter) {

            let reverse = filter.search('-') > -1;
            let ordered = items;

            if (filter.search('id') > -1){
                 ordered = lodash.sortBy(items, function (item) {
                    return parseInt(item.$id.split('QWER')[1]);
                });
            }

            if (filter.search('status') > -1){
                ordered = lodash.sortBy(items, 'status');
            }

            if (filter.search('name') > -1){
                ordered = lodash.sortBy(items, function (item) {
                    return item.celebrities[Object.keys(item.celebrities)[0]].last_name
                })
            }

            if (filter.search('usermail') > -1){
                ordered = lodash.sortBy(items, function (item) {
                    return item.user[Object.keys(item.user)[0]].email;
                })
            }

            if (filter.search('recipientemail') > -1){
                ordered = lodash.sortBy(items, function (item) {
                    return item.recipient[Object.keys(item.recipient)[0]].email;
                })
            }

            if (filter.search('product') > -1){
                ordered = lodash.sortBy(items, function (item) {
                    return Object.keys(item.product_type)[0]
                })
            }

            if (reverse) ordered.reverse();
            return ordered;
        }
    });