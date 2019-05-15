var game = function () {


	///////////////////////////////Inicio Quintus/////////////////////////////////////////////////
	// Set up an instance of the Quintus engine and include
	// the Sprites, Scenes, Input and 2D module. The 2D module
	// includes the `TileLayer` class as well as the `2d` componet.
	var Q = Quintus({
		development: true,
		imagePath: "images/",
		audioPath: "audio/",
		audioSupported: ['mp3'],
		dataPath: "data/"
	}).include("Sprites, Scenes, Input, 2D, Audio, Anim, Touch, UI, TMX").setup({
		width: 620, // Set the default width to 800 pixels
		height: 380, // Set the default height to 600 pixels
	}).controls().touch().enableSound();



	///////////////////////////////sprites//////////////////////////////////////////////	

	//CARGA DE DATOS
	Q.load(["sonic.png", "sonic.json",
		"mainTitle.png", "goomba.png", "goomba.json",
		"princess.png", "bloopa.png", "bloopa.json",
		"coin.png", "coin.json", "1up_mushroom.png",
		"pingu.png", "pingu.json", "daemon.png",
		"daemon.json", "shark.png", "shark.json",
		"clown.png", "clown.json", "spring.png", "spring.json",
		"eggman.png", "eggman.json", "bee.png", "bee.json",
		"bullet.png", "bullet.json"], function () {


			Q.compileSheets("sonic.png", "sonic.json");
			Q.compileSheets("goomba.png", "goomba.json");
			Q.compileSheets("bloopa.png", "bloopa.json");
			Q.compileSheets("coin.png", "coin.json");
			Q.compileSheets("spring.png", "spring.json");
			Q.compileSheets("pingu.png", "pingu.json");
			Q.compileSheets("daemon.png", "daemon.json");
			Q.compileSheets("shark.png", "shark.json");
			Q.compileSheets("clown.png", "clown.json");
			Q.compileSheets("eggman.png", "eggman.json");
			Q.compileSheets("bee.png", "bee.json");
			Q.compileSheets("bullet.png", "bullet.json");




			//SPRITE SONIC
			Q.Sprite.extend("Sonic", {
				init: function (p) {
					this.finalBoss = false;
					this.overtheShark = false;
					this.alive = true;
					this.lastMileStone = 1;
					this.oneUp = true;
					this._super(p, {
						sheet: "sonicR",
						sprite: "Sonic_anim",
						jumpSpeed: -400,
						speed: 400,
						vy: 0,
						w: 33,
						h: 40,
						onShark: false,
						agachado: false,
						bola: false
					});

					this.add('2d, platformerControls, animation, tween');

					/*this.on("hit.sprite", function (collision) {
						if (collision.obj.isA("Peach")) {
							Q.audio.play("music_level_complete.mp3");
							Q.stageScene("endGame", 1, { label: "You Win!" });
							this.destroy();
						}
					});*/

					this.on("bump.bottom", function (collision) {
						if (collision.obj.isA("Shark")) {
							this.overtheShark = true;
						}
						else {
							this.overtheShark = false;
						}
					});


				},


				Die: function () {
					if (this.alive) {
						this.alive = false;
						Q.audio.stop();
						Q.audio.play("GameOver.mp3");
						this.gravity = 0;
						//this.stage.unfollow();
						this.play("die");
						this.del('2d, platformerControls');
						Q.state.set("lives", 0);
						Q.stageScene("endGame", 1, { label: "You Died" });
						this.animate({ y: this.p.y - 100 }, 0.4, Q.Easing.Linear, { callback: this.nowDown });
					}

				},

				bounce: function () {
					this.p.vy = -200;
				},

				bounceRight: function () {
					this.animate({ x: this.p.x + 50, y: this.p.y - 32 }, 0.25, Q.Easing.Linear);
				},

				bounceLeft: function () {
					this.animate({ x: this.p.x - 50, y: this.p.y - 32 }, 0.25, Q.Easing.Linear);
				},

				nowDown: function () {

					this.animate({ y: this.p.y + 300 }, 0.8, Q.Easing.Linear, { callback: this.changeToDead });

				},

				changeToDead: function () {

					this.destroy();

				},

				fall: function () {

					if (this.alive) {
						this.destroy();
						Q.state.dec("lives", 1);
						Q.audio.stop();
						Q.audio.play("GameOver.mp3");
						Q.stageScene("endGame", 1, { label: "You Died" });
					}
				},

				step: function (dt) {

					
					if(this.p.x >= 3865.95)
                    {	
						if(!this.finalBoss){
							this.finalBoss = true;
							Q.audio.stop();
							Q.audio.play("FinalBoss.mp3", {loop: true})
						}
                        this.stage.unfollow();
						this.stage.add("viewport").centerOn(4100, 190);
						
                    }
					//if (this.p.y > 520)
						//this.stage.follow(Q("Sonic").first(), { x: true, y: false });


					if (this.p.y > 620) {
						this.fall();
						this.p.bola = false;
					}
					if (!this.alive)
						this.play("die");
					else if (this.p.vy != 0) {
						this.play("jump_right");
						this.p.speed = 400;
						this.p.agachado = false;
						this.p.bola = true;
					}
					else if (Q.inputs['down']) {
						this.p.agachado = true;
						if (this.p.speed > 500) {
							this.play("bola");
							this.p.bola = true;
						}
					}
					//DERECHA
					else if (this.p.vx > 0) {
						this.p.flip = false;
						this.p.agachado = false;
						this.p.bola = false;
						this.p.speed = this.p.speed + 10;
						if (this.p.speed > 500) {
							this.play("super_speed");
						}
						else {
							this.play("run_right");
						}
					}
					//IZQUIERDA
					else if (this.p.vx < 0) {
						this.p.flip = 'x';
						this.p.agachado = false;
						this.p.bola = false;
						this.p.speed = this.p.speed + 50;
						if (this.p.speed > 1000) {
							this.play("super_speed");

						}
						else {
							this.play("run_right");
						}
					}
					else if (this.p.vx == 0) {
						this.p.speed = 400;
						this.p.bola = false;
						if (this.p.agachado) {
							this.play("tumbado");
						}
						else {
							this.play("Stand_right");
							//console.log("x:" + this.p.x + "y:" + this.p.y);
						}
					}

				}
			});

			//SPRITE EGGMAN
			Q.Sprite.extend("Eggman", {

				init: function (p) {
					this.timeFromTurn = 0;
					this.col = false;
					this.alive = true;
					this._super(p, {
						sheet: "eggmanL",
						sprite: "eggman_anim",
						hits: 0,
						vx: 50,
						//collisionMask: Q.SPRITE_FRIENDLY | Q.SPRITE_ACTIVE | Q.SPRITE_DEFAULT
					});
					this.initvx = this.p.vx;

					this.add('2d, aiBounce, animation, tween');

					this.on("hit.sprite", function (collision) {
						if (collision.obj.isA("Sonic") && !this.col) {
							if (!collision.obj.p.bola) {
								this.col = true;
								if (Q.state.get("score") == 0) {
									if (Q.state.get("lives") > 1) {
										Q.state.dec("lives", 1);
										Q.stageScene("livesLeft", Q.state.get("lives"));
									}
									else {
										collision.obj.Die();
									}
								}
								else {
									Q.state.set("score", 0);
									if (this.p.x > collision.obj.p.x) {
										collision.obj.bounceLeft();
									}
									else {
										collision.obj.bounceRight();
									}
								}
								setTimeout(() => {
									this.col = false;
								}, 500);
							}
							else {
								this.col = true;
								collision.obj.bounce();
								if (this.p.hits == 3) {
									
									//this.destroy();
									this.DEAD();
								}
								else{
									this.p.hits++;
									var dir = 1;
									if (this.p.vx < 0) dir = -1;
									this.p.vx += 80 * dir;
								}
								setTimeout(() => {
									this.col = false;
								}, 500);
							}

						}
					});
					
					this.on("endAnim", this, "die");
				},


				step: function (dt) {

					if (this.p.vx != 0 && this.alive) {
						if (this.p.vx > 0) {
							this.p.flip = 'x';
							this.play("walk_left");
						}
						else {
							this.p.flip = false;
							this.play("walk_left");
						}
					}
				},

				DEAD: function () {
					if (this.alive) {
						this.alive = false;
						
						Q.audio.stop();
						Q.stageScene("endGame", 1, { label: "You Win!" });
						Q.audio.play("BossDefeated.mp3");
						this.play("die");
						this.p.vx = 0;
					}
				},

				die: function () {
					this.destroy();
				}
			});



			//SPRITE PINGU
			Q.Sprite.extend("Pingu", {


				init: function (p) {


					this._super(p, {
						sheet: "pingu",
						sprite: "Pingu_anim",
						x: 1500,
						y: 450,
						vx: 100
					});

					this.add('2d, aiBounce, animation, DefaultEnemy');
				},


				step: function (dt) {

					if (this.p.vx != 0 && this.alive) {
						if (this.p.vx > 0) {
							this.p.flip = 'x';
							this.play("run");
						}
						else {
							this.p.flip = false;
							this.play("run");
						}
					}
				}
				// Listen for a sprite collision, if it's the player,
				// end the game unless the enemy is hit on top

			});


			//SPRITE CLOWN
			Q.Sprite.extend("Clown", {


				init: function (p) {


					this._super(p, {
						sheet: "clown",
						sprite: "Clown_anim",
						x: 1500,
						y: 450,
						vx: 100
					});

					this.add('2d, aiBounce, animation, DefaultEnemy');
				},


				step: function (dt) {

					if (this.p.vx != 0 && this.alive) {
						this.play("run");
					}
				}
				// Listen for a sprite collision, if it's the player,
				// end the game unless the enemy is hit on top

			});


			//SPRITE DAEMON
			Q.Sprite.extend("Daemon", {


				init: function (p) {


					this._super(p, {
						sheet: "daemon",
						sprite: "Daemon_anim",
						gravity: 1 / 4

					});

					this.add('2d, aiBounce, animation, DefaultEnemy');

					//this.on("dead", this, "DEAD");
				},

				step: function (dt) {

					if (this.alive) {
						this.play("standing");
						if (this.p.vy == 0)
							this.p.vy = -400;
					}

				}
				// Listen for a sprite collision, if it's the player,
				// end the game unless the enemy is hit on top

			});


			//SPRITE SHARK
			Q.Sprite.extend("Shark", {


				init: function (p) {
					//this.sonic = false;
					this.dir = "up";
					this._super(p, {
						sheet: "shark",
						sprite: "Shark_anim",
						gravity: 1 / 4

					});
					this.inity = this.p.y;
					this.initvy = this.p.vy;
					this.add('2d, aiBounce, animation');
					this.on("hit.sprite", function (collision) {
						this.p.vy = -this.p.vy;
					});
					this.on("bump.top", function (collision) {
						if (collision.obj.isA("Sonic")) {
							this.sonic = true;
							/*	if(this.p.y > this.inity){
									this.p.vy = (this.initvy - this.inity);
								}
								else {
									this.p.vy = -(this.initvy - this.inity);
								}*/
							//collision.obj.p.vy = this.p.vy;
							//collision.obj.p.y = this.p.y;
						}
						else this.sonic = false;
					});
				},

				step: function (dt) {

					if (this.p.y > this.inity + 150 || this.p.y < this.inity - 150) {
						if (this.dir === "up") this.dir = "down";
						else this.dir = "up";
						this.p.vy = -this.p.vy;
					}
					/*else if (this.p.vy === 0 && (this.p.y < this.inity + 150 || this.p.y > this.inity - 150)) {
						//if(!this.sonic){
						this.p.inity = this.p.y + 150;
						this.p.vy = -300;*/
					//}
					/*else if(this.dir === "up"){
						this.p.vy = -300;
					}
					else {
						this.p.vy = 300;
					}*/
					/*
					else if(this.dir === "up" ){
						this.p.vy = -(150 - (this.p.y - this.inity));
					}
					else{
						this.p.vy = 150 - (this.inity - this.p.y);
					}
					console.log(this.p.vy);*/

					//}
					/*if (this.alive) {
						this.play("standing");
						if (this.p.vy == 0)
							this.p.vy = -300;
					}*/

				}
			});

			//SPRITE BEE
			Q.Sprite.extend("Bee", {
				init: function (p) {

					this.alive = true;
					this.time = 0;
					this._super(p, {
						sheet: "bee",
						sprite:"Bee_anim",
						x: 300,
						y: 250,
						gravity: 0 //Asi va en horizontal por el cielo

					});
					this.initx = this.p.x;

					this.add('2d, tween, aiBounce, animation, DefaultEnemy');
				},

				step: function (dt) {

					if (this.alive) {

						if (this.p.x > this.initx + 200 || this.p.x < this.initx - 200) {
							this.p.vx = -this.p.vx;
						}

						var that = this;
						if (this.time === 0 || this.time === undefined) {
							this.time = 1;
							setTimeout(() => {
								this.time = 0;
								that.shoot();
							}, 500);
						}

						this.play("standing");
						if (this.p.vx == 0)
							this.p.vx = 200;
					}
				},
				/**
				 * Este método va a crear un nuevo objeto "Bullet".
				 * La posición del nuevo "Bullet" tiene es la misma 
				 * que la de la abeja en ese momento
				 */
				shoot: function () {
					if (this.alive) {
						this.stage.insert(new Q.Bullet({
							x: this.p.x,
							y: this.p.y
						}))
					}
				}

			});


			/**
			 * Voy a crear un nuevo objeto "Bullet" extendiendo "MovingSprite".
			 * Las propiedades por defecto son:
			 * - Utilizar el sprite "bullet".
			 * - El tipo es SPRITE_BULLET. 
			 * - Colisiona con SPRITE_ENEMY.
			 * - "sensor: true" porque quiero definir mi propio comportamiento de colisiones.
			 */
			Q.Sprite.extend("Bullet", {
				init: function (p) {
					this.alive = true;
					this.col = false;
					this._super(p, {
						sheet: "bullet",
						sprite: "Bullet_anim",
						sensor: true
					});

					/**
					 * Añadiendo el componente 2d para activar la detección de colisiones y el movimiento.
					 */
					this.add("animation, tween");

					this.on("hit.sprite", function (collision) {
						if (collision.obj.isA("Sonic") && !this.col) {
							this.col = true;
							if (Q.state.get("score") <= 0) {
								if (Q.state.get("lives") > 1) {
									/*Q.state.dec("lives", 1);
									Q.stageScene("livesLeft", Q.state.get("lives"));*/
									collision.obj.fall();
								}
								else {
									collision.obj.Die();
									this.destroy();
								}
							}
							else {
								Q.state.set("score", 0);
								if (this.p.x > collision.obj.p.x) {
									collision.obj.bounceLeft();
								}
								else {
									collision.obj.bounceRight();
								}
							}
							setTimeout(() => {
								this.col = false;
							}, 500);
						}
					});
				},
				step: function (dt) {
					if (this.alive) {
						this.play("fire");
						this.animate({ y: this.p.y + 200 }, 2, Q.Easing.Linear, { callback: this.destroy });
						if (this.p.y > 700) this.destroy();
					}
				},

				destroy: function () {
					if (this.alive) {
						this.alive = false;
						this.destroy();
					}
				}

			});


			// SPRING SPRITE
			Q.Sprite.extend("Spring", {
				init: function (p) {
					this.touched = false;
					this._super(p, {
						sheet: 'spring',
						sprite: 'spring_anim',
						gravity: 0
					});


					this.add('2d, animation, tween');
					// Write event handlers to respond hook into behaviors

					this.on("bump.top", function (collision) {
						if (collision.obj.isA("Sonic")) {
							collision.obj.p.vy = -700;
							this.play("bounce");
						}
					});


				},

			});

			//SPRITE COIN 
			Q.Sprite.extend("Coin", {


				init: function (p) {

					this.taken = false;
					this._super(p, {
						sheet: "coin",
						sprite: "Coin_anim",
						sensor: true
					});

					this.add('animation, tween');

					this.on("hit.sprite", function (collision) {
						if (collision.obj.isA("Sonic")) {
							if (!this.taken) {
								this.taken = true;
								Q.audio.play("GetRing.mp3");
								this.animate({ y: p.y - 50 }, 0.25, Q.Easing.Linear, { callback: this.destroy });
								Q.state.inc("score", 10);
							}
						}
					});
				},

				step: function (dt) {

					this.play("twist");
				}

			});

			//SPRITE ONEUP
			Q.Sprite.extend("OneUp", {


				init: function (p) {

					this.taken = false;

					this._super(p, {
						asset: "1up_mushroom.png",
						x: 2000,
						y: 430,
						vx: 100,
						sensor: true
					});

					this.on("hit.sprite", function (collision) {


						if (collision.obj.isA("Sonic")) {
							if (!this.taken) {
								this.taken = true;
								collision.obj.extralife();
								this.destroy();
							}
						}
					});

				}


			});

			////////////////////////////////////COMPONENTES////////////////////////////////////////////////////
			//COMPONENTE ENEMIGOS

			//COMPONENTE ENEMIGOS
			Q.component("DefaultEnemy", {
				added: function () {
					this.col = false;
					this.entity.alive = true;
					this.entity.on("hit.sprite", function (collision) {
						if (collision.obj.isA("Sonic") && !this.col) {
							if (!collision.obj.p.bola) {
								this.col = true;
								if (Q.state.get("score") == 0) {
									if (Q.state.get("lives") > 1) {
										collision.obj.fall();
										//Q.state.dec("lives", 1);
										//Q.stageScene("livesLeft", Q.state.get("lives"));
										//Q.stageScene("endGame", 1, { label: "You Died" });
									}
									else {
										collision.obj.Die();
									}
								}
								else {
									Q.state.set("score", 0);
									if (this.p.x > collision.obj.p.x) {
										collision.obj.bounceLeft();
									}
									else {
										collision.obj.bounceRight();
									}
								}
								setTimeout(() => {
									this.col = false;
								}, 300);
							}
							else {
								collision.obj.bounce();
								this.DEAD();
							}

						}
					});

					this.entity.on("endAnim", this.entity, "die");

				},

				extend: {
					DEAD: function () {
						if (this.alive) {
							Q.audio.play("EnemyDie.mp3");
							this.alive = false;
							Q.state.inc("score", 100);
							this.destroy();

						}
					},

					die: function () {
						this.destroy();
					}
				}

			});
			////////////////////////////////////ANIMACIONES/////////////////////////////////////////////////////

			//Animaciones Sonic
			Q.animations('Sonic_anim', {
				run_right: { frames: [1, 2, 3, 4, 5, 6], rate: 1 / 10 },
				Stand_right: { frames: [0] },
				jump_right: { frames: [7, 8, 9, 10, 11, 12], rate: 1 / 10 },
				super_speed: { frames: [13, 14, 15, 16, 17, 18, 19, 20], rate: 1 / 3 },
				die: { frames: [12], loop: true },
				down: { frames: [21, 22, 23], rate: 1 / 10 },
				bola: { frames: [12], rate: 1 / 3 },
				tumbado: { frames: [21], rate: 1 / 10 }
			});


			//Animaciones Bowser
			Q.animations('eggman_anim', {
				stand_left: { frames: [0], rate: 1 / 3 },
				walk_left: { frames: [1, 2, 3, 4], rate: 1 / 4 },
				die: { frames: [5, 6, 7], rate: 1 / 3, loop: false, trigger: "endAnim" }
			});

			//Animaciones Goomba
			Q.animations('Goomba_anim', {
				run: { frames: [0, 1], rate: 1 / 3 },
				die: { frames: [2], rate: 1 / 2, loop: false, trigger: "endAnim" }
			});

			//Animaciones Bloopa
			Q.animations('Bloopa_anim', {
				standing: { frames: [0, 1], rate: 1 / 2 },
				die: { frames: [2], rate: 1 / 2, loop: false, trigger: "endAnim" }
			});

			//Animaciones Coin
			Q.animations('Coin_anim', {
				twist: { frames: [0, 1, 2, 3], rate: 1 / 3, loop: true }
			});

			Q.animations("Pingu_anim", {
				run: { frames: [0, 1, 2, 3, 4], rate: 1 / 3, loop: false }
			});

			Q.animations("Daemon_anim", {
				standing: { frames: [0, 1, 2], rate: 1 / 5, loop: false }
			});

			Q.animations("Shark_anim", {
				standing: { frames: [0, 1, 2], rate: 0.5 / 3, loop: false }
			});

			Q.animations("Clown_anim", {
				run: { frames: [0, 1, 2, 3], rate: 0.5 / 3, loop: false }
			});

			Q.animations("Bee_anim", {
				standing: { frames: [0, 1, 2, 3, 4, 5, 6, 7], rate: 1 / 3, loop: false }
			});

			Q.animations("Bullet_anim", {
				fire: { frames: [0, 1], rate: 1 / 3, loop: true }
			});

			//Animación Spring
			Q.animations("spring_anim", {
				bounce: {
					frames: [1, 2, 3, 0], rate: 2 / 15,
					flip: false, loop: false
				}
			});


			///////////////////////////////////AUDIOS///////////////////////////////////////////////////////////
			//CARGA DE AUDIOS
			Q.load(["BossDefeated.mp3", "EnemyHit.mp3", "FinalBoss.mp3", "GameOver.mp3", "GetRing.mp3", "GreenHillZone.mp3", "MainTitle.mp3", "EnemyDie.mp3"], function () {

				});
			///////////////////////////////////CARGA NIVELES////////////////////////////////////////////////////

			//INICIALIZACION
			Q.loadTMX("game.tmx", function () {
				Q.stageScene("mainTitle");
			});


			//NIVEL 1
			Q.scene("level1", function (stage) {

				Q.stageTMX("game.tmx", stage);
				Q.audio.stop();
				Q.audio.play('GreenHillZone.mp3', { loop: true });
				//Para pos inicial x:200
				//Para probar parte del BOSS x: 3500
				var player = stage.insert(new Q.Sonic({ x: 200, y: 150 }));
				
				stage.insert(new Q.Coin({x: 250, y: 210}));
				stage.insert(new Q.Coin({x: 300, y: 210}));
				stage.insert(new Q.Coin({x: 350, y: 210}));

				stage.insert(new Q.Coin({x: 400, y: 270}));
				stage.insert(new Q.Coin({x: 450, y: 270}));
				stage.insert(new Q.Coin({x: 500, y: 270}));
				stage.insert(new Q.Coin({x: 550, y: 270}));

				stage.insert(new Q.Coin({x: 600, y: 210}));
				stage.insert(new Q.Coin({x: 650, y: 210}));
				stage.insert(new Q.Coin({x: 700, y: 210}));

				stage.insert(new Q.Coin({x: 920, y: 210}));
				stage.insert(new Q.Coin({x: 970, y: 210}));

				stage.insert(new Q.Coin({x: 1110, y: 210}));
				stage.insert(new Q.Coin({x: 1160, y: 210}));

				stage.insert(new Q.Coin({x: 1280, y: 210}));
				stage.insert(new Q.Coin({x: 1330, y: 210}));
				stage.insert(new Q.Coin({x: 1380, y: 210}));
				stage.insert(new Q.Coin({x: 1430, y: 210}));

				stage.insert(new Q.Coin({x: 1550, y: 210}));
				stage.insert(new Q.Coin({x: 1600, y: 210}));
				stage.insert(new Q.Coin({x: 1650, y: 210}));

				stage.insert(new Q.Coin({x: 1750, y: 210}));
				stage.insert(new Q.Coin({x: 1800, y: 210}));

				stage.insert(new Q.Coin({x: 1880, y: 190}));
				stage.insert(new Q.Coin({x: 1930, y: 210}));
				stage.insert(new Q.Coin({x: 1980, y: 210}));
				stage.insert(new Q.Coin({x: 2030, y: 210}));
				stage.insert(new Q.Coin({x: 2080, y: 190}));

				stage.insert(new Q.Coin({x: 2170, y: 210}));
				stage.insert(new Q.Coin({x: 2210, y: 210}));

				stage.insert(new Q.Coin({x: 2420, y: 210}));
				stage.insert(new Q.Coin({x: 2470, y: 210}));
				stage.insert(new Q.Coin({x: 2520, y: 210}));
				stage.insert(new Q.Coin({x: 2570, y: 210}));
				stage.insert(new Q.Coin({x: 2620, y: 210}));

				stage.insert(new Q.Coin({x: 2670, y: 270}));
				stage.insert(new Q.Coin({x: 2720, y: 270}));
				stage.insert(new Q.Coin({x: 2770, y: 270}));
				stage.insert(new Q.Coin({x: 2820, y: 270}));

				stage.insert(new Q.Coin({x: 2870, y: 210}));
				stage.insert(new Q.Coin({x: 2920, y: 210}));
				stage.insert(new Q.Coin({x: 2970, y: 210}));
				stage.insert(new Q.Coin({x: 3020, y: 210}));
				stage.insert(new Q.Coin({x: 3070, y: 210}));

				stage.insert(new Q.Coin({x: 3120, y: 210}));
				stage.insert(new Q.Coin({x: 3170, y: 210}));

				stage.insert(new Q.Coin({x: 3220, y: 270}));
				stage.insert(new Q.Coin({x: 3270, y: 270}));
				stage.insert(new Q.Coin({x: 3320, y: 210}));
				stage.insert(new Q.Coin({x: 3370, y: 210}));
				stage.insert(new Q.Coin({x: 3420, y: 270}));
				stage.insert(new Q.Coin({x: 3470, y: 270}));
				stage.insert(new Q.Coin({x: 3520, y: 210}));
				stage.insert(new Q.Coin({x: 3570, y: 210}));
				
				//Enemigos
				stage.insert(new Q.Bee({x: 650, y: 100 }));//{x: 1000, y: 250 }
				stage.insert(new Q.Daemon({ x: 450, y: 50 }));
				stage.insert(new Q.Pingu({ x: 1970, y: 150 }));
				stage.insert(new Q.Clown({ x: 2850, y: 150 }));
				stage.insert(new Q.Spring({ x: 3650, y: 272 }));
				stage.insert(new Q.Eggman({ x: 4090, y: 150 }));
				//stage.insert(new Q.Shark({ x: 560, y: 350 }));
				
				stage.add("viewport").centerOn(200, 194);
				stage.follow(Q("Sonic").first(), { x: true, y: false });
				stage.viewport.offsetX = -100;
				stage.viewport.offsetY = 160;
			});


			//TITULO DEL JUEGO
			Q.scene("mainTitle", function (stage) {
				Q.audio.stop();
				Q.audio.play('MainTitle.mp3', {loop: true});
				var button = new Q.UI.Button({
					x: Q.width / 2,
					y: Q.height / 2,
					asset: "mainTitle.png"
				});
				stage.insert(button);
				button.on("click", function () {
					Q.clearStages();
					Q.state.reset({ score: 0, lives: 2, time: 0 });
					var timer = setInterval(function () {
						Q.state.inc("time", 1);
					}, 1000);
					Q.stageScene("level1");
					Q.stageScene("hud", 3);
				});

			});

			//GAME OVER
			Q.scene('endGame', function (stage) {

				Q.audio.stop("GreenHillZone.mp3");
				var container = stage.insert(new Q.UI.Container({

					x: Q.width / 2,
					y: Q.height / 2,
					fill: "rgba(0,0,0,0.5)"

				}));
				var button = container.insert(new Q.UI.Button({

					x: 0,
					y: 0,
					fill: "#CCCCCC",
					label: (Q.state.get("lives") > 0 ? "Play Again" : "GAME OVER")

				}))
				var label = container.insert(new Q.UI.Text({
					y: -10 - button.p.h,
					label: stage.options.label
				}));
				// When the button is clicked, clear all the stages
				// and restart the game.

				button.on("click", function () {
					Q.clearStages();
					if (Q.state.get("lives") > 0) {
						Q.stageScene('level1');
						Q.stageScene("hud", 3);
					}
					else
						Q.stageScene('mainTitle');
				});
				// Expand the container to visibily fit it's contents
				// (with a padding of 20 pixels)
				container.fit(20);
			});
		});
	//HUD
	Q.scene("hud", function (stage) {
		/** Primero, voy a crear un "Container" que contendrá los labels. */
		var container = stage.insert(new Q.UI.Container({
			x: Q.width / 3,
			y: Q.height / 6,
			w: Q.width,
			h: 50,
			radius: 0
		}));

		/** Ahora voy a insertar los tres labels uno encima de otro. */
		container.insert(new Q.SCORE({
			x: container.p.x / 2 - container.p.x,
			y: -container.p.y / 3
		}));
		container.insert(new Q.TIME({
			x: container.p.x / 2,
			y: -container.p.y / 3
		}));
		container.insert(new Q.LIVES({
			x: container.p.x / 2 + container.p.x,
			y: -container.p.y / 3
		}));

	});

	//Escenario que se muestra cuando todavía le quedan vidas
	Q.scene('livesLeft', function (stage) {
		var life = Q.state.p.lives;
		Q.audio.stop("GreenHillZone.mp3");
		Q.clearStages();
		Q.state.reset({ score: 0, lives: life, time: 0 });
		Q.stageScene('level1');
		Q.stageScene("hud", 3);

	});

	/////////////////////////////////PARTES DEL HUD////////////////////////////////////////////////
	//SCORE
	Q.UI.Text.extend("SCORE", {
		init: function (p) {
			this._super(p, {
				label: "SCORE: " + Q.state.get("score"),
				color: "white",
				size: "14"
			});
			/** Necesito extender porque quiero escuchar los cambios de la variable en el "State". */
			Q.state.on("change.score", this, "update_label");
		},

		/**
		* Con esta función actualizo el label.
		*/
		update_label: function (score) {
			this.p.label = "SCORE: " + Q.state.get("score");
		}
	});

	//LIVES
	Q.UI.Text.extend("LIVES", {
		init: function (p) {
			this._super(p, {
				label: "LIVES: " + Q.state.get("lives"),
				color: "white",
				size: "14"
			});
			/** Necesito extender porque quiero escuchar los cambios de la variable en el "State". */
			Q.state.on("change.lives", this, "update_label");
		},

		/**
		* Con esta función actualizo el label.
		*/
		update_label: function (score) {
			this.p.label = "LIVES: " + Q.state.get("lives");
		}
	});


	//TIME
	Q.UI.Text.extend("TIME", {
		init: function (p) {
			this._super(p, {
				label: "TIME: " + Q.state.get("time"),
				color: "white",
				size: "14"
			});
			/** Necesito extender porque quiero escuchar los cambios de la variable en el "State". */
			Q.state.on("change.time", this, "update_label");
		},

		/**
		* Con esta función actualizo el label.
		*/
		update_label: function (score) {
			this.p.label = "TIME: " + Q.state.get("time");
		}
	});
}