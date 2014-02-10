//Sections

var sectionWidth = 500;
var sectionVersion = 1;

var sections = [];

function Section (data){
	this.id = data.id; //uuid (string)
	this.name = data.name; //string
	this.progress = 0; //float-percentage to completion
	this.completionTime = 0; //time in miliseconds
	
	this.terminals = []; //terminal class array
	
	this.$element = $("<li class='section'></li>");
	this.$interface = $("<div class='interface'></div>").appendTo(this.$element);
	this.$info = $("<div class='info'></div>").appendTo(this.$element);
		this.$name = $("<div class='name info-stat' contenteditable spellcheck='false'>"+this.name+"</div>").appendTo(this.$info);
		//this.$level = $("<div class='level info-stat'>Level 1</div>").appendTo(this.$info);
		this.$status = $("<div class='status info-stat'></div>").appendTo(this.$info);
		this.$timebar = $("<div class='timebar'></div>").appendTo(this.$info);
			this.$bar = $("<div class='bar'></div>").appendTo(this.$timebar);
	this.$units = $("<div class='units'></div>").appendTo(this.$element);
		this.$terminals = $("<div class='terminals'></div>").appendTo(this.$units);
	
	this.loadData = function(data){
		this.name = data.name;
		this.$name.text(data.name);
		
		for(var i = 0; i < data.terminals.length; i++){
			addTerminal(data.terminals[i]);
		}
	}
	
	//gets called every second?
	this.tick = function(delta) {
		var currentCompletionTime = TimeAmount; //TimeAmount + (this.getNumTerminalsFree()*5000);
		
		for(var i = 0; i < this.terminals.length; i++) {
			currentCompletionTime += TerminalTimeMultiplier;
			
			if(this.terminals[i].unit != null){
				currentCompletionTime -= this.terminals[i].unit.rank <= 2 ? (this.terminals[i].unit.rank+1) * 2000 : (this.terminals[i].unit.rank-1) * 5000;
			}
		}
		
		currentCompletionTime = Math.max(currentCompletionTime, 5000);
		
		this.progress += delta / currentCompletionTime;
		
		if(currentCompletionTime != this.completionTime)
		{
			this.completionTime = currentCompletionTime;
			this.$status.text(Math.floor(this.completionTime / 1000));
			this.$timebar.transition({"background-size": (100000/this.completionTime)+"% 100%", queue:false});
		}
		
		//console.log(this.progress);
		
		this.$bar.transition({width: Math.min(this.progress * 100, 100) + "%", queue:false}, 'fast');
		
		if(this.progress >= 1)
		{
			this.progress = 0;
			
			this.$bar.transition({"background-color": 'green'}).transition({'background-color': 'yellow', 'width': '0%'}, 'fast');
			
			this.completeTimer();
			//do resource additions
		}
	}
	
	this.createTerminal = function(factionId){
		var data = {
			faction: factionId,
		};
		this.addTerminal(data);
	}
	
	this.addTerminal = function(data) {
		data.id = data.id || createUUID();
		this.terminals.push(new Terminal(this, data));
	}
	
	for(var i = 0; i < data.terminals.length; i++) {
		this.addTerminal(data.terminals[i]);
	}
	
	this.terminalFree = function() {
		return this.getFreeTerminal() != null;
	}
	
	this.getFreeTerminal = function() {
		for(var i = 0; i < this.terminals.length; i++){
			if(this.terminals[i].unitId == "") return this.terminals[i];
		}
		
		return null;
	}
	
	this.getNumTerminalsFree = function() {
		var result = 0;
		for(var i = 0; i < this.terminals.length; i++){
			if(this.terminals[i].unitId == "") result++;
		}
		return result;
	}
	
	this.getNumTerminalsFull = function() {
		var result = 0;
		for(var i = 0; i < this.terminals.length; i++){
			if(this.terminals[i].unitId != "") result++;
		}
		return result;
	}
	
	this.completeTimer = function() {
		for(var i = 0; i < this.terminals.length; i++){
			var resourceName = getResourceNameFromFaction(this.terminals[i].faction);
			var amount = this.terminals[i].level * this.terminals[i].level * TerminalResourceAmount;
			//spawnFloater("+"+this.resources[i].amount + " "+this.resources[i].name, this.$units);
			spawnFloater(amount+"", this.terminals[i].$element, "icon-"+resourceName + " " + resourceName);
			spawnFloater(Math.floor(amount*0.5)+"", this.terminals[i].$element, "icon-money money");
			
			addResource({ 
				name: resourceName, 
				amount: amount
			});
			
			addResource({
				name: "money",
				amount: Math.floor(amount * 0.5)
			});
		}
	}
	
	this.getSaveData = function() {
		var result = {
			name: this.name,
			description: this.description,
			terminals: []
		};
		
		for(var i = 0; i < this.terminals.length; i++) {
			result.terminals.push(this.terminals[i].getSaveData());
		}
		
		return result;
	}
	
	this.loadData(data)
};

function Terminal (section, data) {
	this.id = data.id;
	this.level = data.level || 1;
	this.section = section;
	this.faction = Factions[data.faction];
	this.unitId = data.unitId; //unit id
	this.unit = null;
	
	this.$element = $("<div class='terminal level-"+this.level+" " + this.faction.name + "'></div>").appendTo(section.$terminals);
		this.$upgrade = $("<div class='upgrade'><div>Upgrade</div></div>").appendTo(this.$element);
			this.$cost = $("<div class='cost icon-"+getResourceNameFromFaction(this.faction)+"'></div>").appendTo(this.$upgrade);
		this.$rank = $("<div class='rank'></div>").appendTo(this.$element);
	
	this.$upgrade.on('click touchup', { terminal: this }, function(event){
		event.data.terminal.buyLevel();
	});
	
	this.buyLevel = function(event){
		//console.log("Attempting to buy level.");
		
		if(this.level == 5) {
			console.log("Terminal is already at max level.")
			return; //5 is max level
		}
		
		var resourceName = getResourceNameFromFaction(this.faction);
		if(getResource(resourceName).amount >= this.getUpgradeCost()){
			addResource({
				name: resourceName,
				amount: -this.getUpgradeCost()
			});
			this.levelUp();
		} else {
			//console.log("Not enough funds.");
		}
	}
	
	this.levelUp = function(){
		this.setLevel(this.level + 1);
	}
	
	this.setLevel = function(level){
		if(level > 5) return;
		console.log("Level up!");
		
		if(level != 1)
			spawnFloater("Level Up!", this.$element, "level-up");
		
		level = Math.min(level, 5);
		this.$element.removeClass("level-"+this.level);
		this.level = level;
		this.$element.addClass("level-"+this.level);
		
		this.$cost.text(""+this.getUpgradeCost());
	}
	
	this.getUpgradeCost = function() {
		return (TerminalUpgradeCost * Math.pow(this.level, 3));
	}
	
	this.setLevel(this.level);
	
	this.setUnitId = function(unitId){
		this.unitId = unitId;
		console.log("Setting the unit id but not the unit.");
	}
	
	this.setUnit = function(unit){
		if(typeof unit == "string"){
			console.log("Unit must be of type Unit, not string.");
		}
		
		this.unitId = unit.id;
		this.unit = unit;
		this.$element.removeClass('empty');
	}
	
	this.removeUnit = function() {
		this.unitId = "";
		this.unit = null;
		this.$element.addClass('empty');
	}
	
	this.getSaveData = function() {
		return {
			faction: this.faction,
			unit: this.unit.id
		};
	}
}

function addSection() {
	var data = {
		id: createUUID(),
		name: "New Room",
		terminals: []
	};
	
	var section = new Section(data);
	//section.reposition();
	//section.$element.appendTo("#section-container");
	$("#station").sly('add', section.$element);
	sections.push(section);
}