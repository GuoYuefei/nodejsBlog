/**
 * http://usejsdoc.org/
 */

var adminApp = angular.module('adminApp',['ngRoute','ngSanitize']);




adminApp.config(['$routeProvider',function($routeProvider){
    $routeProvider
    .when('/codeInsert.html',{templateUrl:'./code/codeInsert.html',controller:"codeInsert"})
    .when('/showAllCode.html',{templateUrl: './code/showAllCode.html',controller:'showAllCode'})
    .when('/uploadDBText.html',{templateUrl:'./databases/uploadDBText.html',controller:'uploadDBText'})
    .otherwise({redirectTo:'/'});
}]);

