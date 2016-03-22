/**
 * 
 */
angular.module( 'ngCv.experience.cap-universal', [
  'ui.router',
  'plusOne'
])

/**
 * 
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'experience.cap-universal', {
    url: '/experience/cap-universal',
    views: {
      "experience": {
        controller: 'CapUniversalCtrl',
        templateUrl: 'experience/cap-universal/cap-universal.tpl.html'
      }
    },
    data:{ pageTitle: 'Universal' }
  });
})

/**
 * 
 */
.controller( 'CapUniversalCtrl', function CapUniversalCtrl( $scope ) {

})

;

