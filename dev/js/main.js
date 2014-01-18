//Main scripts

$(function(){
	
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
	
	//should load existing data here
	
	for(var i = 0; i < 5; i++) {
		addSection(randomFaction());
	}
	
	//testing interaction of units
	var unit = createNewUnit(randomFaction(), Math.floor(Math.random()*5), 1, 3);
	unit.moveTo(sections[0]);
	
	unit.$element.click(function(){
		//unit.moveTo(sections[Math.floor(Math.random()*sections.length)]);
		
		//unit.actions.push(newWanderAction(this));
		//unit.doNextAction();
		
		unit.$element.appendTo(sections[0].$terminals.find(".terminal")[0]);
	});
	
	console.log("Hello there.");
});