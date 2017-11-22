var app = angular.module('app_teste', ['app_teste2']);
app.controller('MainCtrl', function ($scope){
    $scope.message = 'Olá, mundo!';

    $scope.updateMessage = function(message){
        $scope.message = message;
    };

    $scope.double = function(value){
        return value * 2;
    };
});

var app2 = angular.module('app_teste2', []);
aoo2.controller('SpicyController', function(){
    this.spice = 'very';

    this.chiliSpicy = function() {
        this.spice = 'chili';
    };

    this.jalapenoSpicy = function() {
        this.spice = 'jalapeño';
    };
});

