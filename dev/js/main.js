//main javascript file!
var dicks = "Woah!";
console.log("Dang! " + dicks); 

var factions = ["Civilian", "Command", "Operations", "Science", "Military"];

function Section (version, faction, xpos){
	this.version = 1;
	this.faction = 0;
	this.xpos = 0;
	//this.maintenance
};

$(function(){
	return;
	for(var i = 0; i < 5; i++)
	{
		var building = $("<div class='section'></div>");
		building.css("transform", "translate(" + ((i * 20) + (i * 300) + 20) + "px, 0px)");
		$("#station").append(building);
	}
});