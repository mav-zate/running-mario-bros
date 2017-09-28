# Running Marios Bros
A browser infinite runner game inspired by [Super Mario Bros.][super-mario] written in JavaScript using the HTML Canvas API.

## Index
1. [Current Features](#current-features)
2. [Credits](#credits)


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

Collision detection allows the game objects to detect each others' presence. Specifically, each time the Mario object renders its image, it checks the position of all the other game objects' image sides (see image below). 

![The sides of an image][image_sides]

The Mario object checks for two kinds of collisions, front and back.
#### Front
![Mario's collision area][mario_front_collision]

This type of collision occurs on the right side of the Mario image. If any of the other game objects' left sides fall within the blue field, it causes Mario to die and the game to end.

#### Bottom
![Mario's bottom collision area][mario_bottom_collision] 

This type of collision occurs on the bottom side of the Mario image. If an enemy's top side falls within the blue field, the Mario "bounces" off it and kills it. However, if a brick's top side falls within the blue field, Mario's jump is broken and he continues to "run."
## Credits




[super-mario]: https://en.wikipedia.org/wiki/Super_Mario_Bros.
[image_sides]: https://github.com/mav-zate/running-mario-bros/blob/master/images/image_sides.png
[mario_front_collision]: https://github.com/mav-zate/running-mario-bros/blob/master/images/mario_front_collision.png
[mario_bottom_collision]: https://github.com/mav-zate/running-mario-bros/blob/master/images/mario_bottom_collision.png
