//Main scripts

//monies
var money = 0;
var crystals = 0;
var science = 0;
var power = 0;
var command = 0;

var currentTimeout = 10 * 1000; //ten seconds

//main function stuffs
$(function(){
	
	$("#station").sly({
		horizontal: true,
		itemNav: 'forceCentered',
		smart: 1,
		activateOn: 'click touchend',
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
		
		if(i == 4) {
			sections[4].$element.addClass("new");
		}
	}
	
	//testing interaction of units
	var unit = createNewUnit(randomFaction(), Math.floor(Math.random()*5), 1, 3);
	unit.moveTo(sections[0]);
	
	unit.$element.on('click touchend', function(){
		//unit.moveTo(sections[Math.floor(Math.random()*sections.length)]);
		
		//unit.actions.push(newWanderAction(this));
		//unit.doNextAction();
		
		unit.useTerminal(unit.currentSection.getFreeTerminal());
		
		//unit.$element.appendTo(sections[0].$terminals.find(".terminal")[0]);
	});
	
	$(".terminal").on('touchend click', function(){
		if($(this).parents(".active").length != 0)
			changeMoney(1);
	});
	
	$("#interface .ui-slot").on('touchend click', function(){
		//if($(this).hasClass("open"))
		//{
		//	$(this).removeClass("open").addClass("closed");
		//}
		//else
		if($(this).hasClass("closed"))
		{
			$("#interface .ui-slot.open:not(.unclosable)").removeClass("open").addClass("closed");
			$(this).removeClass("closed").addClass("open");
		}
	});
	
	$("#station").transition({opacity:1, delay: 500}, 500);
	
	console.log("Hello there.");
	
	resetTimerBar();
	setTimeout(tick, currentTimeout);
	
	$(window).resize(function(e) {
		$("#station").sly('reload');
	});
	
	$(document).on('touchmove', function(event){
		event.preventDefault();
	});
});


function tick() {
	//resources for now
	var moneyChange = 0;
	var crystalChange = 0;
	var scienceChange = 0;
	var powerChange = 0;
	var commandChange = 0;
	
	for(var i = 0; i < sections.length; i++){
		var section = sections[i];
		//remove costs from each section (power, command)
		
		for(var j = 0; j < section.terminals.length; j++){
			var terminal = section.terminals[j];
			
			if(terminal.unit == null) continue;
			
			switch(section.faction){
				case CommandFaction:
					commandChange += section.multiplier;
					break;
					
				case ScienceFaction:
					scienceChange += section.multiplier;
					break;
					
				case OperationsFaction:
					powerChange += section.multiplier;
					break;
					
				case CivilianFaction:
					moneyChange += section.multiplier;
					break;
			}
		}
	}
	
	if(moneyChange != 0) {
		console.log("money", moneyChange);
		$money.transition({ background: 'yellow' }).transition({ background: 'white'});
	}
	
	if(scienceChange != 0) {
		console.log("science", scienceChange);
		$science.transition({ background: 'yellow' }).transition({ background: 'white'});
	}
	
	if(powerChange != 0) { 
		console.log("power", powerChange);
		$power.transition({ background: 'yellow' }).transition({ background: 'white'});
	}
	
	if(commandChange != 0) {
		console.log("command", commandChange);
		$command.transition({ background: 'yellow' }).transition({ background: 'white'});
	}
	
	money += moneyChange;
	crystals += crystalChange;
	science += scienceChange;
	power += powerChange;
	command += commandChange;
	
	refreshStats();
	
	resetTimerBar();
	setTimeout(tick, currentTimeout);
}