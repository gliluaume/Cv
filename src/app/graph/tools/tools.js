angular.module( 'ngCv.graph.tools', [
])



.factory('ToolsFactory', function ToolsFactory() {
  var factory = {
    // originalData : undefined,
    // typeSelection : undefined,

    getTypeSelection : function(data){
      return factory._getUniqueType(data.items, true, 'item')
                              .concat(factory._getUniqueType(data.periods, true, 'period'));
      //factory.typeSelection = factory.typeSelection.sort(function(a, b) { return a.name -b.name;} ); // TODO marche pas
    },
    _getUniqueType : function(arr, selected, type){
      var ret = [], added = [];
      for(var i = 0; i < arr.length; i++){
        if(added.indexOf(arr[i].type) === -1){
          ret.push({name : arr[i].type, selected: selected, type : type});
          added.push(arr[i].type);
        }
      }
      return ret;
    }
  };

  return factory;
})

// .controller('SelectionCtrl', function SelectionCtrl($scope, ToolsFactory) {
//   ToolsFactory.setTypeSelection($scope.datain);
//   $scope.typeSelection = ToolsFactory.typeSelection;
//   console.log($scope.typeSelection);
//   $scope.changeSel = function(typeSel){
//     console.log($scope.typeSelection );
//     console.log(typeSel);
//   };

//   $scope.canBeRemoved = function(typeSel){
//     var numActItem = ToolsFactory.typeSelection.filter(function(d) { return d.type == 'item' && d.selected;}).length;
//     return (typeSel.type == 'period' ||  typeSel.selected && numActItem < 2);
//   };
//   console.log("typeSelection");
//   console.log(ToolsFactory.typeSelection);
//   $scope.listHidden = true;

// })

// .directive('typeSelector', function() {
//   return {
//     restrict: 'E',
//     controller : 'SelectionCtrl',
//     scope: {
//       datain: '=datain'
//     },
//     templateUrl: 'graph/tools/typeSelector.tpl.html'
//   };
// })

;

