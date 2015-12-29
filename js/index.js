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

app.controller('mainPageController', function($scope, $location){
    var mpCtrl = this;
    
    mpCtrl.search = function(){
        var input = mpCtrl.searchInput;
        if(input.length > 0){
            $location.path('/search/'+input)
        }
    }
});

app.controller('searchResultsController', function($scope, $location, $routeParams, articleSearch){
    $scope.params = $routeParams;
    articleSearch.searchArticles($routeParams.searchInput, function(articles){
        $scope.results = articles;
    })
});

app.controller('articlesController', function($scope, $location, $routeParams, articleSearch){
    $scope.params = $routeParams;
    articleSearch.loadArticle($routeParams.articleName, function(article){
        $scope.article = article;
    })
});

// Factory
// This factory holds the search logic
app.factory('articleSearch', function($http){
    'use strict';
    var service = {};
    var data = {};
    // normally this is a webservice call and they will return the results there.
    service.searchArticles = function(keyword, callback){
        $http({
            url : "data/articles.json",
            method : "GET",
        }).then(function successCallback(response){
            data = response.data;
            var results = [];
            var article = "";
            // now I need to search using the keyword and add it to the results array
            for(article in data.articles){
                var header = data.articles[article].header;
                if(header.toLowerCase().indexOf(keyword.toLowerCase()) != -1){
                    data.articles[article].url = header.toLowerCase().replace(/ /g,"_");;
                    results.push(data.articles[article]);
                }
            }
            callback(results);
        }, function errorCallback(response){
            console.log("ERROR. SHARKNADO 3: OH HELL NO")
        })
    }
    
    service.loadArticle = function(header, callback){
        
    }
    
    return service;
})

// Directive
// This directive is suppose to help auto-focus an input
app.directive('autoFocus', function($timeout) {
    return {
        restrict: 'AC',
        link: function(_scope, _element) {
            $timeout(function(){
                _element[0].focus();
            }, 0);
        }
    };
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