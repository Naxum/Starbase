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

function getFaction(strings){
	for(var i = 0; i < Factions.length; i++) {
		if(typeof strings !== "string") {
			for(var j = 0; j < strings.length; j++) {
				if(strings[j] == Factions[i].name){
					return Factions[i];
				}
			}
		} else {
			if(strings == Factions[i].name){
				return Factions[i];
			}
		}
	}
	
	console.log("Could not get faction from input! ", strings);
	return null;
}