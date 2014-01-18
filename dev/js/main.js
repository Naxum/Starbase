//Main scripts

$(function(){
	//return;
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