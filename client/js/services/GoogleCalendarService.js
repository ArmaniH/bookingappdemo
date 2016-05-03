angular.module('GoogleCalendarService', [], function($provide){

	$provide.factory('$googleCalendar', function($http, $q){

		var $scope = angular.element(document).scope();

		//the url where our node.js application is located
		var baseUrl = 'http://localhost:7000/google';

		return {
			getEvents: function(){
				var defer = $q.defer();

				$http.get(baseUrl+'/events').then(function(response){

					console.log(response);

					if(response.status == 200){
						$scope.$broadcast('GoogleEventsReceived', response.data.items);
						defer.resolve(response.data.items);
					}

					else{
						$scope.$broadcast('GoogleError', response.data);
						defer.reject(response.data);
					}

				});

				return defer.promise;
			},
			addEvent: function(scheduledDate, endDate, contactInfo){
				var defer = $q.defer();

				var postData = {
					startdate: scheduledDate,
					enddate: endDate,
					contact: contactInfo
				};

				$http.post(baseUrl+'/event', postData, {'Content-Type':  'application/json'}).then(function(response){
					console.log('Add Event Response:', response);

					if(response.status == 200){
						$scope.$broadcast('eventAddedSuccess', response.data);
						defer.resolve(response.data);
					}
					else{
						$scope.$broadcast('GoogleError', response.data);
						defer.reject(response.data)
					}
				});

				return defer.promise;
			},

			updateEvent: function(scheduledDate, endDate, contactInfo){
				var defer = $q.defer();

				var getData = {
					startdate: scheduledDate,
					enddate: endDate,
					contact: contactInfo
				};

				$http.update(baseUrl+'/event', updateData, {'Content-Type':  'application/json'}).then(function(response){
					console.log('Update Event Response:', response);

					if(response.status == 200){
						$scope.$broadcast('eventUpdatedSuccess', response.data);
						defer.resolve(response.data);
					}
					else{
						$scope.$broadcast('GoogleError', response.data);
						defer.reject(response.data)
					}
				});

				return defer.promise;
			},


			deleteEvent: function(){
				var defer = $q.defer();

				$http.delete(baseUrl+'/event').then(function(response){

					console.log(response);

					if(response.status == 200){
						$scope.$broadcast('GoogleEventDeleted', response.data.items);
						defer.resolve(response.data.items);
					}

					else{
						$scope.$broadcast('GoogleError', response.data);
						defer.reject(response.data);
					}

				});

				return defer.promise;
			},
		};

	});

})
