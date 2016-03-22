/**
 * 
 */
angular.module( 'ngCv.experience.cap-sfr', [
  'ui.router',
  'plusOne'
])

/**
 * 
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'experience.cap-sfr', {
    url: '/experience/cap-sfr',
    views: {
      "experience": {
        controller: 'CapSfrCtrl',
        templateUrl: 'experience/cap-sfr/cap-sfr.tpl.html'
      }
    },
    data:{ pageTitle: 'SFR' }
  });
})

/**
 * 
 */
.controller( 'CapSfrCtrl', function CapSfrCtrl( $scope ) {

})

;

