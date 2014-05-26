$(function() {
	console.log("scale UI loaded");
	
	if (window.location.href.indexOf("uberbar.html") !== -1) {
		console.log("this scene is won't be scaled");
		return;
	}
	
	var STORAGE_KEY = "scaleUI_zoom_";
	var PLUS_NUMPAD_KEY = 107;
	var MINUS_NUMPAD_KEY = 109;
	var PLUS_KEY = 187;
	var MINUS_KEY = 189;
	
	var INCREMENT_SIZE = 0.05;
	
	var getSceneZoomLevel = function() {
		var val = localStorage[STORAGE_KEY+window.location.href];
		if (val !== undefined) {
			return JSON.parse(val);
		} else {
			return undefined;
		}
	};
	
	var storeSceneZooomLevel = function(z) {
		localStorage[STORAGE_KEY+window.location.href] = JSON.stringify(z);
	};
	
	var applyZoomLevel = function(zoom) {
		$('body').children().not('holodeck').each(function() {
			this.style["-webkit-transform-origin"] = "0 0";
			this.style["-webkit-transform"] = "scale("+zoom+")";
		});
	};	
	
	var zoomLevel = getSceneZoomLevel(); 
	
	if (zoomLevel !== undefined) {
		applyZoomLevel(zoomLevel);
	} else {
		zoomLevel = 1;
	}
	
	$(document).keydown(function(e) {
		if ((e.keyCode === PLUS_NUMPAD_KEY || e.keyCode === PLUS_KEY) && e.ctrlKey) {
			if (e.shiftKey) {
				zoomLevel = 1;
			} else {
				zoomLevel += INCREMENT_SIZE;
			}
		} else if ((e.keyCode === MINUS_NUMPAD_KEY || e.keyCode === MINUS_KEY) && e.ctrlKey) {
			zoomLevel -= INCREMENT_SIZE;
		}
		applyZoomLevel(zoomLevel);
		storeSceneZooomLevel(zoomLevel);
	});
});