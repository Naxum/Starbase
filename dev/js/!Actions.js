//Actions

//Action types

var MoveAction = new Enumerator(0, "move");
var WanderAction = new Enumerator(1, "wander");

function newMoveAction(unit, destinationSection){
	var data = {
		unit: unit,
		type: MoveAction,
		targetSection: destinationSection
		//, targetUnit, targetStation	
	};
	var action = new Action(data);
	return action;
}

function newWanderAction(unit){
	var data = {
		unit: unit,
		type: WanderAction
	};
	var action = new Action(data);
	return action;
}

function Action (data) {
	this.unit = data.unit;
	this.type = data.type;
	
	if(data.hasOwnProperty('targetSection'))
		this.targetSection = data.targetSection;
		
	if(data.hasOwnProperty('targetUnit'))
		this.targetUnit = data.targetUnit;
	
	if(data.hasOwnProperty('targetStation'))
		this.targetStation = data.targetStation;
	
	this.complete = function() {
		
	}
}