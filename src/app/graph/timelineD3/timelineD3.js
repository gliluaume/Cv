angular.module( 'ngCv.graph.timelineD3', [
  'ui.router',
  'plusOne'
])


.config(function config($stateProvider) {
  $stateProvider.state( 'graph.timelineD3', {
    url: '/timelineD3',
    views: {
      "graph": {
        controller: 'TimelineD3Ctrl',
        templateUrl: 'graph/timelineD3/timelineD3.tpl.html'
      }
    },
    data:{ pageTitle: 'Fresque' }
  });
})

.factory('TimelineD3FactoryOld', function TimelineD3FactoryOld($http) {
  var factory = {

    init : function(){
      d3.selectAll("td").style("background-color", "orange");
      var t = ['main_a', 'main_b'];
      for(var i = 0; i < t.length; i++){
        factory.colorAssociate(t[i]);
        d3.selectAll("." + t[i]).style({opacity:'0.5'});
      }
    },

    colorAssociate : function(key){
        d3.selectAll("#" + key).on('mouseover', function(d){
            //d3.select("#" + key).classed("bg-blue", true);
            //d3.select("#" + key).classed("bg-purple", false);
            var nodeSelection = d3.selectAll("." + key).style({opacity:'1.0'});
            nodeSelection.select("text").style({opacity:'1.0'});
        }).on('mouseout', function(d){
            //d3.select("#" + key).classed("bg-blue", false);
            //d3.select("#" + key).classed("bg-purple", true);
            var nodeSelection = d3.selectAll("." + key).style({opacity:'0.5'});
            //nodeSelection.select("text").style({opacity:'1.0'});
        });
    }

  };

  return factory;
})

.factory('TimelineD3Factory', function TimelineD3Factory($http) {
  var factory = {

    data : {
      options : {

      },
      periods : [
        {
          id : 0,
          optClass : 'period-blue',
          label : "debut",
          text: "C'est là que j'ai commencé",
          comment : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          start : new Date(2001, 0, 1),
          end :  new Date(2003, 0, 1)
        },
        {
          id : 1,
          optClass : 'period-blue',
          optAttr : {
            'popover' : "I appeared on mouse enter!",
            'popover-title' : "The title."
          },
          label : "milieu",
          text: "C'est ce que j'ai fait après",
          comment : "Lorem ipsum etc.",
          start : new Date(2003, 0, 2),
          end :  new Date(2004, 0, 1)
        },
        {
          id : 3,
          optClass : 'period-blue',
          label : "fin",
          text: "C'est ce que j'ai fait ensuite",
          comment : "Lorem j'en sais rien !!!",
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
      links: [ [0, 0],
               [0, 1],
               [0, 2],
               [1, 2],
               [2, 1],
               [2, 3],
               [3, 0]] 
    },
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
    },*/
    bindData : function(selector){
      var chart = d3.chart.timeline({classes : { ribonZone : 'ribon-zone'}});
      d3.select(selector)
          .datum(factory.data)
          .call(chart);
    }
  };

  return factory;
})
.controller('TimelineD3Ctrl', function TimelineD3Ctrl($scope, TimelineFactory, TimelineD3Factory) {
  //TimelineFactory.init();
  TimelineD3Factory.bindData('#timeline_placeholder');
})

;

