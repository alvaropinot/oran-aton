'use strict';



/**
 * @ngdoc function
 * @name cpuwebkitApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cpuwebkitApp
 */
angular.module('cpuwebkitApp')
  .controller('MainCtrl', function ($scope, $interval) {


    var os  = require('os-utils');
    var interval = 2;

    var colors = d3.scale.category10();

    /*var colors = {danger : "red",
                  warning : "orange",
                  ok : "steelblue"};
                  //"#2ca02c"*/

    var colors = ['steelblue', 'green', 'red', 'orange'];

	var exec = require('child_process').exec;
	exec('tasklist /V /FO CSV ', function(err, stdout, stderr) {
	  // stdout is a string containing the output of the command.
	  // parse it and look for the apache and mysql processes.
	  var lines = stdout.split('\n'),
	  	processes = [];
	  for(var i=0; i<lines.length; i++){
	  	processes.push(lines[i].split('",').map(function(e){
	  		return e.replace(/"/gi,'');
	  	}));
	  }
	  console.log(processes);


	  $scope.processes = processes;

	  //console.log(stdout);
	});

    //unix
    //os.harddrive();

    //Get the platform name
    $scope.platform = os.platform();

    //Get number of CPU
    $scope.cpuCount = os.cpuCount();



    //Get total memory
    $scope.totalMemory = (os.totalmem() / 1000).toFixed(2);




    $scope.gauge_options = {thickness: 2, mode: "gauge", total: 100};

    $scope.cpuUsage = [
      {label: "CPU", value: 0, suffix: "%", color: colors[0] }
    ];

    $scope.ramUsage = [
      {label: "RAM", value: 0, suffix: "%", color: colors[3] }
    ];




    $interval(function() {

      os.cpuUsage(function(v){
        $scope.cpuUsage[0].value = (v*100).toFixed(0);
        //$scope.cpuUsage[0].color = colors[Math.floor($scope.cpuUsage[0].value/100 * 4)];
      });


      //$scope.ramUsage[0].color = colors[Math.floor($scope.ramUsage[0].value/100 * 4)];

      //Get the number of miliseconds that the system has been running for.
      //$scope. = os.sysUptime();

      //Get the number of miliseconds that the process has been running for.
      //$scope. = os.processUptime()


      //Get current free memory
      $scope.freeMemory = (os.freemem() / 1000).toFixed(2);

      $scope.usedMemory = ($scope.totalMemory - $scope.freeMemory).toFixed(2);

      //Get a percentage reporesentinf the free memory
      $scope.ramUsage[0].value = (100 - os.freememPercentage()*100).toFixed(0);
      $scope.ramUsage[0].label = $scope.usedMemory + ' GB';// of ' + $scope.totalMemory + ' GB';



    }, (interval * 1000));




  });
