var app = angular.module("wikiApp", ['ngRoute']);

app.controller('wikiAppController', function($scope){
    var waCrtl = this;
   
    // Current user database
    $scope.waCred = {
        id : 1,
        first : "Brandon",
        last : "Yee",
        email : "brandon.yee.vendor@crowncastle.com",
        password : "abc123"
    } 
    
    // are they signed in? not yet
    $scope.signedIn = false;
    
    waCrtl.logIn = function(){
        if (typeof $scope.waCred[waCrtl.email] != 'undefined' && $scope.waCred[waCrtl.email].password == waCrtl.password){
            $scope.signedIn = true;
        }
    }
});