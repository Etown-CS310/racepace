export default class Player {
  WALK_ANIMATION_TIMER = 200;
  walkAnimationTimer = this.WALK_ANIMATION_TIMER;
  dinoRunImages = [];

  jumpPressed = false;
  jumpInProgress = false;
  falling = false;
  JUMP_SPEED = 0.6;
  GRAVITY = 0.4;

  importedChar;
   

  constructor(ctx, width, height, minJumpHeight, maxJumpHeight, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.width = width;
    this.height = height;
    this.minJumpHeight = minJumpHeight;
    this.maxJumpHeight = maxJumpHeight;
    this.scaleRatio = scaleRatio;

    fetch('http://localhost:8080/reqChar') //Static url for the Requested Character
    .then(function(response){
      if(response.ok)
        return response.json();
      else
        return "Network Error: cannot get character";
    })
    .then(function(response){
      this.importedChar = response.character
    })
    ;

    this.x = 10 * scaleRatio;
    this.y = this.canvas.height - this.height - 1.5 * scaleRatio;
    this.yStandingPosition = this.y;

    this.standingStillImage = new Image();
    this.standingStillImage.src = "../Characters/"+this.importedChar+"/l0_sprite_2.png";
    this.image = this.standingStillImage;

    // Adding four run images for the animation
    // Adding four run images for the animation
    const dinoRunImage1 = new Image();
    dinoRunImage1.src = "../Characters/"+this.importedChar+"/l0_sprite_1.png";
    dinoRunImage1.onload = () => console.log("dinoRunImage1 loaded successfully.");
    dinoRunImage1.onerror = () => console.error("Error loading dinoRunImage1 at path:", dinoRunImage1.src);

    const dinoRunImage2 = new Image();
    dinoRunImage2.src = "../Characters/"+this.importedChar+"/l0_sprite_2.png";
    dinoRunImage2.onload = () => console.log("dinoRunImage2 loaded successfully.");
    dinoRunImage2.onerror = () => console.error("Error loading dinoRunImage2 at path:", dinoRunImage2.src);

    const dinoRunImage3 = new Image();
    dinoRunImage3.src = "../Characters/"+this.importedChar+"/l0_sprite_3.png";
    dinoRunImage3.onload = () => console.log("dinoRunImage3 loaded successfully.");
    dinoRunImage3.onerror = () => console.error("Error loading dinoRunImage3 at path:", dinoRunImage3.src);

    const dinoRunImage4 = new Image();
    dinoRunImage4.src = "../Characters/"+this.importedChar+"/l0_sprite_4.png";
    dinoRunImage4.onload = () => console.log("dinoRunImage4 loaded successfully.");
    dinoRunImage4.onerror = () => console.error("Error loading dinoRunImage4 at path:", dinoRunImage4.src);

    this.dinoRunImages.push(dinoRunImage1);
    this.dinoRunImages.push(dinoRunImage2);
    this.dinoRunImages.push(dinoRunImage3);
    this.dinoRunImages.push(dinoRunImage4);


    //keyboard
    window.removeEventListener("keydown", this.keydown);
    window.removeEventListener("keyup", this.keyup);

    window.addEventListener("keydown", this.keydown);
    window.addEventListener("keyup", this.keyup);

    //touch
    window.removeEventListener("touchstart", this.touchstart);
    window.removeEventListener("touchend", this.touchend);

    window.addEventListener("touchstart", this.touchstart);
    window.addEventListener("touchend", this.touchend);
  }

  touchstart = () => {
    this.jumpPressed = true;
  };

  touchend = () => {
    this.jumpPressed = false;
  };

  keydown = (event) => {
    if (event.code === "Space") {
      this.jumpPressed = true;
    }
  };

  keyup = (event) => {
    if (event.code === "Space") {
      this.jumpPressed = false;
    }
  };

  update(gameSpeed, frameTimeDelta) {
    this.run(gameSpeed, frameTimeDelta);

    if (this.jumpInProgress) {
      this.image = this.standingStillImage;
    }

    this.jump(frameTimeDelta);
  }

  jump(frameTimeDelta) {
    if (this.jumpPressed) {
      this.jumpInProgress = true;
    }

    if (this.jumpInProgress && !this.falling) {
      if (
        this.y > this.canvas.height - this.minJumpHeight ||
        (this.y > this.canvas.height - this.maxJumpHeight && this.jumpPressed)
      ) {
        this.y -= this.JUMP_SPEED * frameTimeDelta * this.scaleRatio;
      } else {
        this.falling = true;
      }
    } else {
      if (this.y < this.yStandingPosition) {
        this.y += this.GRAVITY * frameTimeDelta * this.scaleRatio;
        if (this.y + this.height > this.canvas.height) {
          this.y = this.yStandingPosition;
        }
      } else {
        this.falling = false;
        this.jumpInProgress = false;
      }
    }
  }

  run(gameSpeed, frameTimeDelta) {
    if (this.walkAnimationTimer <= 0) {
      // Cycle through the four running images
      const currentIndex = this.dinoRunImages.indexOf(this.image);
      const nextIndex = (currentIndex + 1) % this.dinoRunImages.length;
      this.image = this.dinoRunImages[nextIndex];

      this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
    }
    this.walkAnimationTimer -= frameTimeDelta * gameSpeed;
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
