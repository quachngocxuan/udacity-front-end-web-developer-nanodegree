// Select color input
var color = $("#colorPicker").val();
$("#colorPicker").on("change", (evt) => {
  color = $("#colorPicker").val();
});

// When size is submitted by the user, call makeGrid()
$("#submit").on("click", evt => {
	evt.preventDefault();
	
	// Main program
	let height = parseInt($("#input_height").val());
	let width = parseInt($("#input_width").val());
	let canvas = $("#pixel_canvas");
	let grid = new Grid(width, height, canvas);
	grid.makeGrid();
});

var Grid = function(width, height, canvas) {
	this.width = width;
	this.height = height;
	this.canvas = canvas;
}

Grid.prototype.makeGrid = function() {
	var table = new Table(this.height, this.width);
	table.generate();
	table.attachClick();
	this.canvas.html(table.tableEle);
};

var Table = function(nRows, nCols) {
	this.nRows = nRows;
	this.nCols = nCols;
	this.tableEle = undefined;
	
	this.tableTag = "<table></table>";
	this.rowTag = "<tr></tr>";
	this.cellTag = "<td></td>";
}

Table.prototype.generate = function() {
	this.tableEle = $(this.tableTag);
	for (row = 0; row < this.nRows; row++) {
		var rowEle = $(this.rowTag);
		for (column = 0; column < this.nCols; column++) {
			var columnEle = $(this.cellTag);
			rowEle.append(columnEle);
		}
	
		this.tableEle.append(rowEle);
	}
};

Table.prototype.attachClick = function() {
	$(this.tableEle).find("td").on("click", function(evt) {
		$(this).css("background-color", color);
	});
};