angular.module( 'ngCv.graph.wheel', [
  'ui.router',
  'ngCv.graph.tools'
])


.config(function config($stateProvider) {
  $stateProvider.state( 'graph.wheel', {
    url: '/wheel',
    views: {
      "graph": {
        controller: 'WheelCtrl',
        templateUrl: 'graph/wheel/wheel.tpl.html'
      }
    },
    data:{ pageTitle: 'Roue des compétences' }
  });
})

.factory('WheelFactory', function WheelFactory($http, ToolsFactory) {
  var factory = {
    data : undefined,
    // data : {
    //   items: [
    //       {text: 'Main', colorHue : 50},
    //       {text: 'a', colorHue : 50},
    //       {text: 'b'},
    //       {text: 'C', colorHue : 300}
    //   ],
    //   matrix: [[0, 1, 1, 0], // Main depends on A and B
    //            [0, 0, 1, 1], // A depends on B
    //            [0, 0, 0, 1], // B doesn't depend on A or Main
    //            [1, 1, 0, 0]] // 
    // },
    originalData : undefined,
    typeSelection : undefined,
    displayData : function(callback){
      $http.get('/data_2.json').
      success(function(data, status, headers, config) {
        console.log("Ok");
        console.log(data);
        factory.originalData = angular.fromJson(data);
        factory.typeSelection = ToolsFactory.getTypeSelection(factory.originalData);
        factory.buildGraph(factory.originalData, callback);
      }).
      error(function(data, status, headers, config) {
        console.log("Error");
      });
    },
    bindData : function(selector){
      var chart = d3.chart.dependencyWheel();
      d3.select(selector + ' svg').remove();
      d3.select(selector)
          .datum(factory.data)
          .call(chart);
    },

    // setTypeSelection : function(data){
    //   factory.typeSelection = factory._getUniqueType(data.items, true, 'item')
    //                           .concat(factory._getUniqueType(data.periods, true, 'period'));
    //   //factory.typeSelection = factory.typeSelection.sort(function(a, b) { return a.name -b.name;} ); // TODO marche pas
    // },
    // _getUniqueType : function(arr, selected, type){
    //   var ret = [], added = [];
    //   for(var i = 0; i < arr.length; i++){
    //     if(added.indexOf(arr[i].type) === -1){
    //       ret.push({name : arr[i].type, selected: selected, type : type});
    //       added.push(arr[i].type);
    //     }
    //   }
    //   return ret;
    // },
    buildGraph : function(data, callback){
      var filterType = factory.typeSelection.filter(function(d) { return d.selected ; }).map(function(d) { return d.name; });
      console.log(filterType);
      factory.data = { items : [], matrix : [] };
      factory.__pushIntoItems(data.items, filterType);
      factory.__pushIntoItems(data.periods, filterType);
      factory.__buildMatrix(data.links);
      console.log(factory.data);
      factory.bindData('#chart_placeholder');
      if(callback){
        callback();
      }
    },
    __setDistinctType : function(){

    },
    __buildMatrix : function(links){
      factory.data.matrix = [];
      for(var i = 0; i < factory.data.items.length; i++){
        // init row
        factory.data.matrix.push(Array.apply(null, new Array(factory.data.items.length)).map(Number.prototype.valueOf, 0));
        for(var j = 0; j < factory.data.items.length; j++){
          if(factory.__areLinked(factory.data.items[i], factory.data.items[j], links)){
            factory.data.matrix[i][j] = 1;
          }
        }
      }
      
    },
    __areLinked : function(a, b, links){
      for(var i = 0; i < links.length; i++){
        if(links[i][0] == a.id && links[i][1] == b.id){
          return true;
        }
      }
      return false;
    },
    __pushIntoItems : function(data, types){
      if(data){
        if(!factory.data.items){
          factory.data.items = [];
        }
        var filtered;
        // Filter data on a list of types
        if(types){
          filtered = data.filter(function(d){
            var tmp = types.filter(function(t){
              return t == d.type;
            });
            return tmp.length > 0;
          });
        } else {
          filtered = data;
        }

        for(var i = 0; i < filtered.length; i++){
          if(filtered[i] || filtered[i] === 0) {
            var obj = {
              id : filtered[i].id,
              label : filtered[i].label,
              colorHue : filtered[i].colorHue
            };
            factory.data.items.push(obj);
          }
        }
      }
    }
  };

  return factory;
})

.controller('WheelCtrl', function WheelCtrl($scope, WheelFactory) {
  // WheelFactory.initSelection();
  WheelFactory.displayData(function(){
    $scope.typeSelection = WheelFactory.typeSelection;
  });
  console.log($scope.typeSelection);
  $scope.changeSel = function(typeSel){
    console.log($scope.typeSelection );
    console.log(typeSel);
    WheelFactory.buildGraph(WheelFactory.originalData);
  };

  $scope.canBeRemoved = function(typeSel){
    var numActItem = WheelFactory.typeSelection.filter(function(d) { return d.type == 'item' && d.selected;}).length;
    return (typeSel.type == 'period' ||  typeSel.selected && numActItem < 2);
  };
  $scope.listHidden = true;
  console.log("typeSelection");
  console.log(WheelFactory.typeSelection);
})

;

