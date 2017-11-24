// Select color input
var color = $("#colorPicker").val();
$("#colorPicker").on("change", function(evt) {
  color = $("#colorPicker").val();
});

// When size is submitted by the user, call makeGrid()
$("#submit").on("click", function(evt) {
	evt.preventDefault();
	
	// Main program
	let height = parseInt($("#input_height").val());
	let width = parseInt($("#input_width").val());
	let canvas = $("#pixel_canvas");
	let grid = Grid(width, height, canvas);
	grid.makeGrid();
});

var Grid = function(width, height, canvas) {
	var obj = Object.create(Grid.prototype, width, height, canvas);
	obj.width = width;
	obj.height = height;
	obj.canvas = canvas;
	
	return obj;
}

Grid.prototype.makeGrid = function() {
	var table = Table(this.height, this.width);
	table.generate();
	table.attachClick();
	this.canvas.html(table.tableEle);
};

var Table = function(nRows, nCols) {
	var obj = Object.create(Table.prototype, nRows, nCols);
	obj.nRows = nRows;
	obj.nCols = nCols;
	obj.tableEle = undefined;
	
	obj.tableTag = "<table></table>";
	obj.rowTag = "<tr></tr>";
	obj.cellTag = "<td></td>";
	
	return obj;
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