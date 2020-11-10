"use strict";

let isWalkingForward = false;
let isWalkingBackward = false;
let isWalkingLeft = false;
let isWalkingRight = false;
let isFlyingUp = false;
let isFlyingDown = false;

let flyingAllowed = true;
let flyingThreshold = 0.15;
let movingSpeed = 0;
let movingSpeedMax = 0.04;
let movingDelta = 0.002;
let floor = 0;
let gravity = 0.01;
let cameraGaze;
let room;

let tmpQuaternion = new THREE.Quaternion();
let moveVector = new THREE.Vector3( 0, 0, 0 );
let rotationVector = new THREE.Vector3( 0, 0, 0 );

function setupControls() {
    /*
    window.addEventListener("touchstart", function(event) {
        isWalkingForward = true;
    });

    window.addEventListener("touchend", function(event) {
        isWalkingForward = false;
    })
    */
    
    window.addEventListener("keydown", function(event) {
        if (getKeyCode(event) == 'w') isWalkingForward = true;
        if (getKeyCode(event) == 'a') isWalkingLeft = true;
        if (getKeyCode(event) == 's') isWalkingBackward = true;
        if (getKeyCode(event) == 'd') isWalkingRight = true;
        if (getKeyCode(event) == 'q') isFlyingDown = true;
        if (getKeyCode(event) == 'e') isFlyingUp = true;

        if (getKeyCode(event) == 'o') armSaveJson = true;
        if (getKeyCode(event) == 'j') armFrameBack = true;
        if (getKeyCode(event) == 'k' || getKeyCode(event) == ' ') armTogglePause = true;
        if (getKeyCode(event) == 'l') armFrameForward = true;      
    });

    window.addEventListener("keyup", function(event) {
        if (getKeyCode(event) == 'w') isWalkingForward = false;
        if (getKeyCode(event) == 'a') isWalkingLeft = false;
        if (getKeyCode(event) == 's') isWalkingBackward = false;
        if (getKeyCode(event) == 'd') isWalkingRight = false;
        if (getKeyCode(event) == 'q') isFlyingDown = false;
        if (getKeyCode(event) == 'e') isFlyingUp = false;
    });
}

function setupPlayer() {
    cameraGaze = new THREE.Object3D();
    cameraGaze.position.set(0, 0.1, -60);
    camera.add(cameraGaze);

    setupControls();
}

function updatePlayer() {
    /*
    if (camera.rotation.x > flyingThreshold) {
        flyingAllowed = true;
    } else {
        flyingAllowed = false;
    }
    */

    let cameraPos = camera.position.clone();
    let targetPos = cameraPos.clone();
    let aimPos = cameraGaze.getWorldPosition();

    if ((isWalkingForward || isWalkingBackward || isWalkingLeft || isWalkingRight || isFlyingUp || isFlyingDown) && movingSpeed < movingSpeedMax) {
        if (movingSpeed < movingSpeedMax) {
            movingSpeed += movingDelta;
        } else if (movingSpeed > movingSpeedMax) {
            movingSpeed = movingSpeedMax;
        }
    } else {
        if (movingSpeed > 0) {
            movingSpeed -= movingDelta;
        } else if (movingSpeed < 0) {
            movingSpeed = 0;
        }
    }

    if (movingSpeed > 0) {
    	if (isWalkingForward) {
            camera.translateZ(-movingSpeed);
    	}

    	if (isWalkingBackward) {
            camera.translateZ(movingSpeed);		
    	} 

    	if (isWalkingLeft) {
    		camera.translateX(-movingSpeed);
    	}

    	if (isWalkingRight) {
            camera.translateX(movingSpeed);
    	}

    	if (isFlyingUp) {
            camera.translateY(movingSpeed);
    	}

    	if (isFlyingDown) {
            camera.translateY(-movingSpeed);
    	}

        //camera.position.set(targetPos.x, targetPos.y, targetPos.z);
        camera.updateMatrixWorld();
        camera.lookAt(aimPos);
    }

    /*
    if (!isWalkingForward && camera.position.y > floor) {
        camera.position.y -= gravity;
        if (camera.position.y < floor) camera.position.y = floor;
    }
    */
}


