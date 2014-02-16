//Main scripts

//monies
var money = 0;
var crystals = 0;
var science = 0;
var power = 0;
var command = 0;

var TimeAmount = 10 * 1000; //ten seconds
var TerminalTimeMultiplier = 0;// 10 * 1000;
var lastTimestamp = 0;
var TerminalResourceAmount = 5;
var TerminalUpgradeCost = 100;
var TerminalCreateCost = 400;

var editing = false;

//main function stuffs
$(function(){
	runHelpers();
	
	//should load existing data here
	
	for(var i = 0; i < 5; i++) {
		addSection();//SectionDefaults.rooms[Math.floor(Math.random() * SectionDefaults.rooms.length)]);
		/*
		if(i == 4) {
			sections[4].$element.addClass("new");
		}*/
	}
	
	//addResource({name: "money", amount: 0});
	addResource({name: "command", amount: 100});
	addResource({name: "science", amount: 100});
	addResource({name: "power", amount: 100});
	
	/*
	$(".terminal").on('touchend click', function(){
		if($(this).parents(".active").length != 0)
			addMoney(1);
	});*/
	
	$(window).keyup(function(event){
		//console.log(event.keyCode);
		
		if(editing) {
			//check for enter completion
			return;
		}
		
		if(event.keyCode == 65 || event.keyCode == 37) {
			//move left
			$("#station").sly('prev');
		}
		else if(event.keyCode == 68 || event.keyCode == 39){
			//move right
			$("#station").sly('next');
		}
		
		if(event.keyCode == 85) { //u
			//testing interaction of units
			var unit = createNewUnit(randomFaction(), Math.floor(Math.random()*5));
			unit.moveTo(sections[$(".section.active").index()]);
			
			unit.$element.on('click touchend', function(){
				//unit.moveTo(sections[Math.floor(Math.random()*sections.length)]);
				
				//unit.actions.push(newWanderAction(this));
				//unit.doNextAction();
				
				unit.useTerminal(unit.currentSection.getFreeTerminal());
				
				//unit.$element.appendTo(sections[0].$terminals.find(".terminal")[0]);
			});
		}
	});
	
	$(".section .name").on('touchend click', function(){
		if(editing) return;
		
		editing = true;
		
		$(this).on('keypress', function(event){
			if(event.keyCode == 13){
				editing = false;
				$(this).blur();
				
				event.preventDefault();
				return false;
			} else if($(this).text().length > 30) {
				event.preventDefault();
				return false;
			}
		});
	});
	
	$(".person").on('click touchend', function(event){
		var unit = createNewUnit(Factions[$(this).index()], 0);
		unit.moveTo(sections[$(".section.active").index()]);
		
		unit.$element.on('click touchend', function(){
			unit.useTerminal(unit.currentSection.getFreeTerminal());
		});
	});
	
	$(".terminal").on('click touchend', function(event){
		if($(this).parent(".section"))
		if(!$(this).hasClass("empty")) return;
		
		var unit = createNewUnit(getFaction($(this)[0].className.split(" ")), 0);
		unit.moveTo(sections[$(".section.active").index()]);
		unit.useTerminal(unit.currentSection.terminals[$(this).index()]);
		
		//temp add rank to unit
		unit.$element.on('touchend click', function(event){
			unit.setRank(Math.min(unit.rank + 1, 4));
		});
	});
	
	$("#station").transition({opacity:1, delay: 500}, 500);
	
	console.log("Hello there.");
	
	lastTimestamp = +new Date();
	setTimeout(tick, 1000);
});


function tick() {
	var newTimestamp = +new Date();
	
	for(var i = 0; i < sections.length; i++){
		var section = sections[i];
		
		//send that delta
		section.tick(newTimestamp - lastTimestamp);
	}
	
	lastTimestamp = newTimestamp;
	setTimeout(tick, 1000);
}