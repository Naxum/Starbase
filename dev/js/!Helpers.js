//helpers

function runHelpers() {
	$("#station").sly({
		horizontal: true,
		itemNav: 'forceCentered',
		smart: 1,
		activateOn: 'click touchend',
		mouseDragging: 1,
		touchDragging: 1,
		releaseSwing: 1,
		//startAt: 3,
		//scrollBar: $wrap.find('.scrollbar'),
		scrollBy: 1,
		//pagesBar: $wrap.find('.pages'),
		//activatePageOn: 'click',
		speed: 100,
		elasticBounds: 1,
		//easing: 'easeOutExpo', 
		dragHandle: 1,
		dynamicHandle: 1,
		clickBar: 1,
		//itemSelector: '.section'
		//itemNav:'basic'
	});
	
	$("#interface .ui-slot").on('touchend click', function(){
		if($(this).hasClass("closed"))
		{
			$("#interface .ui-slot.open:not(.unclosable)").removeClass("open").addClass("closed");
			$(this).removeClass("closed").addClass("open");
		}
	});
	
	$(window).resize(function(e) {
		$("#station").sly('reload');
	});
	
	$(document).on('touchmove', function(event){
		event.preventDefault();
	});
}

function createUUID() {
	//http://stackoverflow.com/a/2117523
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	    return v.toString(16);
	});
}

function spawnFloater(text, parent, optionalClass) {
	var floater = $("<div class='floater "+optionalClass+"'>"+text+"</div>").appendTo(parent);
	
	var height = parent.height();
	
	floater.transition({x: Math.random()*(parent.width()-floater.width()), y: (-Math.random()*height*1.5)+(height*0.25)}, 0).transition({opacity:0.8}).transition({y: "+=0px"}, 500).transition({y: "-=350px", opacity: 0}, Math.random() * 2000 + 4000, function() {
		floater.remove();
	});
}

//enumerators
function Enumerator (index, name) {
	this.index = index;
	this.name = name;
}

function createStarfield(){
	var $starfield = $("#starfield");
	
	var $star = $("<div class='star'></div>");
	var $tmpStar;
	
	for(var i = 0; i < 300; i++){
		$tmpStar = $star.clone();
		$tmpStar.css({
			opacity: Math.random(),
			"animation-delay": (Math.random() * 5) + "s",
			left: (Math.random()*100)+"%",
			top: (Math.random()*100)+"%",
			transform: "translateZ(0px) rotateZ("+(Math.random()*360)+"deg) scale("+(0.1+Math.random()*1)+")"
		});
		$tmpStar.appendTo($starfield);
	}
}