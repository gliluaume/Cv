angular.module( 'ngCv', [
  'templates-app',
  'templates-common',
  'ngCv.home',
  'ngCv.curriculum',
  'ngCv.experience',
  'ngCv.skill',
  'ngCv.education',
  //'ngCv.about',
  'ngCv.graph',
  'ngCv.graph.wheel',
  'ngCv.graph.timeline',
  'ui.router'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | ngCv' ;
    }
  });

  // Gère le menu quand on click sur un lien
  $scope.menuCollapsed = true;
  $scope.ManageCollapsibleMenuOnClick = function (){
    if(!$scope.menuCollapsed){
      $scope.menuCollapsed = true;
    }
  };
})

;

