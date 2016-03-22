angular.module( 'ngCv.curriculum', [
  'ui.router',
  'ui.bootstrap'
])


.config(function config($stateProvider) {
  $stateProvider.state('curriculum', {
    url: '/curriculum',
    views: {
      "main": {
        controller: 'curriculumCtrl',
        templateUrl: 'curriculum/curriculum.tpl.html'
      }
    },
    data:{ pageTitle: 'Expérience' }
  });
})


.controller('curriculumCtrl', function curriculumCtrl($scope) {

})

;