//Main scripts

//monies
var money = 0;
var crystals = 0;
var science = 0;
var power = 0;
var command = 0;

var TimeAmount = 10 * 1000; //ten seconds
var lastTimestamp = 0;

//main function stuffs
$(function(){
	runHelpers();
	
	//should load existing data here
	
	for(var i = 0; i < 5; i++) {
		addSection(SectionDefaults.rooms[Math.floor(Math.random() * SectionDefaults.rooms.length)]);
		/*
		if(i == 4) {
			sections[4].$element.addClass("new");
		}*/
	}
	/*
	$(".terminal").on('touchend click', function(){
		if($(this).parents(".active").length != 0)
			addMoney(1);
	});*/
	
	$(window).keyup(function(event){
		//console.log(event.keyCode);
		
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
			var unit = createNewUnit(randomFaction(), Math.floor(Math.random()*5), 1, 3);
			unit.moveTo(sections[0]);
			
			unit.$element.on('click touchend', function(){
				//unit.moveTo(sections[Math.floor(Math.random()*sections.length)]);
				
				//unit.actions.push(newWanderAction(this));
				//unit.doNextAction();
				
				unit.useTerminal(unit.currentSection.getFreeTerminal());
				
				//unit.$element.appendTo(sections[0].$terminals.find(".terminal")[0]);
			});
		}
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