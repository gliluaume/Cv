/**
 * 
 */
angular.module( 'ngCv.experience.cap-afp', [
  'ui.router',
  'plusOne'
])

/**
 * 
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'experience.cap-afp', {
    url: '/experience/cap-afp',
    views: {
      "experience": {
        controller: 'CapAfpCtrl',
        templateUrl: 'experience/cap-afp/cap-afp.tpl.html'
      }
    },
    data:{ pageTitle: 'AFP' }
  });
})

/**
 * 
 */
.controller( 'CapAfpCtrl', function CapAfpCtrl( $scope ) {

})

;

