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
}).directive('sendChange', function (){
	return {
		scope: {},
		link: function(scope, element) {
			$(element).change(function(){
				console.log(element);
				$(element).closest("form").find("[type='submit']").click();
			});
		}
	}
}).controller('MainCtrl', ["$scope", "$timeout", "$location", "$anchorScroll", function($scope, $timeout, $location, $anchorScroll){
	var self = this;

	self.BOT = "Bot";
	self.SOMEONE = "Someone";

	self.messages = [{who: self.BOT, text: "O que posso fazer por voce hoje?"}];
	$scope.messages = self.messages;
	self.responses = [{who: self.SOMEONE, text: "Quero comer"}];
	self.step = 0;

	self.possibleResponses = [
		[{who: self.SOMEONE, text: "Quero comer"}, {who: self.SOMEONE, text: "Não quero comer"}],
		[{who: self.SOMEONE, text: "Sim!"}, {who: self.SOMEONE, text: "Não..."}],
		[{who: self.SOMEONE, text: "Sim!"}, {who: self.SOMEONE, text: "Não..."}]	
	];
	self.questions = [
		{who: self.BOT, text: "Voce quer comer? Tem certeza?"},
		{who: self.BOT, text: "Ok"},
		{who: self.BOT, text: "Ok"}	
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
			self.step++;
			self.responses = self.possibleResponses[self.step];
		}, 3000);
	}

}]);
