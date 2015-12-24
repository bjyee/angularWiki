var app = angular.module("wikiApp", ['ngRoute']);

// Controllers
app.controller('wikiAppController', function($scope){
    var waCrtl = this;
   
    // Current user database
    $scope.waCred = {
        id : 1,
        first : "Brandon",
        last : "Yee",
        email : "hi",
        password : "abc123"
    } 
    
    // are they signed in? not yet
    $scope.signedIn = false;
    
    waCrtl.logIn = function(){
        if ($scope.waCred.email.toLowerCase() == waCrtl.email.toLowerCase() && $scope.waCred.password == waCrtl.password){
            $scope.signedIn = true;
        }
    }
});

// Routes config
app.config(function($routeProvider){
    $routeProvider
        .when("/" ,{
            templateUrl : 'mainPage.html',
            controller : "mainPageController",
        })
        .when("/signUp", {
            templateUrl : 'signUp.html',
            controller : "signUpController",
        })
        .when("/search/:searchInput", {
            templateUrl : 'searchResults.html',
            controller : "searchResultsController",
        })
        .when("/article/:articleName", {
            templateUrl : 'articles.html',
            controller : "articlesController",
        })
        .when("/error/:errorNumber", {
            templateUrl : 'error.html',
            controller : "errorController",
        })
        
});