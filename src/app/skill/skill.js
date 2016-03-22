angular.module( 'ngCv.skill', [
  'ui.router',
  'plusOne'
])


.config(function config($stateProvider) {
  $stateProvider.state('skill', {
    url: '/skill',
    views: {
      "main": {
        controller: 'SkillCtrl',
        templateUrl: 'skill/skill.tpl.html'
      }
    },
    data:{ pageTitle: 'Compétences' }
  });
})


.controller('SkillCtrl', function SkillCtrl($scope) {

})


.directive('skillDir', function() {
  return {
    restrict: 'E',
    templateUrl: 'skill/skill.tpl.html',
    controller : 'SkillCtrl'
  };
})

;

