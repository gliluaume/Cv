/**
 * 
 */
angular.module( 'ngCv.experience.cap-afse-cti', [
  'ui.router',
  'plusOne'
])

/**
 * 
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'experience.cap-afse-cti', {
    url: '/experience/cap-afse-cti',
    views: {
      "experience": {
        controller: 'CapAfseCtiCtrl',
        templateUrl: 'experience/cap-afse-cti/cap-afse-cti.tpl.html'
      }
    },
    data:{ pageTitle: 'CTI' }
  });
})

/**
 * 
 */
.controller( 'CapAfseCtiCtrl', function CapAfseCtiCtrl( $scope ) {

})

;

