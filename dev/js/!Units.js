//Units

var units = [];

function createNewUnit(faction, rank, attack, health){
	var data = {
		faction: faction,
		rank: rank,
		maxHealth: health,
		health: health,
		attack: attack
	};
	
	var unit = new Unit(data);
	
	units.push(unit);
	
	return unit;
}

function Unit (data) {
	//constructed variables
	this.name;
	this.currentSection;
	this.currentPosition = 0;
	
	//data variables
	this.faction = data.faction;
	this.rank = data.rank;
	this.maxHealth = data.maxHealth;
	this.health = data.health;
	this.attack = data.attack;

	if(data.hasOwnProperty('name'))
		this.name = data.name;
	
	if(data.hasOwnProperty('currentSection'))
		this.currentSection = data.currentSection;
	
	if(data.hasOwnProperty('currentPosition')) {
		this.currentPosition = data.currentPosition;
		this.walkTo(this.currentPosition);
	}
	
	//html elements
	this.$element = $("<div class='unit'></div>"); 	  //whole node object
	this.$flipper = $("<div class='flipper'></div>").appendTo(this.$element); //for changing direction
	this.$uniform; 	  //colored uniform, this animates with a walking anim
	this.$skin; 	  //skin color (hue-rotatable)
	this.$decoration; //face decorations
	this.$rankBlip;	  //rank button to show rank
	
	//actions
	this.actions = [];
	
	//don't forget about needs, wants, friends, orders, morale, etc
	
	this.setTransition = function(time){
		this.$element.css({transition: "all "+time+"s"});
	};
	
	this.removeTransition = function(){
		this.$element.css({transition: 'none'});
	};
	
	this.walkTo = function(percent){
		this.$element.css({x: percent*(sectionWidth-this.$element.width()-20)});
	};
	
	this.setFlipped = function(bool){
		this.$flipper.css({scale: [bool ? -1 : 1, 1]});
	};
	
	//add functionality of importance?
	this.moveTo = function(section) {
		//leave stations, stop current actions, move towards exit
		//set walking animation
		if(this.currentSection)
		{
			//move away
			//check actions to remove
		}
		this.actions.push(newMoveAction(this, section));
		this.doNextAction();
	};
	
	this.doNextAction = function(){
		if(this.actions.length == 0) {
			//this.actions.push(newWanderAction(this));
			return;
		}
		
		var action = this.actions[0];
		//console.log("Doing action!", action);
		
		switch(action.type)
		{
			case MoveAction:
				this.currentSection = action.targetSection;
				this.$element.appendTo(action.targetSection.$units);
				action.complete();
				break;
				
			case WanderAction:
				var x = Math.random();
				
				var distance = Math.abs(this.currentPosition - x);
				
				if(this.currentPosition - x < 0) this.setFlipped(true);
				else this.setFlipped(false);
				
				this.setTransition(10*distance);
				this.walkTo(x);
				this.currentPosition = x;
				break;
		}
		
		// if action is complete, remove it, otherwise continue doing action
		
		this.actions.splice(0, 1);
		this.doNextAction();
	}
}