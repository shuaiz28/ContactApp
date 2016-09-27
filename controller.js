var app = angular.module("myApp", []);
app.controller("myController", function($scope, $http) {
	console.log("Hello form controller");

	var refresh = function() {
		//????????????????.then, nothing dispalyed    //send request to the server
		$http.get("/contactList").success(function(response) {
			console.log("I got the data I requested");
			$scope.contactList = response;
			$scope.contact = "";
		});
	};
/******* only used for retrieve data from controller
	person1 = {
		name: "leo1",
		email: "leo1@gmail.com",
		number: "111 111 1111"
	};
	person2 = {
		name: "leo2",
		email: "leo2@gmail.com",
		number: "211 111 1111"
	};
	person3 = {
		name: "leo3",
		email: "leo3@gmail.com",
		number: "311 111 1111"
	};
	var contactList = [person1, person2, person3];
	$scope.contactList = contactList;
******/

	refresh();

	$scope.addContact = function() {
		console.log($scope.contact);
		$http.post('/contactList', $scope.contact).success(function(response) {
			console.log(response);
			refresh();
		});
	};

	$scope.remove = function(id) {
		console.log(id);
		//alert("Are you sure to remove the contact?");
		$http.delete("/contactList/" + id).success(function(response) {
			refresh();
		});
	};

	$scope.edit = function(id) {
		console.log(id);
		$http.get("/contactList/" + id).success(function(response) {
			$scope.contact = response;
		});
	};

	$scope.update = function() {
		console.log($scope.contact._id);
		//$scope.contact will be sent to the server
		$http.put("/contactList/" + $scope.contact._id, $scope.contact).success(function(response) {
			refresh();
		});
	};

	$scope.deselect = function() {
		$scope.contact = "";
		refresh();
	};

	scope.validEmail = function(email) {
		var reg = /\S+@\S+\.\S+/;
		return reg.test(email);
	}

	scope.validPhone = function(phone) {
		var reg = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
		return reg.test(phone);
	}

});