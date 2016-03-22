/**
 * 
 */
angular.module( 'ngCv.experience.cap-bytel', [
  'ui.router',
  'plusOne'
])

/**
 * 
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'experience.cap-bytel', {
    url: '/experience/cap-bytel',
    views: {
      "experience": {
        controller: 'CapBytelCtrl',
        templateUrl: 'experience/cap-bytel/cap-bytel.tpl.html'
      }
    },
    data:{ pageTitle: 'CTI' }
  });
})

/**
 * 
 */
.controller( 'CapBytelCtrl', function CapBytelCtrl( $scope ) {

})

;

