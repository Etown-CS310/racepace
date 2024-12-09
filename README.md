![nodejs](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![sqlite](https://img.shields.io/badge/Sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

# RacePace

## Project

  -  Martin Ratchford - ratchfordm@etown.edu
  -  Asher Wayde - waydea@etown.edu
  -  Rein Alderfer - alderferr@etown.edu

## Website

  -  Click [HERE](http://racepace.us) to go to the website

## Inspiration

Martin came up with the idea for a web game that works similar to the famous dinosaur web game, but it is with track athletes.

## What it does

The project has a login page, account creation, main menu page with basic UI for, settings, high score, achievments, character selection, and the game itself.

## How we built it

Martin created the menu pages, Asher made the login portal and helped Martin, and I made the basic version of the game. 

## How to set up the project

- install node.js
- navigate to the directory for racepace in a node ternminal
- npm install

Just Test with **node start** and it should be running

# API

### /register
#### POST

**inputs**
- username:String
- password:String

**outputs**
- Success:boolean


### /login
#### POST

**inputs**
- username:String
- password:String

**outputs**
- Verified:boolean
- jwtAuthToken

### /character
#### POST

**inputs**
- jwtAuthToken

**outputs**
- char:String

### /reqChar
#### GET

**inputs**
- jwtAuthToken

**outputs**
- character:String
- (only for fail) msg:String

### /setScore
#### POST

**inputs**
- jwtAuthToken

**outputs**
- status code

### /getHighScores
#### GET

**outputs**
**[10]**
- username:String
- highscore:INT