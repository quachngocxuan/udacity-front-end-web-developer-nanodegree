// Select color input
var color = $("#colorPicker").val();
$("#colorPicker").on("change", function(evt) {
  color = $("#colorPicker").val();
});

// When size is submitted by the user, call makeGrid()
$("#submit").on("click", function(evt) {
	evt.preventDefault();
	
	makeGrid();
});

// Function to making the game's grid
function makeGrid() {
  // Your code goes here!
  
  // Select size input
  var height = parseInt($("#input_height").val());
  var width = parseInt($("#input_width").val());

  // Get table setup information
  var canvas = $("#pixel_canvas");
  
  // Generate table cells and add listeners
  var tableEle = $("<table></table>");
  for (row = 0; row < height; row++) {
	var rowEle = $("<tr></tr>");
	for (column = 0; column < width; column++) {
		var columnEle = $("<td></td>");
		rowEle.append(columnEle);
	}
	
	tableEle.append(rowEle);
  }
  
  // Attach event for cells
  $(tableEle).find("td").on("click", function(evt) {
    $(this).css("background-color", color);
  });

  canvas.html(tableEle);
}