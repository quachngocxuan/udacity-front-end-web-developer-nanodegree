# Classic Arcade Game Clone Project

## Table of Contents

* [Introduction](#introduction)
* [Setup](#setup)
* [How to play](#how-to-play)
* [Programming techniques](#programming-techniques)
* [Versions](#versions)

## Introduction

In this game you have a Player and Enemies (Bugs). The goal of the player is to reach the water, without colliding into any one of the enemies. The player can move left, right, up and down. The enemies move in varying speeds on the paved block portion of the scene. Once a the player collides with an enemy, the game is reset and the player moves back to the start square. Once the player reaches the water the game is won.

On the other hand, rules of the game are:
 - the player starts at the block [3, 6]
 - the player moves one block a time, any direction, but unable to go outside
 - won when reach the water -> move back to the start block
 - collide with an enemy -> move back to the start block
 - enemies move in varying speeds on the paved blocks 
 
## Setup

Setup this game is easy.
 - If you want to play on your personal computer, just double click on the index.html file to open it on a web browser and play it
 - If you want to publish on the Internet for others, just upload all the game folder to a web server. To play it, open a web browser an access to its URL. This setup needs a little understanding on web publishing, and if you don't be familiar with this, let ask a web developer or a web aministrator.

## How to play

How to play the game:
 - Use arrow keys to move the player up and down, left and right.
 - Be careful to not touch any bug before reaching the water
 - When reaching the water or touching a bug, the player would be gone back to the starting point
 
## Programming techniques
The game utilizes advanced knowledge about Javascript in the course, which includes:

 - Object-oriented programming in Javascript
 - Prototypal chaining
 - ES6 features (ex: arrow functions)
 
## Versions

 - Version 1.0: implementation of the game in simpliest rules. The playing time is unlimited.