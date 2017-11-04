var app = angular.module('loginApp',['ngRoute']);

app.config([ '$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {   
        $routeProvider
		
		.when('/',{
		  		templateUrl : 'view/login.html',
				controller : 'loginCtrl'
		})
		
		.when('/dashboard',{
		  		templateUrl : 'view/dashboard.html',
				controller : 'dashCtrl',
				resolve : {
					check : function(checkAuth){
						return checkAuth.getuserInfo();
					}
				}
		})
		
	} 
]);		

/* Create factory to Disable Browser Back Button only after Logout */
app.factory("checkAuth", function($location,$rootScope){
    return {
        getuserInfo : function(){
			if(!$rootScope.isLoggedIn){
				$location.path('/');
			}
		}
    };
});

app.controller('loginCtrl', function($scope,$location,$rootScope,$sce){
		$rootScope.isLoggedIn = false;
		$scope.login = function(){		
				if ($scope.loginform.$valid) {
					if($scope.email == 'admin@gmail.com' && $scope.pass == 'admin123')
					{
						alert('login successful');
						$rootScope.isLoggedIn = true;
						$scope.UserId = $scope.email;
						$scope.session = $scope.email;
						$scope.sessionName = 'admin';
						window.localStorage.setItem("SessionId", $scope.session);
						window.localStorage.setItem("SessionName", $scope.sessionName);
						window.localStorage.setItem("isLoggedIn", $scope.isLoggedIn);
						
						//userDetails.SessionId = $scope.session;
						
						$location.path('/dashboard');
					}
					else{
						$rootScope.isLoggedIn = false;
						window.localStorage.setItem("isLoggedIn", $rootScope.isLoggedIn);
						$scope.loginMessage = $sce.trustAsHtml('<i class="fa fa-exclamation-triangle"></i> check your email id and password');
						console.log($scope.loginMessage);
					}
				}
				
		} 
		
	});
	
	app.controller('dashCtrl', function($scope,$location,$rootScope,$http){
		
		$rootScope.session = window.localStorage.getItem("SessionId");
		$rootScope.userName = window.localStorage.getItem("SessionName");
		$rootScope.isLoggedIn = window.localStorage.getItem("isLoggedIn");
		
		
		$scope.logout = function () {
				window.localStorage.clear();
				$rootScope.isLoggedIn = false;
				$location.path("/");
		};
		
	});
	
	