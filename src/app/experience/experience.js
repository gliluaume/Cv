angular.module( 'ngCv.experience', [
  'ui.router',
  'plusOne',
  //'ngAnimate',
  'ngScrollSpy',
  'ngCv.experience.cap-afse-cti',
  'ngCv.experience.cap-afse-iwfm',
  'ngCv.experience.cap-afp',
  'ngCv.experience.cap-universal',
  'ngCv.experience.cap-sfr',
  'ngCv.experience.cap-bytel'
])


.config(function config($stateProvider) {
  $stateProvider.state('experience', {
    url: '/experience',
    views: {
      "main": {
        controller: 'ExperienceCtrl',
        templateUrl: 'experience/experience.tpl.html'
      }
    },
    data:{ pageTitle: 'Expérience' }
  });
})


.controller('ExperienceCtrl', function ExperienceCtrl($scope) {
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | expérience | ngCv' ;
    }
  });
  $scope.expTemplate = 'experience/cap-afse-cti/cap-afse-cti.tpl.html';
  $scope.setTemplate = function(templateUrl){
    $scope.expTemplate = templateUrl;
  };
})

.directive('experienceDir', function() {
  return {
    restrict: 'E',
    templateUrl: 'experience/experience.tpl.html',
    controller : 'ExperienceCtrl'
  };
})

;

