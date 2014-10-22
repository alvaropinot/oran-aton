'use strict';

/**
 * @ngdoc overview
 * @name cpuwebkitApp
 * @description
 * # cpuwebkitApp
 *
 * Main module of the application.
 */
angular
  .module('cpuwebkitApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'n3-pie-chart'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
