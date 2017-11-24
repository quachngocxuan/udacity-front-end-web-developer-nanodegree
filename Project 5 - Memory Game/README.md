# Memory Game Project

## Table of Contents

* [Introduction](#introduction)
* [Setup] (#setup)
* [Play] (#play)
* [Libraries used](#libraries)
* [Versions] (#version)

## Introduction

The memory game on the web. This game is created as a required project in the course Udacity nano degree "Front-end Web Developer".

The program utilizes knowledge about HTML5, CSS3, Javascript in the course, which includes:

 - Flex layout by CSS3
 - jQuery selectors, HTML manipulation, timer
 - Resposive layout by media queries
 
Features:
 - Memory game with matrix of 4x4
 - Restart function
 - Star rating
 - Move counting
 - Notification about result gained after completing a game
 
## Setup

Setup this game is easy.
 - If you want to play on your personal computer, just double click on the index.html file to open it on a web browser and play it
 - If you want to publish on the Internet for others, just upload all the game folder to a web server. To play it, open a web browser an access to its URL. This setup needs a little understanding on web publishing, and if you don't be familiar with this, let ask a web developer or a web aministrator.

## Play

How to play the game:
 - Click on a card to open it.
 - Try to remember to click the next card which is matched the previous one clicked. If two cards are the same, they would be removed. If two cards are not the same, they would be face off.
 - When all cards would be removed, you'll complete the game.
 - Click on the ring icon on the left top corner to restart game.
 
Tips & tricks:
 - Try to remember which type of cards opened before.
 - It's better to open cards in your prefered way, by row or by column in order to be easy to recall later.

## Libraries used

In this game, I used the following libraries:

 1. [jQuery 3.2.1](https://jquery.com/)
 2. [Bootstrap 3.1.1](http://getbootstrap.com/)
 3. [Font Awesome](http://fontawesome.io/)
 4. [Animate CSS library](https://daneden.github.io/animate.css/)
 
## Versions

There're two versions with different game rules:

 1. Version 1.0: a count down timer is used to make game over after 3 minutes. Rating is based on 3 stars.
 2. Version 2.0: a normal timer is used to count time elapsed. Rating is based on 5 stars.