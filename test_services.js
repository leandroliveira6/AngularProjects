//application
var app = angular.module('teste_services', []);

//services
app.factory('Messages', function(){
    var messages = {};

    messages.lista = [{id: 0, text: "Olá, mundo"}];

    messages.add = function(message){
        messages.lista.push({id: messages.lista.length, text: message});
    };

    return messages;
});

app.factory('Notify', ['$window', function(win) {
    var msgs = [];
    return function (msg) {
        msgs.push(msg);
        if (msgs.length === 3) {
            win.alert(msgs.join('\n'));
            msgs = [];
        }
    }
}]);

app.factory('BatchLog', ['$interval', '$log', function($interval, $log) {
    var messageQueue = [];

    function exibirMensagens() {
        if (messageQueue.length) {
            $log.log('BatchLog messages: ', messageQueue.toString());
            messageQueue = [];
        }
    }

    // start periodic checking
    $interval(exibirMensagens, 5000);

    return function(message) {
        messageQueue.push(message);
    }
}]);

//controllers
app.controller('ListaController', function(Messages){
    this.messages = Messages.lista;
});

app.controller('AddController', function ($scope, Messages){
    $scope.newMessage = "Digite aqui a mensagem";

    $scope.addMessage = function(message){
        Messages.add(message);
        $scope.newMessage = "Digite aqui a mensagem";
    };

    $scope.apagar = function(nome){
        $scope[nome] = '';
    };
});

app.controller('MyController', function ($scope,Notify,BatchLog){
    $scope.callNotify = function(msg) {
        Notify(msg);
        BatchLog(msg);
    };
});

app.controller('AdicionaERemoveController', function($scope) {
    var exprs = $scope.exprs = [];
    $scope.expr = '3*10|currency';

    $scope.addExp = function(expr) {
        exprs.push(expr);
    };

    $scope.removeExp = function(index) {
        exprs.splice(index, 1);
    };
});

app.controller('FormulariosController', function($scope) {
    $scope.master = {};
    $scope.lista = []

    $scope.update = function(user) {
        $scope.master = angular.copy(user);
        $scope.lista.push($scope.master)
    };

    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };

    $scope.reset();
});

//diretivas
app.directive('myEmail', function() {
    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@example\.com$/i;

    return {
        require: '?ngModel',
        link: function(scope, elm, attrs, ctrl) {
            // only apply the validator if ngModel is present and AngularJS has added the email validator
            if (ctrl && ctrl.$validators.email) {

                // this will overwrite the default AngularJS email validator
                ctrl.$validators.email = function(modelValue) {
                    return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
                };
            }
        }
    };
});