# Running Marios Bros
A browser infinite runner game inspired by [Super Mario Bros.][super-mario] written in JavaScript using the HTML Canvas API.

## Index
1. [Current Features](#current-features)
2. [Future Features](#future-features)
3. [Credits](#credits)


## Current Features
### Parallax Background
A parallax effect is a visual effect caused by various layers moving at different speeds. 
It results in a sense of motion where perhaps there is none. 
This is implemented in the game to achieve the illusion that Mario is constantly moving forward to the right of the screen when he
actually just stays in place throughout the game. The implementation used relies on three canvas layers:
1. Background Layer
2. Mario Layer 
3. Non-Mario Layer
#### Background Layer
The background layer is controlled by a background image generator. The generator maintains an array of identical background images.
Each background image's position is set so that they appear as a continous tape. The generator then moves the positions of the background
images at a constant speed to the left of the screen. Once a background image is no longer needed, i.e., it has moved to the left of
the game screen and hence will never again be visible, the generator deletes it and creates a new background image and places it to the
right of the rightmost background image. The end result is a conveyor belt of identical background images that moves from right to left.
#### Mario Layer
The Mario layer is a completely transparent layer whose sole purpose is to repaint Mario as he runs in place and jumps. Despite the
fact that Mario never moves either left or right, different sprites for him are rendered at a constant interval. This constant sprite
change simulates motion in much the same way that animations work. Moreover, the moving background intensifies the feeling that Mario
is moving rightwards at all times.
#### Non-Mario Layer
The Non-Mario layer is where all the bricks and enemies are painted. The images in this layer, like the ones in background layer, move
left at a constant pace. However, they move leftwards much faster than the background does. This disparity in movement speed creates the
illusion that the background layer is further away from the user than the non-Mario layer is.
### Collision Detection

Collision detection allows the game objects to detect each others' presence. Specifically, each the Mario object renders its image, it
checks all the other game objects' positions and dimensions against its own to detect a collision. The Mario object checks for two
kinds of collisions:
1. Front
2. Below 
#### Front
This type of collision occurs on the right side of the Mario image. This is done by checking to see if any of the game object's left
sides are inside a right-hand slice of the Mario image. See image below.
image placeholder
When this collision occurs, Mario dies.
#### Bottom
This type of collision occurs on the bottom side of the Mario image. This is done by checking to see if any of the game object's top
sides are inside a bottom slice of the Mario image. See image below.

image placeholder

When this collision occurs, Mario bounces off and kills an enemy if the object is an enemy, or lands and continues running if that object
is a brick.

## Credits




[super-mario]: https://en.wikipedia.org/wiki/Super_Mario_Bros.
