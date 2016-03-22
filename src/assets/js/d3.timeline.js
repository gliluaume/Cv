d3.chart = d3.chart || {};

/**
  Exemple de données
  data : {
    options : {
    
    },
    periods : [
    {
      id : 0,
      class : 'period period-blue',
      label : "debut",
      start : new Date(2001, 0, 1),
      end :  new Date(2003, 0, 1)
    },
    {
      id : 1,
      class : 'period period-blue',
      label : "milieu",
      start : new Date(2003, 0, 2),
      end :  new Date(2004, 0, 1)
    },
    {
      id : 3,
      class : 'period period-blue',
      label : "fin",
      start : new Date(2004, 0, 2),
      end :  new Date(2008, 0, 1)
    }
    ],
    items: [
      {id: 0, type: 'techSkill', label: 'c', colorHue : 50},
      {id: 1, type: 'techSkill', label: 'JavaScript', colorHue : 50},
      {id: 2, type: 'office', label: 'word', colorHue : 100},
      {id: 3, type: 'office', label: 'excel', colorHue : 100},
      {id: 4, type: 'office', label: 'powerpoint', colorHue : 100}
    ],
    // association table : 
    //    first column : period id
    //    second column: item id
    links: [ [0, 0],
         [0, 1],
         [0, 2],
         [1, 2],
         [2, 1],
         [2, 3],
         [3, 0]] 
  }





 */
d3.chart.timeline = function(givenOptions) {

  var height = 700;
  var width = 700;
  var margin = 150;
  var padding = 0.02;
  /* TODO overrideOptions(master, options) qui construit un objet semblable à master dont les propriétés auraient été trouvées dans option, respectant la hierarchie de master.
  var stdOptions = {
    classes : { 
      ribonZone : 'ribon-zone',
      ribonGroup : 'period-group',
      itemZone : 'item-zone',
      itemGroup :  'item-group'
    }
  };*/
  // TODO overrideOptions(master, options) qui construit un objet semblable à master dont les propriétés auraient été trouvées dans option, respectant la hierarchie de master.
  var setOptions = function(givenOptions){
    console.log('set option');
    var newOptions = {
      classes : {
        timeline : parseOption(givenOptions, ['classes', 'timeline'], 'timeline'),
        periodZone : parseOption(givenOptions, ['classes', 'periodZone'], 'period-zone'),
        periodGroup : parseOption(givenOptions, ['classes', 'periodGroup'], 'period-group'),
        period : parseOption(givenOptions, ['classes', 'period'], 'period'),
        tileZone : parseOption(givenOptions, ['classes', 'tileZone'], 'tile-zone'),
        tileGroup : parseOption(givenOptions, ['classes', 'tileGroup'], 'tile-group'),
        tile : parseOption(givenOptions, ['classes', 'tile'], 'tile'),
      },
      events : {
        emphasis : parseOption(givenOptions, ['events', 'emphasis'], 'mouseover'),
        discreet : parseOption(givenOptions, ['events', 'discreet'], 'mouseout')
      },
      styling : {
        emphasis : parseOption(givenOptions, ['styling', 'emphasis'], {opacity:'1.0'}),
        discreet : parseOption(givenOptions, ['styling', 'discreet'], {opacity:'0.5'})
      },
      display : {
        withLabel : parseOption(givenOptions, ['display', 'withLabel'], false),
        withTitle : parseOption(givenOptions, ['display', 'withTitle'], true)
      }
    };

    return newOptions;
  };
  var parseOption = function(obj, arrPath, defaultValue){
    var child = obj;
    var ret = defaultValue;
    if(obj && arrPath) {
      for(var i = 0; i < arrPath.length; i++){
        if(!(child = child[arrPath[i]])){
          break;
        }
      }
      if(child != undefined){
        //ret = child[arrPath[arrPath.length-1]];
        ret = child;
      }
    }
    return ret;
  };
  var options = setOptions(givenOptions);
  function chart(selection) {
    selection.each(function(data) {
      console.log(options);
      var links = data.links;
      var periods = data.periods.sort(function(a,b){ return a.start - b.start;});
      var items = data.items;

      // Select the svg element, if it exists.
      var baseElt = d3.select(this).selectAll(options.classes.timeline).data([data]);

      // Otherwise, create the skeletal chart.
      var timelineElt = baseElt.enter().append("div:div")
                    .attr("class", options.classes.timeline);

      var commentZone =  timelineElt.append("div");
      d3.comment = buildCommentZone("comment", commentZone);

      var periodZone = buildPeriodZone(timelineElt, periods, options);

      var tileZone = buildTileZone(timelineElt, data, options);

      d3.selectAll("." + options.classes.tile).style(options.styling.discreet);
      d3.selectAll("." + options.classes.period).style(options.styling.discreet);

      // Associate periods:
      for(var i = 0; i < periods.length; i++){
        // colorAssociate(options.classes.period +"-" + periods[i].id);
        colorAssociate(periods[i], commentZone);
      }
    });
  }

  d3.popup = undefined;
  

  var colorAssociate = function(period, commentZone){
    var aCssClass = options.classes.period +"-" + period.id
    d3.selectAll("#" + aCssClass)
    .on('mouseover', function(d){
      d3.select(this).style(options.styling.emphasis);
      var nodeSelection = d3.selectAll("." + aCssClass).style(options.styling.emphasis);
      nodeSelection.select("text").style(options.styling.emphasis);
      popup = buildPopup(event, period);
      d3.comment = updateCommentZone(period.comment, commentZone);
    })
    .on('mouseout', function(d){
      d3.select(this).style(options.styling.discreet);
      var nodeSelection = d3.selectAll("." + aCssClass).style(options.styling.discreet);
      nodeSelection.select("text").style(options.styling.emphasis);
      destroyPopup();
      d3.comment = updateCommentZone("null", commentZone);
    })
    .on('mousemove', function(){
      destroyPopup();
      popup = buildPopup(event, period);
    })
    ;
  };

  // popup bootstrap:
// <div class="popover top fade in" ng-class="{ in: isOpen(), fade: animation() }" popover-popup="" title="The title." content="I appeared on mouse click!" placement="top" animation="tt_animation" is-open="tt_isOpen" style="top: -62px; left: 409px; display: block;">
//   <div class="arrow"></div>
// ::after
//   <div class="popover-inner">
//       <h3 class="popover-title ng-binding" ng-bind="title" ng-show="title">The title.</h3>
//       <div class="popover-content ng-binding" ng-bind="content">I appeared on mouse click!</div>
//   </div>
// </div>
  var destroyPopup = function(){
    d3.select("#timeline-popup").remove();
    d3.popup = undefined;
  };
  var buildPopup = function(evt, period){
    // console.log(evt);
    var popup = d3.select("body")
      .append('div')
      .attr('id', 'timeline-popup')
      .attr('class', 'popover top fade in')
     // .attr('placement', 'top')
      .attr('animation', 'tt_animation')
      .attr('is-open', 'tt_isOpen')
      .style("position", "absolute")
      .style("top", -100+(evt.pageY)+"px")
      .style("left",-98+(evt.pageX)+"px")
      .style("display","block");
      //.attr('style', 'top: -62px; left: 409px; display: block;'); 

    popup.append('div')
      .attr('class', 'arrow');

    var sub = popup.append('div')
      .attr('class', 'popover-inner');
    
    sub.append('h3')
      .attr('class', 'popover-title ng-binding')
      .html(period.label);

    popup.append('div')
      .attr('class', 'popover-content ng-binding')
      .html(period.text);
    return popup;
  };
  var buildPopupOld = function(d3Elmt){
    var tooltip = d3Elmt
      .append('div')
      .attr('class', 'popover top fade in')
      .attr('data-ng-class', '{ in: isOpen(), fade: animation() }')
      .attr('popover-popup', '')
      .attr('title', 'The title.')
      .attr('content', 'I appeared on mouse click!')
      .attr('placement', 'top')
      .attr('animation', 'tt_animation')
      .attr('is-open', 'tt_isOpen')
      .attr('style', 'top: -62px; left: 409px; display: block;'); 

    tooltip.append('div')
      .attr('class', 'arrow');

    var sub = tooltip.append('div')
      .attr('class', 'popover-inner');
    
    sub.append('h3')
      .attr('class', 'popover-title ng-binding')
      .attr('ng-bind', 'title')
      .attr('ng-show', 'title')
      .html('The title.');

    tooltip.append('div')
      .attr('class', 'popover-content ng-binding')
      .attr('ng-bind', 'content')
      .html('I appeared on mouse click!');
  };

  var destroyCommentZone = function(){
    d3.select("#comment-zone").remove();
    d3.comment = undefined;
  };
  var buildCommentZone = function(comment, commentZone){
    var commentZone = commentZone.append("p")
                  .attr("id", "comment-zone")
                  .style("height", "200px")
                  .html(comment);
                  console.log(comment);

    return commentZone;
  };
  var updateCommentZone = function(comment, commentZone){
    d3.select("#comment-zone").html(comment);

    return commentZone;
  };
  /* 
    //TODO pour utiliser un attribut custom plutôt que les class et les id
    var getAllElementsWithAttribute = function(attribute, value){
      var matchingElements = [];
      var allElements = document.getElementsByTagName('*');
      for (var i = 0; allElements.length; i++) {
        if ( allElements[i].getAttribute(attribute) !== null) {
          var arrValues = allElements[i].getAttribute(attribute).split(' ');
          if(arrayContains(arrValues, value)){
            // Element exists with attribute. Add to array.
            matchingElements.push(allElements[i]);
          }
        }
      }
      return matchingElements;
    }*
    
    var arrayContains = function(array, value){
      for(var i = 0; i < array.length; i++){
        if(array[i] === value.toString()){
          return true;
        }
      }
      return false;
    };
  */
  var buildPeriodZone = function(timelineElt, periods){
    var calcPeriodRange = function(periods){
      var maxEnd = d3.max(periods, function(period) {
        return period.end;
      });
      var minStart = d3.min(periods, function(period) {
        return period.start;
      });
      return maxEnd - minStart;
    };

    var calcRelativeWidth = function(period, range){
      var ret = 1;
      if(range > 0){
        ret = Math.floor(100 * (period.end - period.start) / (range)) * 0.9;
      }
      console.log(ret);
      return ret;
    };
    var getOptionalAttr = function(period){
    };
    // <div class="period-zone" >
    //   <div class="period-group">
    //     <span id="p_a" class="period period-blue" style="width:10%">Left</span>
    //     <span id="p_b" class="period period-blue" style="width:20%">Left</span>
    //     <span id="p_c" class="period period-blue" style="width:15%">Left</span>
    //     <span id="p_d" class="period period-blue" style="width:15%">Left</span>
    //     <span id="p_e" class="period period-blue" style="width:40%">Left</span>
    //   </div>
    // </div>
    var range = calcPeriodRange(periods);
    console.log("range : " + range);
    var periodZone = timelineElt.append("div:div")
                  .attr("class", options.classes.periodZone);

    var periodGroup = periodZone.append("div:div")
      .attr("class", options.classes.periodGroup);

    // Build strip timeline
    periodGroup.selectAll("div").data(periods).enter()
      .append("span:span")
      .attr("id", function(period){ return options.classes.period + "-" + period.id; })
      .attr("class", function(period){ return options.classes.period + (period.optClass ? " " + period.optClass: "");})
      .attr("style", function(period){ return "width:" + calcRelativeWidth(period, range) + "%";})
      .each(function(period) {
        if(options.display.withLabel){
          d3.select(this).html(period.label);
        }
        console.log("options.withTitle : " + options.withTitle);
        if(options.display.withTitle){
          console.log("period text : " + period.text);
          d3.select(this).attr("title", period.text);
        }

        if (period.colorHue){
          d3.select(this).style("background-color", "hsl(" + period.colorHue + ",90%,70%)");
        }
        /*
        if (period.optAttr){
          var periodElt = d3.select(this);
          ['popover', 'popover-title', 'popover-trigger'].forEach(function(key) {
            if (key in period.optAttr)
              periodElt.attr(key, period.optAttr[key]);
          });
        }*/
      });

    return periodZone;
  };
  var fill = function(d) {
    return "hsl(" + d.colorHue + ",90%,70%)";
  };
  var buildTileZone = function(timelineElt, data){
    var links = data.links;
    var periods = data.periods;
    var items = data.items;

    // dégueu
    var getPeriodIds = function(item, links){
      var periodIds = [];
      var periodItemLinks = links.filter(function(link){
        return link[1] == item.id;
      });

      if(periodItemLinks){
        var ordScale = d3.scale.ordinal()
                 .domain(periodItemLinks.map( function (periodItemLink) { return periodItemLink[0]; }));
        periodIds = ordScale.domain();
      }
      
      //console.log('link for item ' + item.id + ' : '+ periodIds.join(','));
      return periodIds;
    };
    // <div class="tile-zone" >
    //   <div class="tile-group" >
    //     <span class="tile tile-cyan main_a" style="width:150px">TMA</span>
    //     <span class="tile tile-cyan main_b" style="width:150px">TRA</span>
    //   </div>
    //   <div class="tile-group" >
    //     <span class="tile tile-blue main_a" style="width:150px">TMA</span>
    //     <span class="tile tile-blue" style="width:150px">TRA</span>
    //   </div>
    //   <div class="tile-group" >
    //     <span class="tile tile-purple main_a" style="width:150px">TMA</span>
    //     <span class="tile tile-purple" style="width:150px">TRA</span>
    //   </div>
    //   <div class="tile-group" >
    //     <span class="tile tile-red main_a" style="width:150px">TMA</span>
    //     <span class="tile tile-red" style="width:150px">TRA</span>
    //   </div>
    // </div>

    // Get distinct items types create a zone for each type
    var ordScale = d3.scale.ordinal()
             .domain(items.map( function (item) { return item.type; }));
    var distinctTypes = ordScale.domain();
    // Build
    var tileZone = timelineElt.append("div:div")
      .attr("class", options.classes.tileZone);

    // TODO faire du vrai D3js cd ce qui est fait pour les periodes
    for(var j = 0; j < distinctTypes.length; j++){
      tileZone.append("h5").html(distinctTypes[j]);
      var tileGroup = tileZone.append("div:div")
                  .attr("class", options.classes.tileGroup);
      var filteredItems = items.filter(function(item){
        return item.type == distinctTypes[j];
      });

      for(var k = 0; k < filteredItems.length; k++){
        var item = filteredItems[k];
        var associatedPeriodIds = getPeriodIds(item, links);
        tileGroup.append("span:span")
             .attr("class", "tile" + (item.optClass ? " " + item.optClass: "") + associatedPeriodIds.map(function(a){ return " " + options.classes.period + "-" + a;}).join(' '))
             .style("width", "width:150px")
             .style("background-color", "hsl(" + item.colorHue + ",90%,70%)")
             .html(item.label);
      }
    }

    return tileZone;
  };

  return chart;
};
