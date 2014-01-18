//Main scripts

$(function(){
	
	/*$("#station").mousewheel(function(event, delta) {
		this.scrollLeft -= (delta * 30);
		console.log("derp", delta, event);
		event.preventDefault();
  	});*/

	$("#station").sly({
		horizontal: true,
		itemNav: 'forceCentered',
		smart: 1,
		activateOn: 'click',
		mouseDragging: 1,
		touchDragging: 1,
		releaseSwing: 1,
		//startAt: 3,
		//scrollBar: $wrap.find('.scrollbar'),
		scrollBy: 1,
		//pagesBar: $wrap.find('.pages'),
		//activatePageOn: 'click',
		speed: 100,
		elasticBounds: 1,
		//easing: 'easeOutExpo', 
		dragHandle: 1,
		dynamicHandle: 1,
		clickBar: 1,
		//itemSelector: '.section'
		//itemNav:'basic'
	});
	
	for(var i = 0; i < 5; i++)
	{
		// var building = $("<div class='section'></div>");
		// building.css("transform", "translate(" + ((i * 20) + (i*sectionWidth)) + "px, 0px)");
		// $("#station").append(building);
		
		addSection(Factions[Math.floor(Math.random() * Factions.length)]);
	}
	
	var unit = createNewUnit(CivilianFaction, 0, 1, 3);
	unit.moveTo(sections[0]);
	
	unit.$element.click(function(){
		//unit.moveTo(sections[Math.floor(Math.random()*sections.length)]);
		
		//unit.actions.push(newWanderAction(this));
		//unit.doNextAction();
		
		unit.$element.appendTo(sections[0].$terminals.find(".terminal")[0]);
	});
	
	console.log("Hello there.");
});