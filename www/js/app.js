// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('todo', ['ionic'])

  .factory('Projects', function() {
    return {
      all: function() {
        var projectString = window.localStorage['projects'];
        if(projectString) {
          return angular.fromJson(projectString);
        }
        return [];
      },
      save: function(projects) {
        window.localStorage['projects'] = angular.toJson(projects);
      },
      newProject: function(projectTitle) {
        return {
          title: projectTitle,
          tasks: []
        };
      },
      getLastActiveIndex: function() {
        return parseInt(window.localStorage['lastActiveProject']) || 0;
      },
      setLastActiveIndex: function(index) {
        window.localStorage['lastActiveProject'];
      }
    }
  })

  .controller('TodoController', function($scope, $timeout, $ionicModal, Projects, $ionicSideMenuDelegate) {
    var createProject = function(projectTitle) {
      var newProject = Projects.newProject(projectTitle);
      $scope.projects.push(newProject);
      Projects.save($scope.projects);
      $scope.selectProject(newProject, $scope.projects.length-1);
    }

    $scope.projects = Projects.all();

    $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

    $scope.newProject = function() {
      var projectTitle = prompt('Project next');
      if(projectTitle) {
        createProject(projectTitle);
      }
    };

    $scope.selectProject = function(project, index) {
      $scope.activeProject = project;
      Projects.setLastActiveIndex(index);
      $ionicSideMenuDelegate.toggleLeft(false);
    };

    $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
      $scope.taskModal = modal;
    }, {
      scope: $scope
    });

    $scope.createTask = function(task) {
      if(!$scope.activeProject || !task) {
        return;
      }
      $scope.activeProject.tasks.push({
        title: task.title
      });
      $scope.taskModal.hide();

      Projects.save($scope.projects);

      task.title = '';
    }
    $scope.tasks = []; //task in tasks

    $scope.newTask = function() {
      $scope.taskModal.show();
    };

    $scope.closeNewTask = function() {
      $scope.taskModal.hide();
    };
  });

// .run(function($ionicPlatform) {
//   $ionicPlatform.ready(function() {
//     // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//     // for form inputs)
//     if(window.cordova && window.cordova.plugins.Keyboard) {
//       cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//     }
//     if(window.StatusBar) {
//       StatusBar.styleDefault();
//     }
//   });
// })
