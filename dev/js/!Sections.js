//Sections

var sectionWidth = 500;
var sectionVersion = 1;

var sections = [];

function Section (version, faction, index){
	this.version = version;
	this.faction = faction;
	this.index = index;
	this.multiplier = 1;
	//this.maintenance
	
	this.$element = $("<li class='section "+faction.name+"'></li>");
	this.$units = $("<div class='units'></div>").appendTo(this.$element);
	this.$terminals = $("<div class='terminals'></div>").appendTo(this.$units);
	
	this.terminals = [];
	
	/*
	this.reposition = function(){
		this.$element.css("transform", "translate(" + (((this.index+1) * 20) + (this.index*sectionWidth)) + "px, 0px)");
	};*/
	
	this.addTerminal = function(){
		this.terminals.push(new Terminal(this));
	}
	
	this.terminalFree = function() {
		return this.getFreeTerminal() != null;
	}
	
	this.getFreeTerminal = function() {
		for(var i = 0; i < this.terminals.length; i++){
			if(this.terminals[i].unit == null) return this.terminals[i];
		}
		
		return null;
	}
	
	for(var i = 0; i < Math.random() * 6; i++)
	{
		this.addTerminal();
	}
};

function Terminal (section) {
	this.section = section;
	this.unit = null;
	
	this.$element = $("<div class='terminal'></div>").appendTo(section.$terminals);
	
	this.setUnit = function(unit){
		this.unit = unit;
	}
	
	this.removeUnit = function() {
		this.unit = null;
	}
}

function addSection(faction) {
	var section = new Section(1, faction, sections.length);
	//section.reposition();
	//section.$element.appendTo("#section-container");
	$("#station").sly('add', section.$element);
	sections.push(section);
}