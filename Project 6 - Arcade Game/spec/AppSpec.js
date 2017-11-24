// Helper functions
 /* Function to simulate firing an event on an element with additional properties
  * Ex1: fireEvent('keyup', document, {keyCode: 39});
  * Ex2: fireEvent('click', document.getElementsByClassName('menu-icon-link')[0], {});
  */
 function fireEvent(eventType, element, properties) {
	var event = document.createEvent('Event');
	for (var property in properties) {
        if (properties.hasOwnProperty(property)) 
			event[property] = properties[property];
	}
	event.initEvent(eventType);
	element.dispatchEvent(event);
}

describe("Player", function() {
  //var player;
  //var enemy;
  //var game;

  beforeEach(function() {
	//game = new Game();
	//game.play();
  });
  
  describe("when arrow keys were pressed", function() {
	it("should be moved up when pressing arrow up", function() {
		var y = game.player.y;
		fireEvent('keyup', document, {keyCode: 38});
		expect(game.player.y).toBe(y - game.BLOCK_HEIGHT);
	});
	it("should be moved down when pressing arrow down", function() {
		var y = game.player.y;
		fireEvent('keyup', document, {keyCode: 40});
		expect(game.player.y).toBe(y + game.BLOCK_HEIGHT);
	});
	it("should be moved left when pressing arrow left", function() {
		var x = game.player.x;
		fireEvent('keyup', document, {keyCode: 37});
		expect(game.player.x).toBe(x - game.BLOCK_WIDTH);
	});
	it("should be moved right when pressing arrow right", function() {
		var x = game.player.x;
		fireEvent('keyup', document, {keyCode: 39});
		expect(game.player.x).toBe(x + game.BLOCK_WIDTH);
	});
  });

/*  
  it("should be able to play a Song", function() {
    player.play(song);
    expect(player.currentlyPlayingSong).toEqual(song);

    //demonstrates use of custom matcher
    expect(player).toBePlaying(song);
  });

  describe("when song has been paused", function() {
    beforeEach(function() {
      player.play(song);
      player.pause();
    });

    it("should indicate that the song is currently paused", function() {
      expect(player.isPlaying).toBeFalsy();

      // demonstrates use of 'not' with a custom matcher
      expect(player).not.toBePlaying(song);
    });

    it("should be possible to resume", function() {
      player.resume();
      expect(player.isPlaying).toBeTruthy();
      expect(player.currentlyPlayingSong).toEqual(song);
    });
  });

  // demonstrates use of spies to intercept and test method calls
  it("tells the current song if the user has made it a favorite", function() {
    spyOn(song, 'persistFavoriteStatus');

    player.play(song);
    player.makeFavorite();

    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });

  //demonstrates use of expected exceptions
  describe("#resume", function() {
    it("should throw an exception if song is already playing", function() {
      player.play(song);

      expect(function() {
        player.resume();
      }).toThrowError("song is already playing");
    });
  });
*/  
});
