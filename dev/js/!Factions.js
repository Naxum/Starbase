//Factions

//Faction object
/*
function Faction (index) {
	this.index = index;
}*/

var CivilianFaction = new Enumerator(0, "civilian");
var CommandFaction = new Enumerator(1, "command");
var OperationsFaction = new Enumerator(2, "operations");
var ScienceFaction = new Enumerator(3, "science");

var Factions = [CivilianFaction, CommandFaction, OperationsFaction, ScienceFaction];

function randomFaction(){
	return Factions[Math.floor(Math.random() * Factions.length)];
}