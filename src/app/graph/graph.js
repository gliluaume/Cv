angular.module('ngCv.graph', [
  'ngCv.graph.wheel',
  'ngCv.graph.timeline',
  'ngCv.graph.timelineD3',
  'ui.router',
  'plusOne'
])


.config(function config($stateProvider) {
  $stateProvider.state( 'graph', {
    url: '/graph',
    views: {
      "main": {
        controller: 'GraphCtrl',
        templateUrl: 'graph/graph.tpl.html'
      }
    },
    data:{ pageTitle: 'Graph' }
  });
})


.controller('GraphCtrl', function GraphCtrl($scope) {
})

;

