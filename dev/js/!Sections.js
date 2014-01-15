//Sections

var sectionWidth = 400;
var sectionVersion = 1;

var sections = [];

function Section (version, faction, index){
	this.version = version;
	this.faction = faction;
	this.index = index;
	//this.maintenance
	
	this.$element = $("<div class='section'></div>");
	this.$units = $("<div class='units'></div>").appendTo(this.$element);
	this.reposition = function(){
		this.$element.css("transform", "translate(" + ((this.index * 20) + (this.index*sectionWidth)) + "px, 0px)");
	};
};

function addSection(faction) {
	var section = new Section(1, faction, sections.length);
	section.reposition();
	section.$element.appendTo("#station");
	sections.push(section);
}