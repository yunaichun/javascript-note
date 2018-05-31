$(function () {

    var CarManager = {

        // 请求信息
        requestInfo: function (model, id) {
            return 'The information for ' + model +
        ' with ID ' + id + ' is foobar';
        },

        // 购买汽车
        buyVehicle: function (model, id) {
            return 'You have successfully purchased Item '
        + id + ', a ' + model;
        },

        // 组织view
        arrangeViewing: function (model, id) {
            return 'You have successfully booked a viewing of '
        + model + ' ( ' + id + ' ) ';
        }
    };
})();


CarManager.execute = function (command) {
    return CarManager[command.request](command.model, command.carID);
};


CarManager.execute({ request: "arrangeViewing", model: 'Ferrari', carID: '145523' });
CarManager.execute({ request: "requestInfo", model: 'Ford Mondeo', carID: '543434' });
CarManager.execute({ request: "requestInfo", model: 'Ford Escort', carID: '543434' });
CarManager.execute({ request: "buyVehicle", model: 'Ford Escort', carID: '543434' });