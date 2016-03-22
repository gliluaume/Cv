angular.module( 'ngCv.education', [
  'ui.router',
  'plusOne'
])


.config(function config($stateProvider) {
  $stateProvider.state('education', {
    url: '/education',
    views: {
      "main": {
        controller: 'EducationCtrl',
        templateUrl: 'education/education.tpl.html'
      }
    },
    data:{ pageTitle: 'Compétences' }
  });
})


.controller('EducationCtrl', function EducationCtrl($scope) {

})


.directive('educationDir', function() {
  return {
    restrict: 'E',
    templateUrl: 'education/education.tpl.html',
    controller : 'EducationCtrl'
  };
})

;