var map;
var player_mgr;
var player = new Player();

function start()
{
	map = new mapClass(11001);
	player_mgr = new PlayerMgr();
	//player = new playerClass();
	// Create the loader and queue our 3 images. Images will not 
	// begin downloading until we tell the loader to start. 
	map.loadResource(loader);
	player_mgr.loadResource(loader);
	effect.loadResource(loader);
	var playerCanvas = document.getElementById("debug_canvas");
	playerCanvas.onmouseup = onClick;
	effect.ctx = document.getElementById("debug_canvas").getContext("2d")
	//var mapCanvas = document.getElementById("player");
	//mapCanvas.onmouseup = onClick;
 
	// callback that will be run once images are ready 
	loader.addCompletionListener(function() { 
		player_mgr.start();
		player_mgr.add(player);
		setInterval(redraw, 200);
		//drawGrid();
		map.show();
	}); 
 
	// begin downloading images
	loader.start(); 
}

function redraw() {
	player_mgr.redraw();
}

function onClick(Event) {
	var pos = map.offset2pos(Event.offsetX, Event.offsetY);
	player_mgr.players[0].calcMovePath(pos.x, pos.y);
	map.moveTo(Event.offsetX, Event.offsetY);
	effect.onMove(Event.offsetX, Event.offsetY);
}