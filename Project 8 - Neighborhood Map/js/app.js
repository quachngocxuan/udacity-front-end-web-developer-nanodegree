var octopus;
var infoWindow;
var map;

var ViewModel = function() {
	var self = this;
	this.nearPlaces = ko.observableArray([]);
	
	// Ref: https://stackoverflow.com/questions/20857594/knockout-filtering-on-observable-array
	this.currentFilter = ko.observable("");
	this.filteredPlaces = ko.computed(function() {
		if (!self.currentFilter)
			return self.nearPlaces;
		else {
			let filterText = self.currentFilter();
			return ko.utils.arrayFilter(self.nearPlaces(), function(place) {
				if (place.name.toLowerCase().indexOf(filterText.toLowerCase()) == -1)
					place.marker.setVisible(false);
				else
					place.marker.setVisible(true);
					
				return place.name.toLowerCase().indexOf(filterText.toLowerCase()) != -1;
			});
		}
	});

	this.mapLoadingError = function() {
		alert("Sorry, we cannot load Google Maps now!");
	};
	
	// Ref: https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_geolocation
	this.getMyLocation = function(callback) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(callback, function() {
				alert("Sorry, we cannot get your location to render the map. Please reload the page to try again");
			});
		} else { 
			alert("Geolocation is not supported by this browser.");
		}
	};

	// Ref: https://developers.google.com/maps/documentation/javascript/adding-a-google-map
	this.initMap = function() {
		self.getMyLocation(function(position) {
			var my_pos = {lat: position.coords.latitude, lng: position.coords.longitude};
			map = new google.maps.Map(document.getElementById('map'), {
			  zoom: 15,
			  center: my_pos
			});
			
			// Ref: https://developers.google.com/maps/documentation/javascript/examples/place-search
			infoWindow = new google.maps.InfoWindow();
			var service = new google.maps.places.PlacesService(map);
			service.nearbySearch({
			  location: my_pos,
			  radius: 500,
			  type: ['store']
			}, self.markNearBy);
		});
	};

	this.markNearBy = function(results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
		  for (var i = 0; i < results.length; i++) {
			self.createMarker(results[i]);
			
			results[i].imgURLs = [];
			self.getFlickrImages(results[i]);
			
			self.nearPlaces.push(results[i]);
		  }
		}
	};

	this.createMarker = function(place) {
		var placeLoc = place.geometry.location;
		var marker = new google.maps.Marker({
		  map: map,
		  position: place.geometry.location
		});
		
		// Add marker to the place object
		place.marker = marker;

		google.maps.event.addListener(marker, 'click', function() {
		  self.showMarkerInfo(place);
		});
	};
	
	this.showMarkerInfo = function(place) {
		var slider = "<h3>" + place.name + "</h3>";
		
		// Show a relating images slider
		// Credit: http://responsiveslides.com/		
		if (place.imgURLs.length > 0) {
			slider += "<ul class='rslides' id='slider'>";
			$.each(place.imgURLs, function(i,item){
				let imgURL = "http://farm" + item.farm + ".staticflickr.com/" + item.server + "/" + item.id + "_" + item.secret+ ".jpg";
				let imgTitle = item.title;
				let lat = place.geometry.location.lat();
				let lng = place.geometry.location.lng();
				
				slider += "<li><div><em>" + imgTitle + " (latitude:" + lat + ", longitude:" + lng + ")</em></div><div><img src='" + imgURL + "' /></div></li>";
			});
			slider += "</ul>";
		} else {
			slider += "<div><em>Sorry, no image relating this place</em></div>";
		}
		
		infoWindow.setContent(slider);
		$("#slider").responsiveSlides({
			auto: true,
			speed: 100
	    });

		infoWindow.open(map, place.marker);
		
		// Animate the marker
		// Ref: https://developers.google.com/maps/documentation/javascript/examples/marker-animations
		self.doBounce(place.marker);
	};
	
	this.doBounce = function(marker) {
		marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function() {
			marker.setAnimation(null);
		}, 700);
	};
	
	this.getFlickrImages = function(place) {
		//assign your api key equal to a variable
		var apiKey = '03b28c9ee34fc4e6ec3beb8ad0fb22f3';
		var lat = place.geometry.location.lat();
		var lng = place.geometry.location.lng();
		var radius = 0.01;
		var flickrRequestURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + apiKey + "&lat=" + lat + "&lon=" + lng + "&radius=" + radius + "&format=json&nojsoncallback=1";
		
		// Ref: https://stackoverflow.com/questions/12106818/getjson-with-custom-flickr-api-call-generates-a-parse-error
		// to fix bug relating failed status
		var jqxhr = $.get(flickrRequestURL, function(data) {
		  $.each(data.photos.photo, function(i,item){
			  // Ref: get image URL
			  // https://stackoverflow.com/questions/1803310/how-to-get-static-image-url-from-flickr-url			  
			  place.imgURLs.push(item);
			  
			  // Only load maximum 5 pictures
			  if (i >= 4)
				return false;
			});
		})
		  .done(function() {
			// Do nothing now
		  })
		  .fail(function(data) {
			// I think this situation should not display any alert message, that's because images are only additional information and in some cases it has none images for many places, so display an alert may annoy users.
			console.log("Cannot get flickr images: " + data);
			
			// But according to review, I have to add an alert for each place missing images
			alert("Sorry, at this time, we cannot fetch relating images from Flickr for the place: " + place.name);
		  });
	};
};

function bindingUIEvents() {
	$("#icon-list").on("click", function(event) {
		var left_side = $("#left-side");
		var main = $("#main");
		
		// toggle menu
		if (left_side.attr("class") === "menu-hide") {
			left_side.attr("class", "");
		} else {
			left_side.attr("class", "menu-hide");
			google.maps.event.trigger(map, 'resize');
		}
		
		event.stopPropagation();
	});

	$(window).on("click", function() {
		if ($(document).width() <= 576)
			$("#left-side").attr("class", "menu-hide");
	});

	$(window).resize(function() {
		if ($(document).width() <= 576)
			$("#left-side").attr("class", "menu-hide");
		else
			$("#left-side").attr("class", "");
	});
}

// Apply Knockout bindings
octopus = new ViewModel();
ko.applyBindings(octopus);
		
// Binding events for normal UI
bindingUIEvents();