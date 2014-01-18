//Units

var units = [];
var maleNames = ["Jack", "John", "Luke", "William", "Will", "Jake", "Andy", "Andreas", "Paul", "Colby", "Scott", "Sam", "Samuel", "Jay", "James", "Jake", "Jacob"];
var femaleNames = ["Jill", "Jane", "Jennifer", "Jen", "Brianna", "Dayna", "Sarah", "Katrina", "Amanda", "Hannah", "Tina", "Meghan", "Bonny", "Abby", "Sam", "Samantha"];
var lastNames = ["Doe", "Smith", "Sparks", "Sawyer", "Pfost", "LaTourette", "Kinchla", "Handy", "Curry", "Pilgrim", "Picard", "Riker", "Gove", "Gough", "Gatsby", "Gatz"];

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
	this.firstName;
	this.lastName;
	this.sex;
	this.currentSection; 
	this.currentPosition = 0;
	
	//data variables
	this.faction = data.faction;
	this.rank = data.rank;
	this.maxHealth = data.maxHealth;
	this.health = data.health;
	this.attack = data.attack;

	if(data.hasOwnProperty('sex'))
		this.sex = data.sex;
	else 
		this.sex = Math.random() < 0.5 ? 'Male' : 'Female';

	if(data.hasOwnProperty('firstName') && data.hasOwnProperty('lastName')) {
		this.firstName = data.firstName;
		this.lastName = data.lastName;
	} else {
		//name generation
		if(this.sex == 'Male') {
			this.firstName = maleNames[Math.floor(Math.random() * maleNames.length)];
		} else if(this.sex == 'Female')	{
			this.firstName = femaleNames[Math.floor(Math.random() * femaleNames.length)];
		} else { //maybe aliums have different sexies
			console.log("Unknown unit sex, unsupported naming convention: " + this.sex);
		}
		
		this.lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
	}
	
	if(data.hasOwnProperty('currentSection'))
		this.currentSection = data.currentSection;
	
	if(data.hasOwnProperty('currentPosition')) {
		this.currentPosition = data.currentPosition;
		this.walkTo(this.currentPosition);
	}
	
	//html elements
	//add ability to blink/smile? later
	this.$element = $("<div class='unit'></div>"); //whole node object
	this.$transform = $("<div class='transform'></div>").appendTo(this.$element); //for changing direction
	this.$uniform = $("<div class='uniform'></div>").appendTo(this.$transform); //colored, animates
	this.$skin = $("<div class='skin'></div>").appendTo(this.$transform); //skin color (hue-rotatable)
	this.$decoration = $("<div class='decoration'></div>").appendTo(this.$transform); //face decorations
	this.$badge = $("<div class='badge'></div>").appendTo(this.$transform); //rank button to show rank
	
	this.$uniform.css({
		background: 'url("images/'+this.faction.name+'-uniform-upscaled.png")'
	});
	
	if(this.faction != CivilianFaction) {
		this.$badge.css({
			background: 'url("images/rank-'+this.rank+'-upscaled.png")'
		});
	}
	//check for variation type stuffs later
	this.$skin.css({
		background: 'url("images/skin-upscaled.png")'
	});
	
	//actions
	this.actions = [];
	
	//don't forget about needs, wants, friends, orders, morale, etc
	
	this.walkTo = function(percent, time){
		this.$element.transition({x: percent*(sectionWidth-this.$element.width()-20)},time,'ease', function(){
			//movment complete
		});
	};
	
	this.setFlipped = function(bool, time){
		this.$transform.css({scale: [bool ? -1 : 1, 1]});
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
				
				this.walkTo(x, 10000*distance);
				this.currentPosition = x;
				break;
		}
		
		// if action is complete, remove it, otherwise continue doing action
		
		this.actions.splice(0, 1);
		this.doNextAction();
	}
}