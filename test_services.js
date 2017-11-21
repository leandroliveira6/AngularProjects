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

    $scope.apagar = function(){
        $scope.newMessage = '';
    };
});

app.controller('MyController', function ($scope,Notify){
    $scope.callNotify = function(msg) {
        Notify(msg);
    };
});