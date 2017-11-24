# Feed Reader Testing Project

## Table of Contents

* [Project Overview](#project-overview)
* [How to Run](#how-to-run)
* [Test Suites](#test-suites)

## Project Overview

This project is a sample to test the predefined RSS Feed Reader. It uses the test library Jasmine which supports to test front-end web app by using Javascript.

It is recommended that all projects should follow the TDD methodology which code should be tested even before writing code.

## How to Run
It's very easy to run this test project. Double click on the ```index.html``` to open it on a web browser. You can the feed reader application above and testing result underneath. 

All test suites would be successful as the project has been fully tested. To check any test suite or test case, click on its description at the end of the page.

## Test suites
- **RSS Feeds** test suite: it tests to make sure that the allFeeds variable has been defined and that it is not empty
- **The menu** test suite: includes 2 test cases
  - a test that ensures the menu element is hidden by default
  - a test that ensures the menu changes visibility when the menu icon is clicked
- **Initial Entries** test suite: ensures when the ```loadFeed``` function is called and completes its work, there is at least a single ```.entry``` element within the ```.feed``` container.
- **New Feed Selection** test suite: ensures when a new feed is loaded by the ```loadFeed``` function that the content actually changes