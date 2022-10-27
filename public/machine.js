class Machine{
  constructor(x, y, angle, health, playerName, bullets){
    this.playerName = playerName;
    this.x = x * 1.0;
    this.y = y * 1.0;
    this.angle = angle;
    this.speed = 120.0/framePerSecond;
    this.size = 32;
    this.radian = this.angle * Math.PI/ 180.0;
    this.headX = this.x + this.size / 2 + Math.cos(this.radian) * this.size / 2;
    this.headY = this.y + this.size / 2 + Math.sin(this.radian) * this.size / 2;
    this.bullets = bullets;
    this.health = health;
    this.range = 250;
    this.maxBulletCount = 8;
    this.score = 0;
  }

  moveTop(){
        if(this.y + Math.sin(this.radian) * this.speed >=  0 && this.y + Math.sin(this.radian) * this.speed <= maxCanvasHeight- this.size 
      && this.x + Math.cos(this.radian) * this.speed >= 0 && this.x + Math.cos(this.radian) * this.speed <= maxCanvasWidth - this.size){
      this.y += Math.sin(this.radian) * this.speed;
      this.x += Math.cos(this.radian) * this.speed; 
    }  
  }

  moveBack(){
    if(this.y - Math.sin(this.radian) * this.speed / 2>=  0 && this.y - Math.sin(this.radian) * this.speed / 2 <= maxCanvasHeight- this.size 
      && this.x - Math.cos(this.radian) * this.speed / 2>= 0 && this.x - Math.cos(this.radian) * this.speed / 2 <= maxCanvasWidth - this.size){
      this.y -= Math.sin(this.radian) * this.speed / 2;
      this.x -= Math.cos(this.radian) * this.speed / 2; 
    }
  }

  update(){ 
    this.headX = this.x + this.size / 2 + Math.cos(this.radian) * this.size / 2;
    this.headY = this.y + this.size / 2 + Math.sin(this.radian) * this.size / 2;
    for(var i = 0; i < this.bullets.length; i++){
      var bullet = this.bullets[i];
      if(Math.sqrt(Math.pow(bullet.x - bullet.startX, 2) + Math.pow(bullet.y - bullet.startY, 2)) > this.range - 16 ){
        this.bullets.splice(i,1);
      }
    }
  }

  show(){
    this.drawImage(this.x, this.y, this.size, this.size, this.angle);
    this.drawHealthBar();  
    this.drawName();

  }

  drawTail(){
    
  }

  showRange(){
    canvasContext.beginPath();
    canvasContext.strokeStyle = 'rgba(255,255,255,0.5)';
    canvasContext.arc(this.x + this.size / 2, this.y + this.size / 2, this.range, 0, 2 * Math.PI);
    canvasContext.stroke();
  }

  call(){
    this.update();
    this.show();
  }

  drawImage(x, y, w, h, angle){
    canvasContext.save();
    canvasContext.translate(x + w / 2, y + h / 2);
    canvasContext.rotate(- angle * Math.PI / 180.0);
    canvasContext.translate(-x - w / 2, -y - h / 2);
    canvasContext.drawImage(image, 0, 0, this.size, this.size, x, y, w, h);
    canvasContext.restore();
  }

  showBulletCount(){
    
  }

  drawHealthBar(){
    if(this.health >= 65) {
      canvasContext.fillStyle = '#00c62b';
      canvasContext.fillRect(this.x, this.y + 45, 30 * this.health / 93.75, 6);
    } 
    else if(this.health < 65 && this.health > 30){
      canvasContext.fillStyle = '#dbd000';
      canvasContext.fillRect(this.x, this.y + 45, 30 * this.health / 93.75, 6);
    }
    else{
      canvasContext.fillStyle = '#d80000';
      canvasContext.fillRect(this.x, this.y + 45, 30 * this.health / 93.75, 6);
    }
  }

  turnRight(){
    this.angle -= 300/framePerSecond;
    this.angle = Math.floor(this.angle);
    this.radian = -this.angle * Math.PI/ 180.0;
  }

  drawName(){
    canvasContext.fillStyle = 'white';
    canvasContext.font = '15px Arial';
    canvasContext.textAlign = 'center';
    canvasContext.fillText(this.playerName, this.x + 16 , this.y - 15);
  }

  turnLeft(){
    this.angle += 300/framePerSecond;
    this.angle = Math.floor(this.angle);
    this.radian = -this.angle * Math.PI/ 180.0;
  }

  fire(){
    this.headX = this.x + this.size / 2 + Math.cos(this.radian) * this.size / 2;
    this.headY = this.y + this.size / 2 + Math.sin(this.radian) * this.size / 2;
    if(this.bullets.length < this.maxBulletCount){
      this.bullets.push(new Bullet(this.headX, this.headY, this.radian, this.range));
      return true;
    }    
    return false;
  }

  getDamage(){
    this.health -= 5;
  }

  increaseRange(){
    this.range += 10;
  }

  increaseBulletCount(){
    this.maxBulletCount++;
  }

}
