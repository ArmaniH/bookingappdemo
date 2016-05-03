'use strict';

app.controller('MainController', ['$scope','$googleCalendar','$config','Auth','$location','$modal',
						function($scope, $googleCalendar, $config, Auth, $location, $modal) {


	//================================================================================
	// Variables
	//================================================================================
	$scope.events = [];
	$scope.durations = [
		{label:'Quarter Day (2 hours)', hours:2},
		{label:'Half Day (4 hours)', hours:4},
		{label:'Full Day (8 hours)', hours:8}
	];

	var addEventModal = $modal({
		title: 'Add Event',
		template: 'partials/addEventModal.html',
		show: false,
		animation: 'am-fade-and-scale',
		scope: $scope
	});

	var editEventModal = $modal({
		title: 'Edit Event',
		template: 'partials/editEventModal.html',
		show: false,
		animation: 'am-fade-and-scale',
		scope: $scope
	});

	//================================================================================
	// Scope Functions
	//================================================================================
	$scope.getEvents = function() {
		$googleCalendar.getEvents().then(function(events) {
			console.log(events);
			$scope.events = events;
		});
	};
	$scope.getEvents();
	//Add Event
	$scope.showAddEventModal = function() {
		addEventModal.$promise.then(addEventModal.show);
	};

	$scope.setCurrentEvent = function(event) {
		$scope.currentEvent = event;
	};

	$scope.addEvent = function() {

		console.log('Start Date:', $scope.event.startDate);

		//format end date/time object in to google format
		var endDate = new Date($scope.event.startDate);
		endDate.setHours(endDate.getHours() + $scope.event.duration.hours);
		console.log('End Date:', endDate);

		$googleCalendar.addEvent($scope.event.startDate, endDate, $scope.contactInfo).then(function(result) {
			console.log('Add Event Result:', result);
			addEventModal.hide();
		});
	};
//Edit Event
	$scope.getEvents();
	$scope.showEditEventModal = function() {
		editEventModal.$promise.then(editEventModal.show);
	};

	$scope.setCurrentEvent = function(event) {
		$scope.currentEvent = event;
	};

	$scope.updateEvent = function() {

		console.log('Start Date:', $scope.event.startDate);

		//format end date/time object in to google format
		var endDate = new Date($scope.event.startDate);
		endDate.setHours(endDate.getHours() + $scope.event.duration.hours);
		console.log('End Date:', endDate);

		$googleCalendar.updateEvent($scope.event.startDate, endDate, $scope.contactInfo).then(function(result) {
			console.log('Update Event Result:', result);
			editEventModal.hide();
		});
	};
// $scope.deleteEvent = function(event){
// 	if (popupService.showPopup('Really delete this?')) {
// event.$delete(function(){
// 	console.log('Delete Event Result:', result);
// 		editEventModal.hide();
// 		});
// 	});
// };


	$scope.logout = function() {
		Auth.logout();
	};

}]);
