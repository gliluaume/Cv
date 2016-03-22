angular.module( 'ngCv.graph.timeline', [
  'ui.router',
  'ngCv.graph.tools'
])


.config(function config($stateProvider) {
  $stateProvider.state( 'graph.timeline', {
    url: '/timeline',
    views: {
      "graph": {
        controller: 'TimelineCtrl',
        templateUrl: 'graph/timeline/timeline.tpl.html'
      }
    },
    data:{ pageTitle: 'Fresque' }
  });
})

.factory('TimelineFactory', function TimelineFactory($http) {
  var factory = {
    options : {
      popupTrigger : 'no_mouseover'
    },
    /*
      data : {
        periods : [
          {
            id : 0,
            label : "debut",
            text: "C'est là que j'ai commencé",
            comment : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            colorHue : 260,
            start : new Date(2001, 0, 1),
            end :  new Date(2003, 0, 1)
          },
          {
            id : 1,
            label : "milieu",
            text: "C'est ce que j'ai fait après",
            comment : "Lorem ipsum etc.",
            colorHue : 280,
            start : new Date(2003, 0, 2),
            end :  new Date(2004, 0, 1)
          },
          {
            id : 3,
            label : "fin",
            text: "C'est ce que j'ai fait ensuite",
            comment : "Lorem j'en sais rien !!!",
            colorHue : 300,
            start : new Date(2004, 0, 2),
            end :  new Date(2008, 0, 1)
          }
        ],
        items: [
            {id: 0, type: 'techSkill', label: 'c', colorHue : 50, optClass : "tile-purple"},
            {id: 1, type: 'techSkill', label: 'JavaScript', colorHue : 50},
            {id: 2, type: 'office', label: 'word', colorHue : 100},
            {id: 3, type: 'office', label: 'excel', colorHue : 100},
            {id: 4, type: 'office', label: 'powerpoint', colorHue : 100}
        ],
        itemTypes : [{
          id : 'techSkill',
          label : "techniques"
        },
        {
          id : 'office',
          label : "bureautique"
        }],
        // left col : period, right col item
        links: [ [0, 0],
                 [0, 1],
                 [0, 2],
                 [1, 2],
                 [2, 1],
                 [2, 3],
                 [3, 0]] 
      },
      */
      /*
      data : {
        options : {

        },
        periods : [
          {id : 16, label : 'A', text : "Axa France Services Expertise", colorHue : 260, start : new Date(2013, 2, 2), end :  new Date(2015, 7, 1)},
          {id : 17, label : 'B', text : "Axa France Services InVision", colorHue : 255, start : new Date(2010, 8, 2), end :  new Date(2013, 2, 1)},
          {id : 18, label : 'C', text : "AFP Avant vente", colorHue : 250, start : new Date(2010, 6, 2), end :  new Date(2010, 8, 1)},
          {id : 19, label : 'D', text : "Universal Music", colorHue : 245, start : new Date(2010, 5, 2), end :  new Date(2010, 6, 1)},
          {id : 20, label : 'E', text : "SFR IFaune", colorHue : 240, start : new Date(2010, 2, 2), end :  new Date(2010, 4, 1)},
          {id : 21, label : 'F', text : "TRA Mistral", colorHue : 235, start : new Date(2009, 7, 2), end :  new Date(2010, 2, 1)},
          {id : 21, label : 'G', text : "TMA Bouygues", colorHue : 230, start : new Date(2005, 11, 2), end :  new Date(2009, 7, 1)}
        ],
        items: [
            {id: 0, type: 'techSkill', label: 'c', colorHue : 50, optClass : "tile-purple"},
            {id: 1, type: 'techSkill', label: 'JavaScript', colorHue : 50},
            {id: 2, type: 'office', label: 'word', colorHue : 100},
            {id: 3, type: 'office', label: 'excel', colorHue : 100},
            {id: 4, type: 'office', label: 'powerpoint', colorHue : 100},
            {id : 10, type : "OS", label : "Unix AIX", colorHue : 0},
            {id : 11, type : "OS", label : "Unix DEC", colorHue : 1},
            {id : 12, type : "OS", label : "Windows Server 2008", colorHue : 2},
            {id : 13, type : "OS", label : "Windows XP", colorHue : 3},
            {id : 14, type : "OS", label : "Windows 7", colorHue : 4},
            {id : 15, type : "OS", label : "Linux", colorHue : 5},
            {id : 23, type : "IDE et éditeurs", label : "Visual Studio 9", colorHue : 60},
            {id : 24, type : "IDE et éditeurs", label : "Visual Studio 2010", colorHue : 61},
            {id : 25, type : "IDE et éditeurs", label : "Visual Studio 2013", colorHue : 62},
            {id : 26, type : "IDE et éditeurs", label : "Sublime Text", colorHue : 63},
            {id : 27, type : "IDE et éditeurs", label : "Notepad++", colorHue : 64},
            {id : 28, type : "IDE et éditeurs", label : "Python IDE", colorHue : 65},
            {id : 29, type : "Langage", label : "C/C++", colorHue : 90},
            {id : 30, type : "Langage", label : "C#", colorHue : 91},
            {id : 31, type : "Langage", label : "JavaScript", colorHue : 92},
            {id : 32, type : "Langage", label : "Python2", colorHue : 93},
            {id : 33, type : "Langage", label : "Korn-shell", colorHue : 94},
            {id : 34, type : "Langage", label : "LaTeX", colorHue : 95},
            {id : 35, type : "Langage", label : "SQL", colorHue : 96},
            {id : 36, type : "Langage", label : "PL/SQL", colorHue : 97},
            {id : 37, type : "Normes et outils", label : "Quality Center", colorHue : 120},
            {id : 38, type : "Normes et outils", label : "PL/SQL Developer", colorHue : 121},
            {id : 39, type : "Normes et outils", label : "CMMI", colorHue : 122},
            {id : 40, type : "Normes et outils", label : "LEAN", colorHue : 123},
            {id : 41, type : "Secteur d'activité", label : "Banque", colorHue : 124},
            {id : 42, type : "Secteur d'activité", label : "Edition musicale", colorHue : 125},
            {id : 43, type : "Secteur d'activité", label : "Télécom", colorHue : 126},
            {id : 44, type : "Secteur d'activité", label : "Média", colorHue : 127},
            {id : 45, type : "Entreprises", label : "Axa", colorHue : 150},
            {id : 46, type : "Entreprises", label : "Universal music", colorHue : 151},
            {id : 47, type : "Entreprises", label : "SFR", colorHue : 152},
            {id : 48, type : "Entreprises", label : "Bouygues Telecom", colorHue : 153},
            {id : 49, type : "Entreprises", label : "AFP", colorHue : 154},
            {id : 50, type : "Entreprises", label : "INRIA", colorHue : 155},
            {id : 51, type : "Entreprises", label : "INSA", colorHue : 156},
            {id : 52, type : "Technologies logicielles", label : ".Net 3.5", colorHue : 180},
            {id : 53, type : "Technologies logicielles", label : ".Net 4.5", colorHue : 181},
            {id : 54, type : "Technologies logicielles", label : "Jquery", colorHue : 182},
            {id : 55, type : "Technologies logicielles", label : "AngularJs", colorHue : 183},
            {id : 56, type : "Technologies logicielles", label : "SignalR", colorHue : 184},
            {id : 57, type : "Technologies logicielles", label : "WebSockets", colorHue : 185},
            {id : 58, type : "Technologies logicielles", label : "WebServices", colorHue : 186},
            {id : 59, type : "Logiciels de Bureautique", label : "Excel", colorHue : 210},
            {id : 60, type : "Logiciels de Bureautique", label : "Word", colorHue : 211},
            {id : 61, type : "Logiciels de Bureautique", label : "TeX", colorHue : 212},
            {id : 62, type : "Logiciels de Bureautique", label : "Power Point", colorHue : 213},
            {id : 63, type : "Logiciels de Bureautique", label : "Outlook", colorHue : 214},
            {id : 64, type : "Activité", label : "Chiffrage", colorHue : 240},
            {id : 65, type : "Activité", label : "Avant-vente", colorHue : 241},
            {id : 66, type : "Activité", label : "Conception fonctionnelle", colorHue : 242},
            {id : 67, type : "Activité", label : "Assistance Maîtrise d'Ouvrage", colorHue : 243},
            {id : 68, type : "Activité", label : "MOE", colorHue : 244},
            {id : 69, type : "Activité", label : "TMA", colorHue : 245},
            {id : 70, type : "Activité", label : "TRA", colorHue : 246},
            {id : 71, type : "Fonctionnalité", label : "Gestion client", colorHue : 270},
            {id : 72, type : "Fonctionnalité", label : "Facturation/Provisioning/Valorisation Ticket Télécom", colorHue : 271},
            {id : 73, type : "Fonctionnalité", label : "WorkForce Management", colorHue : 272},
            {id : 74, type : "Fonctionnalité", label : "CTI", colorHue : 273},
            {id : 75, type : "Fonctionnalité", label : "Selfcare", colorHue : 274},
            {id : 76, type : "Progiciels", label : "Genesys (Config, Routage, Events)", colorHue : 300},
            {id : 77, type : "Progiciels", label : "InVision", colorHue : 301},
            {id : 78, type : "Progiciels", label : "BSCS", colorHue : 302},
            {id : 79, type : "Environnement", label : "Oracle 9i/10g/11gR2", colorHue : 320},
            {id : 80, type : "Environnement", label : "MongoDb", colorHue : 321},
            {id : 81, type : "Environnement", label : "IIS6", colorHue : 322},
            {id : 82, type : "Environnement", label : "IIS7.5", colorHue : 323},
            {id : 83, type : "Environnement", label : "ASP.Net", colorHue : 324},
            {id : 84, type : "Environnement", label : "NodeJs", colorHue : 325},
            {id : 85, type : "Environnement", label : "Grunt", colorHue : 326},
            {id : 86, type : "Environnement", label : "Npm", colorHue : 327},
            {id : 87, type : "Environnement", label : "Karma", colorHue : 328},
            {id : 88, type : "Langues", label : "Français", colorHue : 340},
            {id : 89, type : "Langues", label : "Anglais", colorHue : 341},
            {id : 90, type : "Langues", label : "Espagnol", colorHue : 342},
            {id : 91, type : "Qualité", label : "Implication", colorHue : 350},
            {id : 92, type : "Qualité", label : "Rigueur", colorHue : 351},
            {id : 93, type : "Qualité", label : "écoute active", colorHue : 352},
            {id : 94, type : "Qualité", label : "pugnacité", colorHue : 353},
            {id : 95, type : "Qualité", label : "capacité d'analyse", colorHue : 354},
            {id : 96, type : "Qualité", label : "réactivité", colorHue : 355},
            {id : 97, type : "Qualité", label : "ouverture d'esprit", colorHue : 356},
            {id : 98, type : "Qualité", label : "empathie", colorHue : 357}
        ],
        links: [ [0, 0],
                 [0, 1],
                 [0, 2],
                 [1, 2],
                 [2, 1],
                 [2, 3],
                 [3, 0]] 
      },
    */

    // loadData : function(){
    //   $http.get('/data_2.json').
    //   success(function(data, status, headers, config) {
    //     console.log("chargement ok");
    //     TimelineFactory.data = angular.fromJson(data);
    //     console.log(TimelineFactory.data);
    //     TimelineFactory.setupData();
    //     console.log(TimelineFactory.data);
    //     console.log("après chargement");
    //     console.log($scope.data);
    //   }).
    //   error(function(data, status, headers, config) {
    //     console.log("Error");
    //   });
    // },

    setupData : function(){
      factory._setupItems();
      factory._setAllItemsByType();
      factory._setupPeriods();
      factory.setDiscreetOnItems();
    },
    _setupItems : function(){
      for(var i = 0; i < factory.data.items.length; i++){
        factory.data.items[i].locked = false;
      }
    },
    _setAllItemsByType : function() {
      var ret = {};
      var distinctTypes = factory.__getDistinctItemsTypes();
      var items = factory.data.items;
      for(var i = 0; i < distinctTypes.length; i++){
        if(ret[distinctTypes[i]]){
          ret[distinctTypes[i]].push(factory.__selectItemByType(distinctTypes[i]));
        } else {
          ret[distinctTypes[i]] = factory.__selectItemByType(distinctTypes[i]);
        }
      }
      factory.data.itemsByType = ret;
    },
    __getDistinctItemsTypes : function(){
      var items = factory.data.items;
      // Get distinct items types create a zone for each type
      var ordScale = d3.scale.ordinal()
                     .domain(items.map( function (item) { return item.type; }));
      var distinctTypes = ordScale.domain();
      return distinctTypes;
    },
    __selectItemByType : function(type){
      return factory.data.items.filter(function(item){
        return item.type === type;
      });
    },

    _setupPeriods : function(){
      factory.__formatPeriodsDates();
      var periods = factory.data.periods;
      var range = factory.__calcPeriodRange(periods);
      // Met à joue les périodes
      for(var i = 0; i < periods.length; i++){
        periods[i].popoverTrigger = factory.options.popupTrigger;
        periods[i].colorSaturation = "90";
        periods[i].colorLightness = "70";
        periods[i].clicked = false;
        // calcule la largeur relative
        periods[i].relWidth = factory.__calcRelativeWidth(periods[i], range);
        // récupère la liste des items associés
        periods[i].links = factory.__getPeriodItemsIds(periods[i].id, factory.data.links);
      }
    },
    __formatPeriodsDates : function(){
      var periods = factory.data.periods;
      for(var i = 0; i < periods.length; i++){
        if(factory.__isString(periods[i].start)){
          periods[i].start = new Date(periods[i].start);
        }
        if(factory.__isString(periods[i].end)){
          periods[i].end = new Date(periods[i].end);
        }
      }
    },
    __isString : function(obj){
      return (typeof obj === "string");
    },
    __calcPeriodRange : function(periods){
      var maxEnd = d3.max(periods, function(period) {
        return period.end;
      });
      var minStart = d3.min(periods, function(period) {
        return period.start;
      });
      return maxEnd - minStart;
    },
    __calcRelativeWidth : function(period, range){
      var ret = 1;
      if(range > 0){
        ret = Math.floor(100 * (period.end - period.start) / (range)) * 0.80;
      }
      console.log(ret);
      return ret;
    },
    __getPeriodItemsIds : function(periodId, linksArr){
      return linksArr.filter(function(a){
        return a[0] === periodId;
      }).map(function(a){
        return a[1];
      });
    },

    setDiscreetOnItems : function(){
      for(var i = 0; i < factory.data.items.length; i++){
        factory.data.items[i].isDiscreet = true;
      }
    },
    setDiscreet : function(itemId, isDiscreet){
      for(var i = 0; i < factory.data.items.length; i++){
        if(factory.data.items[i].id == itemId){
          if(!factory.data.items[i].locked){
            factory.data.items[i].isDiscreet = isDiscreet;
          }
        }
      }
    },
    toggleLockTiles : function(period){
      for(var i = 0; i < factory.data.items.length; i++){
        for(var j = 0; j < period.links.length; j++){
          if(factory.data.items[i].id === period.links[j]){
            factory.data.items[i].locked = !factory.data.items[i].locked;
          }
        }
      }
    }
    // ,
    // toggleDiscreet : function(itemId){
    //   for(var i = 0; i < factory.data.items.length; i++){
    //     if(factory.data.items[i].id == itemId){
    //       factory.data.items[i].isDiscreet = !factory.data.items[i].isDiscreet;
    //     }
    //   }
    // }
  };

  return factory;
})
.controller('TimelineCtrl', function TimelineCtrl($scope, TimelineFactory, $http, ToolsFactory) {
  $scope.data = TimelineFactory.data;
  $http.get('/data_2.json').
  success(function(data, status, headers, config) {
    TimelineFactory.data = angular.fromJson(data);
    TimelineFactory.setupData();
    $scope.data = TimelineFactory.data;
    //$scope.typeSelection = ToolsFactory.getTypeSelection({items : TimelineFactory.data.items, periods : []});
    $scope.filteredItemsByType = angular.copy($scope.data.itemsByType);
  }).
  error(function(data, status, headers, config) {
    console.log("Error");
  });


  var mouseOverPeriod = function(period, isDiscreet){
    for(var i = 0; i < period.links.length; i++){
      if(!period.clicked){
        TimelineFactory.setDiscreet(period.links[i], isDiscreet);
      }
    }
  };
  $scope.mouseEnterMain= function(period) { 
    $scope.desc = period.text + " " + period.comment ;
    return mouseOverPeriod(period, false); 
  };
  $scope.mouseLeaveMain = function(period) { 
    $scope.desc = "";
    return mouseOverPeriod(period, true); 
  };

  // var mouseChangeMain = function(period){
  //   console.log(period);mouseOverMain
  //   if(!period.clicked){
  //     for(var i = 0; i < period.links.length; i++){
  //         TimelineFactory.toggleDiscreet(period.links[i]);
  //     }
  //   }
  // };

  // $scope.mouseEnterMain = mouseChangeMain;
  // $scope.mouseLeaveMain = mouseChangeMain;

  // laid !!!
  $scope.mouseClick = function(period){
    if(!period.clicked){
      period.colorSaturation = "50";
      period.colorLightness = "50";
      period.popoverTrigger = "";
    } else {
      period.colorSaturation = "90";
      period.colorLightness = "70";
      period.popoverTrigger = TimelineFactory.options.popupTrigger;
    }
    period.clicked = !period.clicked;
    TimelineFactory.toggleLockTiles(period);
  };


  $scope.listHidden = true;
  $scope.typeSelection = TimelineFactory.typeSelection;

  $scope.changeSel = function(typeSel){
    console.log($scope.typeSelection);
    var tmp = [];
    for(var t in $scope.data.itemsByType){
      for(var i = 0; i < $scope.typeSelection.length; i++){
        if($scope.typeSelection[i].selected && t == $scope.typeSelection[i].name){
          tmp[t] = angular.copy($scope.data.itemsByType[t]);
        }
      }
    }
    $scope.filteredItemsByType = angular.copy(tmp);
  };
})


;

