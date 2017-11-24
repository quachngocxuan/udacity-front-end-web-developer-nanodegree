/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
 
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

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		 it('each feed has a URL defined and it is not empty', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.url).toBeDefined();
				expect(feed.url).not.toBe('');
			});
		 });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
		 it('each feed has a NAME defined and it is not empty', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.name).toBeDefined();
				expect(feed.name).not.toBe('');
			});
		 });
    });


    /* Write a new test suite named "The menu" */
	describe('The menu', function() {
        /* Write a test that ensures the menu element is
         * hidden by default.
         */
		 it('has hidden menu by default', function() {
			expect($('body').hasClass('menu-hidden')).toBeTruthy();
		 });

         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
		  it('toggled when menu icon clicked', function() {
			fireEvent('click', document.getElementsByClassName('menu-icon-link')[0], {});
			expect($('body').hasClass('menu-hidden')).toBeFalsy();
			
			fireEvent('click', document.getElementsByClassName('menu-icon-link')[0], {});
			expect($('body').hasClass('menu-hidden')).toBeTruthy();
		  });
	});
	
    /* Write a new test suite named "Initial Entries" */
	describe('Initial Entries', function() {
        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
		 beforeEach(function(done) {
			// make the feed container empty first
			$('.feed').html('');
			
			// load the first feed
			loadFeed('0', done);
		 });
		 it('when the loadFeed function is called an completes its work, there is at least a sigle .entry element within the .feed container', function() {
			expect($('.feed .entry').length).toBeGreaterThan(0);
		 });
	});
	
    /* Write a new test suite named "New Feed Selection" */
	describe('New Feed Selection', function() {
        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
		 var beforeFeedHTML = '';
		 var afterFeedHTML = '';
		 
		 beforeEach(function(done) {
			// load the second feed
			loadFeed('0', function() {
				// get the first feed's HTML
				beforeFeedHTML = $('.feed').html();
				
				// load the second feed
				loadFeed('1', function() {
					// get the second feed's HTML
					afterFeedHTML = $('.feed').html();
					
					done();
				});
			});
		 });
		 
		 it('when a new feed is loaded, the content actually changes', function() {
			expect(beforeFeedHTML).not.toEqual(afterFeedHTML);
		 });
	});
}());
