# Login-logout-in-angularjs

AngularJS Login Controller

The login function exposed by the controller calls the Authentication Service to authenticate the username and password entered into the view.

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
	
	
AngularJS Login View

The Login View contains a small form with the usual fields for emailid and password, and some validation messages.

		<div class="container">
						
						<div class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12">
							<div class="login clearfix">
								<h4>Login</h4>    
								<form name="loginform" ng-submit="login()">
									<div class="header header-primary text-center">
										<div class="logo-container">
											<img src="../assets/img/now-logo.png" alt="">
										</div>
									</div>
									<div class="content">
										<div class="input-group form-group-no-border input-lg">
											<span class="input-group-addon">
												<i class="fa fa-envelope"></i>
											</span>
											<input type="email" name="email" ng-model="email" class="form-control" placeholder="Email..."  required/>
										</div>
                                        <div class="alert alert-danger" ng-show="loginform.email.$dirty && loginform.email.$invalid">
      										<span ng-show="loginform.email.$error.required">Email is required.</span>
      										<span ng-show="loginform.email.$error.email">Invalid email address.</span>
      									</div>
										<div class="input-group form-group-no-border input-lg">
											<span class="input-group-addon">
												<i class="fa fa-lock"></i>
											</span>
											<input type="password" name="pass" ng-model="pass" placeholder="Password..." ng-minlength="8" ng-maxlength="15" class="form-control" required/>
										</div>
                                        <div class="alert alert-danger" ng-show="loginform.pass.$dirty && loginform.pass.$invalid">
      										<span ng-show="loginform.pass.$error.required">Password is required.</span>
                                            <span ng-if="!loginform.pass.$valid">
                                            	<span ng-show="loginform.pass.$error.minlength">The length is too short.</span>
                                                <span ng-show="loginform.pass.$error.maxlength">The length is too long.</span>
                                            </span>
      									</div>
                                        <span class="badge" ng-bind-html="loginMessage"></span>
									</div>
									<div class="footer col-xs-12 text-center">
										<button type="submit" class="btn btn-success btn-simple btn-round btn-block" ng-disabled="loginform.$invalid">Log In</button>
									</div>
									<div class="col-xs-12">
										<h6 class="text-center">
											<a href="#/forgotpass" class="link">Forgot Password?</a>
										</h6>
									</div>
								</form>
							</div>
						</div>
			</div>


AngularJS App.js

The part of this file related to authentication is in the run function, when the app starts it checks if there's a localStorage containing user credentials meaning the user has already logged in, this is to keep the user logged in after a page refresh.

On each location change there's a check using checkAuth factory to verify that the user is logged in if trying to access a restricted page, if not they're redirected to the login page.

Write the following code to call factory after window.localStorage.getItem("isLoggedIn") because with eachtime page refresh isLoggedIn variable's value will be null and have to fetch the value from localstorage.
$scope.check = checkAuth.getuserInfo();

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
						controller : 'dashCtrl'
				})		

			} 
		]);		

		/* Create factory to Disable Browser Back Button only after Logout */
		app.factory("checkAuth", function($location,$rootScope){
		    return {
			getuserInfo : function(){
					if($rootScope.isLoggedIn === undefined || $rootScope.isLoggedIn === null){
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
	
		app.controller('dashCtrl', function($scope,$location,$rootScope,$http,checkAuth){		

			$rootScope.session = window.localStorage.getItem("SessionId");
			$rootScope.userName = window.localStorage.getItem("SessionName");
			$rootScope.isLoggedIn = window.localStorage.getItem("isLoggedIn");

			// Call checkAuth factory for cheking login details
			$scope.check = checkAuth.getuserInfo();

			$scope.logout = function () {
					window.localStorage.clear();
					$rootScope.isLoggedIn = false;
					$location.path("/");
			};

		});
	
	

