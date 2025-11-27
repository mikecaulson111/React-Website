import { useState, useRef, useEffect } from "react";
import Sketch from "react-p5";

import Links from "../../components/Links/Links.jsx";
import "./PhysicsDemos.css";

let width = 400;
let height = 400;

var xVelocity = 0;
var xRightPress = false;
var xLeftPress = false;
var xChange = 3;
var consecutiveJumps = 0;

let n = 4;
var blocks = [];

const Types = {
    NONE: "NONE",
    WALL: "WALL",
    COLLECTABLE: "COLLECTABLE",
};

class Block {
    constructor(p5, x, y, widthBlock, heightBlock, type) {
        this.position = p5.createVector(x, y);
        this.velocity = p5.createVector(0, 0);
        this.acceleration = p5.createVector(0, 1);

        this.width = widthBlock;
        this.height = heightBlock;

        this.prevY = this.position.y + this.height;
        this.prevX = this.position.x;

        // this.wall = wall;
        this.type = type;
        this.showable = true;

        this.color = [];
        if (type !== Types.COLLECTABLE) {
            for (var i = 0; i < 3; i++) {
                this.color.push(p5.floor(p5.random(0, 255)));
            }
        } else {
            this.color.push(255);
            this.color.push(255);
            this.color.push(0);
        }
    }

    checkBlockCollision() {
        for(var i = 0; i < n; i++) {
            let otherPosition = blocks[i].getPosition();
            let otherWidth = blocks[i].getWidth();
            let otherHeight = blocks[i].getHeight();
            let yPos = this.position.y + this.height;
            let xPos = this.position.x + this.width;
            // let wall = blocks[i].getWall();
            let type = blocks[i].getType();
            
            if (yPos > otherPosition.y && (this.position.x < otherPosition.x + otherWidth && xPos > otherPosition.x)) {
               if (this.prevY <= otherPosition.y) {
                    if (type !== Types.COLLECTABLE) {
                        this.position.y = otherPosition.y - this.height;
                        this.velocity.y = 0;
                        consecutiveJumps = 0;
                    } else {
                        if (blocks[i].showable) {
                            blocks[i].setShowable(false);
                            console.log("Collected");
                        }
                    }
                }
            }

            if (type === Types.WALL || type === Types.COLLECTABLE) {
                if (this.prevX + this.width <= otherPosition.x && xPos > otherPosition.x) {
                    if (this.position.y < otherPosition.y + otherHeight && yPos > otherPosition.y) {
                        // hitting left wall
                        if (type === Types.WALL) {
                            this.position.x = otherPosition.x - this.width;
                        } else {
                            if (blocks[i].showable) {
                                blocks[i].setShowable(false);
                                console.log("Collected!");
                            }
                        }
                    }
                } else if (this.prevX >= otherPosition.x + otherWidth && this.position.x < otherPosition.x + otherWidth) {
                    if (this.position.y < otherPosition.y + otherHeight && yPos > otherPosition.y) {
                        // hitting right wall
                        if (type === Types.WALL) {
                            this.position.x = otherPosition.x + otherWidth;
                        } else {
                            if (blocks[i].showable) {
                                blocks[i].setShowable(false);
                                console.log("Collected");
                            }
                        }
                    }
                }
            }
        }
    }

    update() {
        this.prevY = this.position.y + this.height;
        this.prevX = this.position.x;
        this.velocity.x += xVelocity;
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);

        if (this.position.x > width - 20 || this.position.x < 0) {
            this.velocity.x = 0;
            this.position.x < 0 ? this.position.x = 0 : this.position.x = width - 20;
        }

        if (this.position.y > height - 20) {
            this.velocity.y = 0;
            this.position.y = height - 20;
            consecutiveJumps = 0;
        }

        this.checkBlockCollision();

        if (this.velocity.x !== 0) {
            this.velocity.x *= 0.65;
        }
    }

    addVelocityX(value) {
        this.velocity.x = value;
    }

    jump(value) { // should use something like 20-25
        this.velocity.y = -1 * value;
    }

    show(p5) {
        p5.stroke(255);
        p5.fill(this.color[0], this.color[1], this.color[2]);
        p5.rect(this.position.x, this.position.y, this.width, this.height);
    }

    getPosition() {
        return this.position;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getWall() {
        return this.wall;
    }

    getType() {
        return this.type;
    }

    setShowable(val) {
        this.showable = val;
    }

    kindaUpdate(block) {
        this.velocity.x = -1;
        this.position.add(this.velocity);
        // block.checkBlockCollision();
    }
}

export default function BlockGame() {
    var block;

    const handleKeyDown = (event) => {
        if (event.key === ' ' || event.key === 'j') {
            // block.jump(20);
            if (consecutiveJumps < 2) {
                block.jump(14);
            }
            consecutiveJumps += 1;
        } else if (event.key === 'a') {
            if (!xLeftPress) {
                xLeftPress = true;
                xVelocity -= xChange;
            }
        } else if (event.key === 'd') {
            if (!xRightPress) {
                xRightPress = true;
                xVelocity += xChange;
            }
        }
    }

    const handleKeyUp = (event) => {
        if (event.key === 'a') {
            if (xLeftPress) {
                xLeftPress = false;
                xVelocity += xChange;
            }
        }
        if (event.key === 'd') {
            if (xRightPress) {
                xRightPress = false;
                xVelocity -= xChange;
            }
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(width, height).parent(canvasParentRef);
        block = new Block(p5, width/2, height/2, 20, 20, Types.NONE);
        blocks.push(new Block(p5, width - 30, 50, 30, 40, Types.WALL));
        blocks.push(new Block(p5, width - 60, height - 200, 10, 20, Types.NONE));
        blocks.push(new Block(p5, width/4, height - 175, 40, 175, Types.WALL));
        blocks.push(new Block(p5, width - 20, 20, 10, 10, Types.COLLECTABLE));
    }

    const draw = (p5) => {
        p5.background(0);
        block.update();
        block.show(p5);
        for (var i = 0; i < n; i++) {
            // blocks[i].kindaUpdate(block);
            if (blocks[i].showable) {
                blocks[i].show(p5);
            }
        }
    }

    return (
        <>
            <h2>Mini Block Game</h2>
            <Sketch setup={setup} draw={draw} />
            <h3 className="block-game-description">
                Here is a mini block game that I have created, it is nothing crazy and is super simple at the moment.
                It allows you to jump and move left and right, there are a couple different types of blocks, the user block,
                a regular block which only has top collision (like its a floor), and a wall which has collision both on top
                as well as the sides.
            </h3>
            <p>This will only work for people in pc browser, not mobile since it requires keyboard inputs</p>
            <h3>List of controls:</h3>
            <ul className="block-game-list">
                <li><p>Space Bar - Jump</p></li>
                <li><p>'j' key - Jump</p></li>
                <li><p>'a' key - move left</p></li>
                <li><p>'d' key - move right</p></li>
            </ul>
            <Links />
        </>
    )
}
