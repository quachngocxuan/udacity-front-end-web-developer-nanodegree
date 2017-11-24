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
	var obj = {width: width, height: height, canvas: canvas};
	$.extend(obj, Grid.methods);
	
	return obj;
}

Grid.methods = {
	makeGrid: function() {
		var table = Table(this.height, this.width);
		table.generate();
		table.attachClick();
		this.canvas.html(table.tableEle);
	}
};

var Table = function(nRows, nCols) {
	var obj = {nRows: nRows, nCols: nCols};
	obj.tableTag = "<table></table>";
	obj.rowTag = "<tr></tr>";
	obj.cellTag = "<td></td>";
	
	obj.tableEle = undefined;
	$.extend(obj, Table.methods);
	return obj;
}

Table.methods = {
	generate: function() {
		this.tableEle = $(this.tableTag);
		for (row = 0; row < this.nRows; row++) {
			var rowEle = $(this.rowTag);
			for (column = 0; column < this.nCols; column++) {
				var columnEle = $(this.cellTag);
				rowEle.append(columnEle);
			}
		
			this.tableEle.append(rowEle);
		}
	},
	attachClick: function() {
		$(this.tableEle).find("td").on("click", function(evt) {
			$(this).css("background-color", color);
		});
	}
};