angular.module('chatApp', []);
angular.module('chatApp', [])
.directive('scrollBottom', function(){
	return {
		scope: {
			messages: "=scrollBottom"
		},
		link: function(scope, element) {
			scope.$watch(function () {
				$(element).scrollTop($(element)[0].scrollHeight + 100);
			});
		}
	}
}).directive('toggle', function (){
	return {
		link: function(scope, element, attrs) {
			$(element).click(function(){

				$("[" + attrs.toggle + "]").slideToggle();
			});
		}
	}
}).controller('MainCtrl', ["$scope", "$timeout", "$location", "$anchorScroll", function($scope, $timeout, $location, $anchorScroll){
	var self = this;

	self.BOT = "Bot";
	self.SOMEONE = "Someone";

	self.messages = [{who: self.BOT, text: "Bom dia! O que posso fazer por voce hoje?"}];
	$scope.messages = self.messages;
	self.responses = [{who: self.SOMEONE, text: "Informações sobre empreendimento"}, {who: self.SOMEONE, text: "Reclamações"}];
	self.step = 0;

	self.possibleResponses = [
		[{who: self.SOMEONE, text: "Rio de Janeiro"}, {who: self.SOMEONE, text: "São Paulo"}],
		[{who: self.SOMEONE, text: "1"}, {who: self.SOMEONE, text: "2"}, {who: self.SOMEONE, text: "3"}],
		[{who: self.SOMEONE, text: "Vila agostina, por favor"}],
		[{who: self.SOMEONE, text: "Sim"}, {who: self.SOMEONE, text: "Não"}],
		[{who: self.SOMEONE, text: "Hoje"}, {who: self.SOMEONE, text: "Amanhã"}],
		[{who: self.SOMEONE, text: "10 horas"}, {who: self.SOMEONE, text: "11 horas"}]
	];
	self.questions = [
		{who: self.BOT, text: "Terei pazer em ajudá-lo. Em que cidade você está procurando empreendimentos?"},
		{who: self.BOT, text: "Você está procurando um apartemento com quantos quartos?"},
		{who: self.BOT, text: "Encontrei empreendimentos nos seguintes bairros:\n - Vila agostina"},
		{who: self.BOT, text: "Temos unidades na Reserva Juruá. Vamos marcar uma visita?"},
		{who: self.BOT, text: "Quando você prefere?"},
		{who: self.BOT, text: "Que horas?"},
		{who: self.BOT, text: "Muito bom! Agradecemos a preferência! Estaremos a sua espera!"}
	];

	self.nextStep = function(newMessage){
		self.showMessage(newMessage);
		
	};

	self.showMessage = function(newMessage){

		self.messages.push({who: newMessage.who || self.SOMEONE, text: newMessage.text});
		newMessage.text = "";
		self.responses = [];
		$timeout(function(){
			self.messages.push(self.questions[self.step]);
			self.responses = self.possibleResponses[self.step];
			self.step++;
		}, 3000);
	}

}]);
