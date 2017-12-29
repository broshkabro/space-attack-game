(function() {
  function main() {
      game.display = new Display('game-area', game.displayWidth, game.displayHeight);
      game.input = new InputGallery();

      game.spriteImg = new Image();
      game.spriteImg.addEventListener('load', function() {
          game.enemySprite = [new Sprite(this, 14, 66, 60, 50), new Sprite(this, 86, 66, 50, 50)];
          game.shipSprite = new Sprite(this, 91, 3, 63, 57);
          game.bulletSprite = new Sprite(this, 19, 193, 6, 34);
          game.bulletEnemySprite = new Sprite(this, 40, 193, 6, 36);
          game.ufoSprite = new Sprite(this, 16, 136, 35, 35);
          init();
          run();
      });
      game.spriteImg.src = "img/sprite.png";
  }

  function init() {
    game.spaceShip = {
        sprite: game.shipSprite,
        x: (game.display.width - game.shipSprite.w) / 2,
        y: game.display.height - (30 + game.shipSprite.h)
    };
    drawEnemies();
  }

  function drawEnemies() {
      let rows = [0,0,0,0];
      rows.forEach(function(row, rowIndex){
          for (let j = 0; j < 10; j++) {
              game.enemies.push({
                  sprite: game.enemySprite,
                  x: 25 + j * 60,
                  y: 25 + rowIndex * 60,
                  w: game.enemySprite[row].w,
                  h: game.enemySprite[row].h
              });
          }
      })
  }

  function run() {
      let loop = function() {
          update();
          render();
          window.requestAnimationFrame(loop, game.display.canvas);
      };
      window.requestAnimationFrame(loop, game.display.canvas);
  }

  function update() {
      gameControl();
      playerShoot();
      playerUfoShoot();
      enemiesShoot();
      animateEnemies();
  }

  function gameControl() {
      if(game.input.isDown(game.leftArrow)) {
          game.spaceShip.x -= 5;
      }
      if(game.input.isDown(game.upArrow)) {
          game.spaceShip.y -= 5;
      }
      if(game.input.isDown(game.rightArrow)) {
          game.spaceShip.x += 5;
      }
      if(game.input.isDown(game.downArrow)) {
          game.spaceShip.y += 5;
      }
      if(game.input.isPressed(game.spaceKey)) {
          game.bullets.push(new Bullet(game.bulletSprite, game.spaceShip.x + 10, game.spaceShip.y, -8));
          game.bullets.push(new Bullet(game.bulletSprite, game.spaceShip.x + 40, game.spaceShip.y, -8));
      }
      game.spaceShip.x = Math.max(Math.min(game.spaceShip.x, game.display.width - (25 + game.shipSprite.w)), 15);
      game.spaceShip.y = Math.max(Math.min(game.spaceShip.y, game.display.height - (10 + game.shipSprite.h)), 450)
  }

  function playerShoot() {
      game.bullets.forEach(function(bullet, bulletIndex) {
          bullet.updateBullet();
          let bulletOutsideCanvas = bullet.y + bullet.sprite.h < 0;
          if (bulletOutsideCanvas || bullet.y > game.display.height) {
              game.bullets.splice(bulletIndex, 1);
          }

          game.enemies.forEach(function(enemy, enemyInd){
              if(checkCollision(bullet.x, bullet.y, 0, 0,
              enemy.x, enemy.y, enemy.sprite[0].w, enemy.sprite[0].h)) {
                  game.bullets.splice(bulletIndex, 1);
                  game.score += 10;
                  updateScore();
                  game.enemies.splice(enemyInd, 1);
              }
          })
      });

      if(game.gameOn && game.enemies.length === 0) {
          randomUfoFlight();
      }
  }

  function enemiesShoot() {
      let randomShoot = Math.random() < 0.03;
      if (randomShoot && game.enemies.length > 0) {
          let randomEnemy = game.enemies[Math.round(Math.random() * (game.enemies.length - 1))];
          game.enemyBullets.push(new Bullet(game.bulletEnemySprite, randomEnemy.x + randomEnemy.w, randomEnemy.y + randomEnemy.h, 2));
      }
      game.enemyBullets.forEach(function(bullet) {
          bullet.updateBullet();
          if (checkCollision(bullet.x, bullet.y, 0, 0,
          game.spaceShip.x, game.spaceShip.y, game.shipSprite.w, game.shipSprite.h)) {
              gameOver();
          }
      });
      game.enemies.forEach(function(enemy, enemyIndex) {
          if(checkCollision(enemy.x, enemy.y, enemy.sprite[0].w, enemy.sprite[0].h,
          game.spaceShip.x, game.spaceShip.y, game.shipSprite.w, game.shipSprite.h)) {
              gameOver();
          }
          let enemyOutsideCanvas = enemy.y + enemy.sprite[0].h/2 > game.display.height;
          if (enemyOutsideCanvas) {
              game.enemies.splice(enemyIndex, 1);
          }
      });
  }

  function randomUfoFlight() {
      let ufoX = Math.round(Math.random() * 765);
      let drawSpeed = Math.random() < 0.2;
      if (drawSpeed && (game.ufo.length != game.ufoNum)) {
          game.ufo.push(new UFO(game.ufoSprite, ufoX + game.ufoSprite.w, game.ufoY + game.ufoSprite.h, 2))
          game.enemies.push()
      }
      game.ufo.forEach(function (object,index) {
          object.updateUFO();
          let objectOutsideCanvas = object.y + object.sprite.h > 635;
          if (objectOutsideCanvas) {
              game.ufo.splice(index, 1);
          }
          if(checkCollision(object.x, object.y, game.ufoSprite.w-10, game.ufoSprite.h-10,
          game.spaceShip.x, game.spaceShip.y, game.shipSprite.w, game.shipSprite.h)) {
              gameOver();
          }
      })
  }

  function playerUfoShoot() {
      game.bullets.forEach(function (bullet, bulletIndex) {
          game.ufo.forEach(function(object, ufoIndex) {
              if (checkCollision(bullet.x, bullet.y, 0, 0,
              object.x, object.y, game.ufoSprite.w, game.ufoSprite.h)) {
                  game.bullets.splice(bulletIndex, 1);
                  game.score += 20;
                  updateScore();
                  game.ufo.splice(ufoIndex, 1);
              }
          })
      })
  }

  function updateScore() {
     return document.getElementById("score-js").innerHTML = game.score;
  }

  function animateEnemies() {
     game.frames++;
     let framesSpeed = game.frames % game.levelFrame;
     if(framesSpeed === 0) {
         game.spriteFrame = (game.spriteFrame + 1) % 2;
         let maxWidth = 0, minWidth = game.display.width;
         game.enemies.forEach(function (enemy) {
             enemy.x += 30 * game.direction;
             maxWidth = Math.max(maxWidth, enemy.x + enemy.w);
             minWidth = Math.min(minWidth, enemy.x);
         });
         if(maxWidth > game.display.width || minWidth < 0) {
             game.direction *= -1;
             for(let i = 0; i < game.enemies.length; i++) {
                 game.enemies[i].x += 30 * game.direction;
                 game.enemies[i].y += 25;
             }
         }
     }
  }

  function render() {
      game.display.clear();
      game.enemies.forEach(function (element) {
          game.display.drawSprite(element.sprite[game.spriteFrame], element.x, element.y);
      });

      game.display.ctx.save();
      game.bullets.forEach(function(element) {
          game.display.drawSprite(element.sprite, element.x, element.y);
      });
      game.display.ctx.restore();

      game.display.drawSprite(game.spaceShip.sprite, game.spaceShip.x, game.spaceShip.y);

      game.enemyBullets.forEach(function(element) {
          game.display.drawSprite(element.sprite, element.x, element.y);
      });

      game.ufo.forEach(function (object) {
          game.display.drawSprite(object.sprite, object.x, object.y);
      });
  }

  function gameOver() {
      game.gameOn = false;
      game.enemies = [];
      game.ufo = [];
      game.shipSprite = "";
      document.getElementById("game-over-js").style.display = "flex";
      document.getElementById("final-score").innerHTML = game.score;
      restart();
  }

  function restart() {
      document.addEventListener("keydown", resetParams);
      function resetParams(event) {
          if(event.keyCode === game.enter) {
              document.getElementById("game-over-js").style.display = "none";
              location.reload();
              main();
          }
      }
  }
  main();

})();