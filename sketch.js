let maze;
let graph;
let start;
let goal;
let run = false;
let initRun = false;

function setup() {
	createCanvas(600, 600);
	maze = new Maze(30);
	maze.initMaze(maze.cells[0]);
	graph = new Graph(maze.scl, maze);
	start = graph.cells[0];
	goal = graph.cells[(graph.rows) * (graph.cols) - 1];
	graph.initAPath(start, goal);
	// put setup code here
}

function draw() {
	// put drawing code here
	//frameRate(5);
	background(255);
	if(initRun){
	maze.genMaze();
	
	maze.neighbor = maze.stack[maze.stack.length - 1];
	if(maze.neighbor != undefined)	
	maze.neighbor.showSp();
	}

	graph.show();

	

	if(run){
	graph.aPath(start, goal);
	//console.log(graph.cells);
	}

	start.showSp(122, 122, 122, 0);
	goal.showSp(0, 0, 0, 0);

	maze.show();
}

function keyPressed(){
	if(key == 's'){
		start = graph.setCell(mouseX, mouseY);
	}else if(key == 'g'){
		goal = graph.setCell(mouseX, mouseY);
	}else if(key == 'r'){
		run = true;
		graph.reset();
		graph.initAPath(start, goal);
	}else if(key == ' '){
		initRun = true;
	}
}
