/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.testCollisionRectRect = (rect1, rect2) => {
    return rect1.position.x <= rect2.position.x + rect2.size.width
        && rect2.position.x <= rect1.position.x + rect1.size.width
        && rect1.position.y <= rect2.position.y + rect2.size.height
        && rect2.position.y <= rect1.position.y + rect1.size.height;
};
exports.calculateAngleBetweenEntities = (main, other) => {
    let x = main.position.x - other.position.x;
    let y = main.position.y - other.position.y;
    let angle = Math.atan2(y, x) / Math.PI * 180;
    angle = angle - 180;
    angle = (angle < 0) ? (angle + 360) : angle;
    return angle;
};
class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    changePosition(x, y) {
        this.x += x;
        this.y += y;
    }
    getDistance(point) {
        let dx = this.x - point.x;
        let dy = this.y - point.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
exports.Point = Point;
class Size {
    constructor(width = 0, height = 0) {
        this.width = width;
        this.height = height;
    }
}
exports.Size = Size;
class Rectangle {
    constructor(position, size) {
        this.position = position;
        this.size = size;
    }
}
exports.Rectangle = Rectangle;
class Velocity {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.getSpeed = () => { return Math.sqrt(this.x * this.x + this.y * this.y); };
    }
}
exports.Velocity = Velocity;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var WeaponType;
(function (WeaponType) {
    WeaponType[WeaponType["knife"] = 0] = "knife";
    WeaponType[WeaponType["pistol"] = 1] = "pistol";
    WeaponType[WeaponType["shotgun"] = 2] = "shotgun";
    WeaponType[WeaponType["rifle"] = 3] = "rifle";
    WeaponType[WeaponType["claws"] = 20] = "claws";
})(WeaponType = exports.WeaponType || (exports.WeaponType = {}));
;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const Pack_1 = __webpack_require__(15);
exports.initPack = new Pack_1.Pack();
exports.removePack = new Pack_1.Pack();


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const PlayerClient_1 = __webpack_require__(7);
const BulletClient_1 = __webpack_require__(14);
const Inventory_1 = __webpack_require__(8);
exports.selfId = 0;
exports.inventory = new Inventory_1.Inventory(socket, false, 0);
socket.on('updateInventory', function (items) {
    exports.inventory.items = items;
    exports.inventory.refreshRender();
});
socket.on('init', function (data) {
    if (data.selfId) {
        exports.selfId = data.selfId;
    }
    for (let i = 0, length = data.player.length; i < length; i++) {
        new PlayerClient_1.PlayerClient(data.player[i]);
    }
    for (let i = 0, length = data.bullet.length; i < length; i++) {
        new BulletClient_1.BulletClient(data.bullet[i]);
    }
});
socket.on('update', function (data) {
    for (let i = 0, length = data.player.length; i < length; i++) {
        let pack = data.player[i];
        let p = PlayerClient_1.PlayerClient.list[pack.id];
        if (p) {
            if (pack.position !== undefined) {
                p.position.x = pack.position.x;
                p.position.y = pack.position.y;
            }
            if (pack.hp !== undefined) {
                p.hp = pack.hp;
            }
            if (pack.weapon !== undefined) {
                p.weapon = pack.weapon;
                p.img = Img["player" + pack.weapon];
                p.imgMeleeAttack = Img["player" + pack.weapon + "meeleattack"];
            }
            if (pack.attackMelee !== undefined) {
                p.attackMelee = pack.attackMelee;
            }
            if (pack.moving !== undefined) {
                p.moving = pack.moving;
            }
            if (pack.aimAngle !== undefined) {
                p.aimAngle = pack.aimAngle;
            }
            if (pack.ammo !== undefined) {
                p.ammo = pack.ammo;
            }
            if (pack.reload !== undefined) {
                if (pack.reload) {
                    p.reload = true;
                }
                else {
                    p.reload = false;
                }
            }
            if (pack.attackStarted !== undefined) {
                if (pack.attackStarted) {
                    p.attackStarted = true;
                    p.spriteAnimCounter = 0;
                }
            }
            gui.draw();
        }
        for (let i = 0, length = data.bullet.length; i < length; i++) {
            let pack = data.bullet[i];
            let b = BulletClient_1.BulletClient.list[pack.id];
            if (b) {
                if (pack.position !== undefined) {
                    b.position.x = pack.position.x;
                    b.position.y = pack.position.y;
                }
            }
        }
    }
});
socket.on('remove', function (data) {
    for (let i = 0, length = data.player.length; i < length; i++) {
        delete PlayerClient_1.PlayerClient.list[data.player[i]];
    }
    for (let i = 0, length = data.bullet.length; i < length; i++) {
        if (BulletClient_1.BulletClient.list[data.bullet[i].id]) {
            BulletClient_1.BulletClient.list[data.bullet[i].id].hit(data.bullet[i].hitCategory, data.bullet[i].hitEntityCategory, data.bullet[i].hitEntityId);
        }
        delete BulletClient_1.BulletClient.list[data.bullet[i].id];
    }
});
setInterval(function () {
    if (!exports.selfId) {
        return;
    }
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (let i in PlayerClient_1.PlayerClient.list) {
        if (PlayerClient_1.PlayerClient.list[i].moving) {
            PlayerClient_1.PlayerClient.list[i].walkSpriteAnimCounter += 1;
        }
        if (PlayerClient_1.PlayerClient.list[i].attackStarted) {
            if (PlayerClient_1.PlayerClient.list[i].reload) {
                if (PlayerClient_1.PlayerClient.list[i].weapon == "pistol")
                    PlayerClient_1.PlayerClient.list[i].bodySpriteAnimCounter += 1;
                else
                    PlayerClient_1.PlayerClient.list[i].bodySpriteAnimCounter += 0.5;
            }
            else
                PlayerClient_1.PlayerClient.list[i].bodySpriteAnimCounter += 1;
        }
        PlayerClient_1.PlayerClient.list[i].draw();
    }
    for (let i in BulletClient_1.BulletClient.list) {
        BulletClient_1.BulletClient.list[i].draw();
    }
}, 40);
document.onkeydown = function (event) {
    if (event.keyCode === 68)
        socket.emit('keyPress', { inputId: 'right', state: true });
    else if (event.keyCode === 83)
        socket.emit('keyPress', { inputId: 'down', state: true });
    else if (event.keyCode === 65)
        socket.emit('keyPress', { inputId: 'left', state: true });
    else if (event.keyCode === 87)
        socket.emit('keyPress', { inputId: 'up', state: true });
    else if (event.keyCode === 69)
        socket.emit('keyPress', { inputId: 'heal', state: true });
    else if (event.keyCode === 49)
        socket.emit('keyPress', { inputId: '1', state: true });
    else if (event.keyCode === 50)
        socket.emit('keyPress', { inputId: '2', state: true });
    else if (event.keyCode === 51)
        socket.emit('keyPress', { inputId: '3', state: true });
    else if (event.keyCode === 52)
        socket.emit('keyPress', { inputId: '4', state: true });
    else if (event.keyCode === 32) {
        socket.emit('keyPress', { inputId: 'space', state: true });
        return false;
    }
};
document.onkeyup = function (event) {
    if (event.keyCode === 68)
        socket.emit('keyPress', { inputId: 'right', state: false });
    else if (event.keyCode === 83)
        socket.emit('keyPress', { inputId: 'down', state: false });
    else if (event.keyCode === 65)
        socket.emit('keyPress', { inputId: 'left', state: false });
    else if (event.keyCode === 87)
        socket.emit('keyPress', { inputId: 'up', state: false });
};
document.onmousedown = function (event) {
    socket.emit('keyPress', { inputId: 'attack', state: true });
};
document.onmouseup = function (event) {
    socket.emit('keyPress', { inputId: 'attack', state: false });
};
document.onmousemove = function (event) {
    let x = -WIDTH / 2 + event.clientX - 8 - (WIDTH / 2 - event.clientX) / CAMERA_BOX_ADJUSTMENT;
    let y = -HEIGHT / 2 + event.clientY - 8 - (HEIGHT / 2 - event.clientY) / CAMERA_BOX_ADJUSTMENT;
    mouseX = event.clientX;
    mouseY = event.clientY;
    let angle = Math.atan2(y, x) / Math.PI * 180;
    if (exports.selfId) {
        let player = PlayerClient_1.PlayerClient.list[exports.selfId];
        player.aimAngle = angle;
    }
    socket.emit('keyPress', { inputId: 'mouseAngle', state: angle });
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const globalVariables_1 = __webpack_require__(2);
const Enemy_1 = __webpack_require__(5);
const Bullet_1 = __webpack_require__(13);
const Actor_1 = __webpack_require__(9);
const GeometryAndPhysics_1 = __webpack_require__(0);
const enums_1 = __webpack_require__(1);
class Player extends Actor_1.Actor {
    constructor(param) {
        super(param);
        this.getInitPack = () => {
            return {
                id: this.id,
                position: this.position,
                hp: 12,
                hpMax: this.lifeAndBodyController.hpMax,
                map: this.map,
                width: this.width,
                height: this.height,
                moving: this.movementController.moving,
                aimAngle: this.movementController.aimAngle,
                weapon: this.attackController.activeWeapon.name,
                attackStarted: this.attackController.attackStarted,
                attackMelee: this.attackController.melee,
                ammo: this.attackController.activeWeapon.ammo,
                ammoInGun: this.attackController.activeWeapon.ammoInGun
            };
        };
        this.getUpdatePack = () => {
            let attackStartedTmp = this.attackController.attackStarted;
            this.attackController.attackStarted = false;
            return {
                id: this.id,
                position: this.position,
                hp: this.lifeAndBodyController.hp,
                moving: this.movementController.moving,
                aimAngle: this.movementController.aimAngle,
                attackStarted: attackStartedTmp,
                weapon: this.attackController.activeWeapon.name,
                attackMelee: this.attackController.melee,
                ammo: this.attackController.activeWeapon.ammo,
                ammoInGun: this.attackController.activeWeapon.ammoInGun,
                reload: this.attackController.reloadCounter.isActive()
            };
        };
        this.onDeath = () => {
            this.lifeAndBodyController.reset();
            let map = this.mapController.getMap(this.map);
            let x = Math.random() * map.width;
            let y = Math.random() * map.height;
            let position = new GeometryAndPhysics_1.Point(x, y);
            while (map.isPositionWall(position)) {
                x = Math.random() * map.width;
                y = Math.random() * map.height;
                position.changePosition(x, y);
            }
            this.setPosition(position);
        };
        globalVariables_1.initPack.player.push(this.getInitPack());
        Player.list[param.id] = this;
        this.inventory.addItem(enums_1.WeaponType.knife, 1);
        this.inventory.addItem(enums_1.WeaponType.pistol, 1);
        this.inventory.addItem(enums_1.WeaponType.shotgun, 1);
        this.inventory.addItem(enums_1.WeaponType.rifle, 1);
        this.inventory.addItem("medicalkit", 4);
        this.inventory.useItem(enums_1.WeaponType.knife);
    }
}
Player.onConnect = (socket) => {
    let map = 'forest';
    let player = new Player({
        id: socket.id,
        maxSpdX: 12,
        maxSpdY: 12,
        map: map,
        img: 'player',
        atkSpd: 7,
        width: 50,
        height: 50,
        type: "player",
        hp: 40,
        socket: socket
    });
    socket.on('changeWeapon', function (data) {
        if (data.state == 'next') {
            player.attackController.weaponCollection.chooseNextWeaponWithAmmo();
        }
        if (data.state == 'prev') {
            player.attackController.weaponCollection.choosePrevWeaponWithAmmo();
        }
    });
    socket.on('keyPress', function (data) {
        if (data.inputId == 'left')
            player.movementController.pressingLeft = data.state;
        if (data.inputId == 'right')
            player.movementController.pressingRight = data.state;
        if (data.inputId == 'up')
            player.movementController.pressingUp = data.state;
        if (data.inputId == 'down')
            player.movementController.pressingDown = data.state;
        if (data.inputId == 'attack')
            player.attackController.pressingAttack = data.state;
        if (data.inputId == 'mouseAngle')
            player.movementController.aimAngle = data.state;
    });
    socket.emit('init', { player: Player.getAllInitPack(), bullet: Bullet_1.Bullet.getAllInitPack(), enemy: Enemy_1.Enemy.getAllInitPack(), selfId: socket.id });
};
Player.getAllInitPack = () => {
    let players = [];
    for (let i in Player.list) {
        players.push(Player.list[i].getInitPack());
    }
    return players;
};
Player.onDisconnect = (socket) => {
    delete Player.list[socket.id];
    globalVariables_1.removePack.player.push(socket.id);
};
Player.update = () => {
    let pack = [];
    for (let i in Player.list) {
        let player = Player.list[i];
        player.update();
        pack.push(player.getUpdatePack());
    }
    return pack;
};
Player.list = {};
exports.Player = Player;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const MapControler_1 = __webpack_require__(6);
const Actor_1 = __webpack_require__(9);
const GeometryAndPhysics_1 = __webpack_require__(0);
const globalVariables_1 = __webpack_require__(2);
class Enemy extends Actor_1.Actor {
    constructor(param) {
        super(param);
        this.toRemove = false;
        this.kind = "";
        this.update = () => {
            super.update();
            let player = this.getClosestPlayer();
            let diffX = 0;
            let diffY = 0;
            if (player) {
                diffX = player.position.x - this.position.x;
                diffY = player.position.y - this.position.y;
            }
            this.updateAim(player, diffX, diffY);
            this.updateKeyPress(player, diffX, diffY);
            this.updateAttack(player, diffX, diffY);
        };
        this.updateAim = (player, diffX, diffY) => {
            this.movementController.aimAngle = Math.atan2(diffY, diffX) / Math.PI * 180;
        };
        this.updateKeyPress = (player, diffX, diffY) => {
            let safeDistance = 20;
            safeDistance = (this.attackController.melee) ? 30 : 100;
            this.movementController.pressingRight = diffX > safeDistance;
            this.movementController.pressingLeft = diffX < -safeDistance;
            this.movementController.pressingDown = diffY > safeDistance;
            this.movementController.pressingUp = diffY < -safeDistance;
        };
        this.updateAttack = (player, diffX, diffY) => {
            if (this.attackController.melee) {
                if (Math.sqrt(diffX * diffX + diffY * diffY) < 50)
                    this.attackController.performAttack();
            }
            else {
                if (Math.sqrt(diffX * diffX + diffY * diffY) < 500)
                    this.attackController.performAttack();
            }
        };
        this.onDeath = () => {
            this.toRemove = true;
        };
        this.getInitPack = () => {
            return {
                id: this.id,
                position: this.position,
                hp: this.lifeAndBodyController.hp,
                hpMax: this.lifeAndBodyController.hpMax,
                map: this.map,
                img: this.img,
                width: this.width,
                height: this.height,
                moving: this.movementController.moving,
                aimAngle: this.movementController.aimAngle,
                kind: this.kind,
                attackStarted: this.attackController.attackStarted,
                weapon: this.attackController.activeWeapon.weapon,
                attackMeele: this.attackController.melee,
                reload: this.attackController.reloadCounter.isActive()
            };
        };
        this.getUpdatePack = () => {
            let attackStartedTmp = this.attackController.attackStarted;
            this.attackController.attackStarted = false;
            return {
                id: this.id,
                position: this.position,
                hp: this.lifeAndBodyController.hp,
                moving: this.movementController.moving,
                aimAngle: this.movementController.aimAngle,
                attackStarted: attackStartedTmp,
                weapon: this.attackController.activeWeapon.weapon,
                attackMeele: this.attackController.melee,
                reload: this.attackController.reloadCounter.isActive()
            };
        };
        Enemy.list[param.id] = this;
        globalVariables_1.initPack.enemy.push(this.getInitPack());
        if (param.kind)
            this.kind = param.kind;
        this.attackController.pressingAttack = true;
    }
}
Enemy.globalMapControler = new MapControler_1.MapController(null);
Enemy.update = () => {
    let pack = [];
    for (let i in Enemy.list) {
        let enemy = Enemy.list[i];
        enemy.update();
        if (enemy.toRemove) {
            delete Enemy.list[i];
            Enemy.randomlyGenerate('forest');
            globalVariables_1.removePack.enemy.push(enemy.id);
        }
        else {
            pack.push(enemy.getUpdatePack());
        }
    }
    return pack;
};
Enemy.getAllInitPack = function () {
    let enemies = [];
    for (let i in Enemy.list) {
        enemies.push(Enemy.list[i].getInitPack());
    }
    return enemies;
};
Enemy.randomlyGenerate = function (choosenMap) {
    let map = Enemy.globalMapControler.getMap(choosenMap);
    let x = Math.random() * map.width;
    let y = Math.random() * map.height;
    let position = new GeometryAndPhysics_1.Point(x, y);
    while (map.isPositionWall(position)) {
        x = Math.random() * map.width;
        y = Math.random() * map.height;
        position.changePosition(x, y);
    }
    let difficulty = 1 + Math.round(Math.random() * 2) * 0.5;
    let height = 48 * difficulty;
    let width = 48 * difficulty;
    let id = Math.random();
    let enemy;
    if (Math.random() < 0.5) {
        enemy = new Enemy({
            id: id,
            position: position,
            width: width,
            height: height,
            hp: 15 * difficulty,
            atkSpd: 0.8 * difficulty,
            map: choosenMap,
            img: 'scorpion',
            type: 'enemy',
            kind: 'scorpion'
        });
    }
    else {
        enemy = new Enemy({
            id: id,
            position: position,
            width: width,
            height: height,
            hp: 5 * difficulty,
            atkSpd: 0.4 * difficulty,
            map: choosenMap,
            img: 'zombie',
            type: 'enemy',
            kind: 'zombie',
            maxSpd: 11
        });
    }
};
Enemy.list = {};
exports.Enemy = Enemy;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const GameMap_1 = __webpack_require__(16);
class MapController {
    constructor(param) {
        this.maps = [];
        this.getMap = (map) => {
            for (let i = 0; i < this.maps.length; i++) {
                if (map == this.maps[i].name) {
                    return this.maps[i];
                }
            }
        };
        this.maps.push(new GameMap_1.GameMap("forest", 1000, 1000));
    }
}
exports.MapController = MapController;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const GeometryAndPhysics_1 = __webpack_require__(0);
const game_1 = __webpack_require__(3);
class PlayerClient {
    constructor(initPack) {
        this.id = -1;
        this.position = new GeometryAndPhysics_1.Point(250, 250);
        this.width = 0;
        this.height = 0;
        this.img = Img["player" + "pistol"];
        this.imgMeleeAttack = Img["playerknifemeeleattack"];
        this.hp = 1;
        this.hpMax = 1;
        this.map = "forest";
        this.aimAngle = 0;
        this.attackStarted = false;
        this.attackMelee = false;
        this.bodySpriteAnimCounter = 0;
        this.walkSpriteAnimCounter = 0;
        this.moving = false;
        this.reload = false;
        this.weapon = "pistol";
        this.ammo = 0;
        this.ammoInGun = 0;
        this.draw = () => {
            if (PlayerClient.list[game_1.selfId].map !== this.map) {
                return;
            }
            let spriteRows = 1;
            let spriteColumns = 20;
            let hpWidth = 30 * this.hp / this.hpMax;
            let mainPlayer = PlayerClient.list[game_1.selfId];
            let mainPlayerx = mainPlayer.position.x;
            let mainPlayery = mainPlayer.position.y;
            let px = this.position.x;
            let py = this.position.y;
            console.log("Player position: " + px + " " + py);
            let x = px - (mainPlayerx - WIDTH / 2);
            x = x - (mouseX - WIDTH / 2) / CAMERA_BOX_ADJUSTMENT;
            let y = py - (mainPlayery - HEIGHT / 2);
            y = y - (mouseY - HEIGHT / 2) / CAMERA_BOX_ADJUSTMENT;
            let aimAngle = this.aimAngle;
            aimAngle = (aimAngle < 0) ? (360 + aimAngle) : aimAngle;
            let directionMod = this.inWhichDirection(aimAngle);
            let walkingMod = Math.floor(this.walkSpriteAnimCounter) % spriteColumns;
            console.log("Walking mod " + walkingMod);
            this.drawWalk(spriteColumns, spriteRows, aimAngle, 0, walkingMod, x, y);
            if (this.attackStarted && this.attackMelee) {
                spriteColumns = 15;
                walkingMod = Math.floor(this.bodySpriteAnimCounter) % spriteColumns;
                this.drawMeleeAttackBody(spriteColumns, spriteRows, aimAngle, 0, walkingMod, x, y);
            }
            else {
                if (this.reload) {
                    walkingMod = Math.floor(this.bodySpriteAnimCounter) % spriteColumns;
                    this.drawNormalBodyWithGun(spriteColumns, spriteRows, aimAngle, 0, walkingMod, x, y);
                }
                else {
                    this.drawNormalBodyWithGun(spriteColumns, spriteRows, aimAngle, 0, walkingMod, x, y);
                }
            }
            ctx.fillStyle = 'red';
            ctx.fillRect(x - hpWidth / 2, y - 40, hpWidth, 4);
        };
        this.inWhichDirection = (aimAngle) => {
            let directionMod = 3;
            if (aimAngle >= 45 && aimAngle < 135) {
                directionMod = 2;
            }
            else if (aimAngle >= 135 && aimAngle < 225) {
                directionMod = 1;
            }
            else if (aimAngle >= 225 && aimAngle < 315) {
                directionMod = 0;
            }
            return directionMod;
        };
        this.drawMeleeAttackBody = (spriteColumns, spriteRows, aimAngle, directionMod, walkingMod, x, y) => {
            let correction = 1.3;
            let correctionWidth = 1;
            let correctionHeight = 1;
            if (this.weapon == "pistol") {
                correction = 1.1;
            }
            if (this.weapon == "shotgun") {
                correction = 1.4;
            }
            let frameWidth = this.imgMeleeAttack.width / spriteColumns;
            let frameHeight = this.imgMeleeAttack.height / spriteRows;
            ctx.save();
            ctx.translate(x - (this.width * correctionWidth) * correction / 2, y - this.height * correction / 2);
            ctx.translate((this.width) * correction / 2, this.height * correction / 2);
            ctx.rotate(aimAngle * Math.PI / 180);
            ctx.drawImage(this.imgMeleeAttack, walkingMod * frameWidth, directionMod * frameHeight, frameWidth, frameHeight, -this.width * correction / 2, -this.height * correction / 2, (this.width) * correction, this.height * correction);
            ctx.restore();
            if (this.bodySpriteAnimCounter % spriteColumns >= (spriteColumns - 1)) {
                this.bodySpriteAnimCounter = 0;
                this.attackStarted = false;
            }
        };
        this.drawNormalBodyWithGun = (spriteColumns, spriteRows, aimAngle, directionMod, walkingMod, x, y) => {
            let frameWidth = this.img.width / spriteColumns;
            let frameHeight = this.img.height / spriteRows;
            ctx.save();
            ctx.translate(x - this.width / 2, y - this.height / 2);
            ctx.translate(this.width / 2, this.height / 2);
            ctx.rotate(aimAngle * Math.PI / 180);
            ctx.drawImage(this.img, walkingMod * frameWidth, directionMod * frameHeight, frameWidth, frameHeight, -this.width / 2, -this.height / 2, this.width, this.height);
            ctx.restore();
        };
        this.drawWalk = (spriteColumns, spriteRows, aimAngle, directionMod, walkingMod, x, y) => {
            let frameWidth = Img["walk"].width / spriteColumns;
            let frameHeight = Img["walk"].height / spriteRows;
            ctx.save();
            ctx.translate(x - this.width / 4, y - this.height / 4);
            ctx.translate(this.width / 4, this.height / 4);
            ctx.rotate(aimAngle * Math.PI / 180);
            ctx.drawImage(Img["walk"], walkingMod * frameWidth, directionMod * frameHeight, frameWidth, frameHeight, -this.width / 4, -this.height / 4, this.width / 2, this.height / 2);
            ctx.restore();
        };
        if (initPack.id)
            this.id = initPack.id;
        if (initPack.position)
            this.position = initPack.position;
        if (initPack.width)
            this.width = initPack.width;
        if (initPack.height)
            this.height = initPack.height;
        if (initPack.weapon) {
            this.img = Img["player" + initPack.weapon];
            this.weapon = initPack.weapon;
            this.imgMeleeAttack = Img["player" + initPack.weapon + "meeleattack"];
        }
        if (initPack.hp)
            this.hp = initPack.hp;
        if (initPack.hpMax)
            this.hpMax = initPack.hpMax;
        if (initPack.aimAngle)
            this.aimAngle = initPack.aimAngle;
        if (initPack.moving)
            this.moving = initPack.moving;
        if (initPack.attackStarted)
            this.attackStarted = initPack.attackStarted;
        if (initPack.attackMelee)
            this.attackMelee = initPack.attackMelee;
        if (initPack.ammo)
            this.ammo = initPack.ammo;
        if (initPack.ammoInGun)
            this.ammoInGun = initPack.ammoInGun;
        PlayerClient.list[initPack.id] = this;
    }
}
PlayerClient.list = {};
exports.PlayerClient = PlayerClient;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = __webpack_require__(4);
const Item_1 = __webpack_require__(21);
class Inventory {
    constructor(socket, server, owner) {
        this.items = [];
        this.socket = 0;
        this.server = false;
        this.addItem = (id, amount) => {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].id === id) {
                    this.items[i].amount += amount;
                    Item_1.Item.list[id].add(this.owner, amount);
                    this.refreshRender();
                    return;
                }
            }
            this.items.push({ id: id, amount: amount });
            Item_1.Item.list[id].add(this.owner, amount);
            this.refreshRender();
        };
        this.removeItem = (id, amount) => {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].id === id) {
                    this.items[i].amount -= amount;
                    Item_1.Item.list[id].remove(this.owner, amount);
                    if (this.items[i].amount <= 0)
                        this.items.splice(i, 1);
                    this.refreshRender();
                    return;
                }
            }
        };
        this.hasItem = (id, amount) => {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].id === id) {
                    return this.items[i].amount >= amount;
                }
            }
            return false;
        };
        this.useItem = (id) => {
            if (this.hasItem(id, 1)) {
                Item_1.Item.list[id].event(this.owner);
            }
        };
        this.getItemAmount = (id) => {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].id === id) {
                    return this.items[i].amount;
                }
            }
            return 0;
        };
        this.refreshRender = () => {
            if (this.server) {
                if (!this.socket) {
                    return;
                }
                this.socket.emit('updateInventory', this.items);
                return;
            }
            let inventory = document.getElementById("inventory");
            inventory.innerHTML = "";
            let addButton = function (data, socket) {
                let item = Item_1.Item.list[data.id];
                let button = document.createElement('button');
                button.onclick = function () {
                    socket.emit("useItem", item.id);
                };
                button.innerText = item.name + " x" + data.amount;
                inventory.appendChild(button);
            };
            for (let i = 0; i < this.items.length; i++) {
                let item = Item_1.Item.list[this.items[i].id];
                addButton(this.items[i], this.socket);
            }
        };
        this.socket = socket ? socket : 0;
        this.server = server ? server : false;
        this.owner = owner ? owner : 0;
        if (this.server && this.socket) {
            let currentInventory = this;
            this.socket.on("useItem", function (itemId) {
                if (!currentInventory.hasItem(itemId, 1)) {
                    console.log("Cheater!");
                    return;
                }
                let item = Item_1.Item.list[itemId];
                item.event(Player_1.Player.list[currentInventory.socket.id]);
            });
        }
    }
}
exports.Inventory = Inventory;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const Inventory_1 = __webpack_require__(8);
const LifeAndBodyController_1 = __webpack_require__(17);
const MapControler_1 = __webpack_require__(6);
const Entity_1 = __webpack_require__(10);
const Player_1 = __webpack_require__(4);
const Enemy_1 = __webpack_require__(5);
const AttackControler_1 = __webpack_require__(18);
const MovementController_1 = __webpack_require__(20);
const GeometryAndPhysics_1 = __webpack_require__(0);
class Actor extends Entity_1.Entity {
    constructor(param) {
        super(param);
        this.update = () => {
            this.movementController.updateSpd();
            this.attackController.update();
            this.updatePosition();
        };
        this.getClosestPlayer = () => {
            let distance = 10000;
            let index = "0";
            for (let i in Player_1.Player.list) {
                if (distance > this.getDistance(Player_1.Player.list[i])) {
                    distance = this.getDistance(Player_1.Player.list[i]);
                    index = i;
                }
            }
            return Player_1.Player.list[index];
        };
        this.getClosestEnemy = (distance, angleLimit) => {
            let closestEnemyIndex = "0";
            let closestEnemyDistance = 100000;
            let pangle = this.movementController.aimAngle;
            pangle = (pangle < 0) ? pangle + 360 : pangle;
            for (let i in Enemy_1.Enemy.list) {
                let enemy = Enemy_1.Enemy.list[i];
                let angle = GeometryAndPhysics_1.calculateAngleBetweenEntities(this, enemy);
                let maxDistance = Math.sqrt(enemy.width * enemy.width / 4 + enemy.height * enemy.height / 4) + distance;
                let distanceFromEnemy = this.getDistance(enemy);
                if (distanceFromEnemy < maxDistance) {
                    if ((angle < (pangle + angleLimit)) && (angle > pangle - angleLimit)) {
                        if (closestEnemyDistance > distanceFromEnemy) {
                            closestEnemyDistance = distanceFromEnemy;
                            closestEnemyIndex = i;
                        }
                    }
                }
            }
            return Enemy_1.Enemy.list[closestEnemyIndex];
        };
        this.onDeath = () => { };
        this.lifeAndBodyController = new LifeAndBodyController_1.LifeAndBodyController(this, param);
        this.attackController = new AttackControler_1.AttackController(this, param);
        this.movementController = new MovementController_1.MovementController(this, param);
        this.mapController = new MapControler_1.MapController(param);
        this.inventory = new Inventory_1.Inventory(param.socket, true, this);
    }
}
exports.Actor = Actor;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const GeometryAndPhysics_1 = __webpack_require__(0);
const globalVariables_1 = __webpack_require__(2);
class Entity {
    constructor(param) {
        this._position = new GeometryAndPhysics_1.Point(250, 250);
        this._width = 32;
        this._height = 32;
        this._speed = new GeometryAndPhysics_1.Velocity(0, 0);
        this._id = Math.random();
        this._map = "forest";
        this._type = "entity";
        this._img = "";
        this.updatePosition = () => this._position.changePosition(this._speed.x, this._speed.y);
        this.update = () => this.updatePosition();
        this.getDistance = (entity) => { return this._position.getDistance(entity.position); };
        this.testCollision = (entity) => {
            let pos1 = new GeometryAndPhysics_1.Point(this._position.x + (this._width / 2), this._position.y + (this._height / 2));
            let pos2 = new GeometryAndPhysics_1.Point(entity._position.x + (entity._width / 2), entity._position.y + (entity._height / 2));
            let rect1 = new GeometryAndPhysics_1.Rectangle(pos1, new GeometryAndPhysics_1.Size(this._width / 2, this._height / 2));
            let rect2 = new GeometryAndPhysics_1.Rectangle(pos2, new GeometryAndPhysics_1.Size(entity._width / 2, entity._height / 2));
            return GeometryAndPhysics_1.testCollisionRectRect(rect1, rect2);
        };
        this.setSpdX = (speedX) => { this._speed.x = speedX; };
        this.setSpdY = (speedY) => { this._speed.y = speedY; };
        if (param) {
            this._position = param.position ? param.position : this._position;
            this._width = param.width ? param.width : this._width;
            this._height = param.height ? param.height : this._height;
            this._speed = param.speed ? param.speed : this._speed;
            this._id = param.id ? param.id : this._id;
            this._map = param.map ? param.map : this._map;
            this._type = param.type ? param.type : this._type;
            this._img = param.img ? param.img : this._img;
        }
    }
    get type() { return this._type; }
    get position() { return this._position; }
    get width() { return this._width; }
    get height() { return this._height; }
    get map() { return this._map; }
    get speed() { return this._speed; }
    get id() { return this._id; }
    get img() { return this._img; }
    setPosition(position) {
        this._position.x = position.x;
        this._position.y = position.y;
    }
}
Entity.getFrameUpdateData = () => { return { removePack: globalVariables_1.removePack, initPack: globalVariables_1.initPack }; };
exports.Entity = Entity;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = __webpack_require__(1);
class WeaponTypes {
    constructor(param) {
        this.name = "";
        this.meleeDmg = 0;
        this.shootDmg = 0;
        this.shootSpeed = 0;
        this.attackRadius = 0;
        this.attackSpd = 30;
        this.attackMelee = true;
        this.reloadSpd = 30;
        this.maxSpd = 8;
        this.reloadAmmo = 0;
        this._weapon = (param.weapon !== undefined) ? param.weapon : enums_1.WeaponType.knife;
        this.attackRadius = (param.attackRadius !== undefined) ? param.attackRadius : 0;
        this.attackSpd = (param.attackSpd !== undefined) ? param.attackSpd : 0;
        this.attackMelee = (param.attackMelee !== undefined) ? param.attackMelee : true;
        this.shootDmg = (param.shootDmg !== undefined) ? param.shootDmg : 0;
        this.meleeDmg = (param.meleeDmg !== undefined) ? param.meleeDmg : 0;
        this.maxSpd = (param.maxSpd !== undefined) ? param.maxSpd : 8;
        this.shootSpeed = (param.shootSpeed !== undefined) ? param.shootSpeed : 0;
        this.reloadAmmo = (param.reloadAmmo !== undefined) ? param.reloadAmmo : 0;
        this.reloadSpd = (param.reloadSpd !== undefined) ? param.reloadSpd : 0;
        this.name = (param.name !== undefined) ? param.name : "knife";
        WeaponTypes.list[param.weapon] = this;
    }
    get weapon() { return this._weapon; }
}
WeaponTypes.getWeaponParameters = (weapon) => {
    for (let i in WeaponTypes.list) {
        let weaponFromBank = WeaponTypes.list[i];
        if (weaponFromBank.weapon == weapon) {
            return weaponFromBank;
        }
        else {
            return WeaponTypes.list[0];
        }
    }
};
WeaponTypes.list = {};
exports.WeaponTypes = WeaponTypes;
new WeaponTypes({ weapon: enums_1.WeaponType.pistol, name: "pistol",
    attackRadius: 0,
    attackSpd: 4,
    attackMelee: false,
    shootDmg: 2,
    meleeDmg: 2,
    maxSpd: 10,
    shootSpeed: 20,
    reloadAmmo: 6,
    reloadSpd: 5,
    recoil: false
});
new WeaponTypes({ weapon: enums_1.WeaponType.shotgun, name: "shotgun",
    attackRadius: 3,
    attackSpd: 2,
    attackMelee: false,
    shootDmg: 3,
    meleeDmg: 4,
    maxSpd: 8,
    shootSpeed: 15,
    reloadAmmo: 2,
    reloadSpd: 2,
    recoil: false
});
new WeaponTypes({ weapon: enums_1.WeaponType.knife, name: "knife",
    attackRadius: 0,
    attackSpd: 3,
    attackMelee: true,
    shootDmg: 0,
    meleeDmg: 8,
    maxSpd: 11,
    reloadAmmo: 0,
    reloadSpd: 0,
    recoil: false
});
new WeaponTypes({ weapon: enums_1.WeaponType.rifle, name: "rifle",
    attackRadius: 0,
    attackSpd: 1,
    attackMelee: false,
    shootDmg: 15,
    meleeDmg: 4,
    maxSpd: 8,
    shootSpeed: 30,
    reloadAmmo: 1,
    reloadSpd: 2,
    recoil: true
});
new WeaponTypes({ weapon: enums_1.WeaponType.claws, name: "claws",
    attackRadius: 0,
    attackSpd: 3,
    attackMelee: true,
    shootDmg: 0,
    meleeDmg: 5,
    reloadAmmo: 0,
    reloadSpd: 0,
    recoil: false
});


/***/ }),
/* 12 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
class Counter {
    constructor(max, inc = 1, _value = 0, active = false) {
        this.max = max;
        this.inc = inc;
        this._value = _value;
        this.active = active;
        this.count = () => this._value += this.inc;
        this.resetIfMax = () => {
            if (this._value >= this.max && this.active) {
                this._value = 0;
                return true;
            }
            else {
                return false;
            }
        };
        this.setInc = (inc) => this.inc = inc;
        this.reset = () => this._value = 0;
        this.activate = () => this.active = true;
        this.deactivate = () => this.active = false;
        this.isActive = () => { return this.active; };
    }
    get value() { return this._value; }
    ;
}
exports.Counter = Counter;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const MapControler_1 = __webpack_require__(6);
const Enemy_1 = __webpack_require__(5);
const Player_1 = __webpack_require__(4);
const Entity_1 = __webpack_require__(10);
const globalVariables_1 = __webpack_require__(2);
class Bullet extends Entity_1.Entity {
    constructor(param) {
        super(Bullet.updateParam(param));
        this.combatType = 'player';
        this.angle = 0;
        this.spdX = 1;
        this.spdY = 1;
        this.timer = 0;
        this.toRemove = false;
        this.hitCategory = 0;
        this.hitEntityCategory = "";
        this.hitEntityId = -1;
        this.update = () => {
            this.updatePosition();
            if (this.timer++ > 100)
                this.toRemove = true;
            switch (this.combatType) {
                case 'player': {
                    let player = Player_1.Player.list[this.parent];
                    for (let key in Enemy_1.Enemy.list) {
                        let enemy = Enemy_1.Enemy.list[key];
                        if (this.testCollision(enemy)) {
                            this.toRemove = true;
                            enemy.lifeAndBodyController.wasHit(player.attackController.getDamage());
                            this.setHitProperties(1, "enemy", enemy.id);
                        }
                    }
                    for (let key in Player_1.Player.list) {
                        if (Player_1.Player.list[key].id !== this.parent) {
                            let enemyPlayer = Player_1.Player.list[key];
                            if (this.testCollision(enemyPlayer)) {
                                this.toRemove = true;
                                enemyPlayer.lifeAndBodyController.wasHit(player.attackController.getDamage());
                                this.setHitProperties(1, "player", enemyPlayer.id);
                            }
                        }
                    }
                    break;
                }
                case 'enemy': {
                    let enemy = Enemy_1.Enemy.list[this.parent];
                    for (let key in Player_1.Player.list) {
                        let player = Player_1.Player.list[key];
                        if (this.testCollision(player)) {
                            this.toRemove = true;
                            this.setHitProperties(1, "player", player.id);
                            (enemy) ? player.lifeAndBodyController.wasHit(enemy.attackController.getDamage()) : player.lifeAndBodyController.wasHit(1);
                        }
                    }
                    break;
                }
            }
            let map = this.mapController.getMap(this.map);
            if (map.isPositionWall(this.position) && map.isPositionWall(this.position) !== 2) {
                this.toRemove = true;
                this.hitCategory = 2;
            }
        };
        this.setHitProperties = (hitCategory, hitEntityCategory, hitEntityId) => {
            this.hitCategory = hitCategory;
            this.hitEntityCategory = hitEntityCategory;
            this.hitEntityId = hitEntityId;
        };
        this.getInitPack = () => {
            return {
                id: this.id,
                position: this.position,
                map: this.map,
                img: this.img,
                width: this.width,
                height: this.height,
                combatType: this.combatType,
                hitCategory: this.hitCategory
            };
        };
        this.getUpdatePack = () => {
            return {
                id: this.id,
                position: this.position,
                hitCategory: this.hitCategory
            };
        };
        this.mapController = new MapControler_1.MapController(null);
        this.combatType = param.combatType ? param.combatType : this.combatType;
        this.angle = param.angle ? param.angle : this.angle;
        if (param.shootspeed !== undefined) {
            this.spdX = param.shootspeed ? Math.cos(this.angle / 180 * Math.PI) * param.shootspeed : Math.cos(this.angle / 180 * Math.PI);
            this.spdY = param.shootspeed ? Math.sin(this.angle / 180 * Math.PI) * param.shootspeed : Math.sin(this.angle / 180 * Math.PI);
        }
        this.setSpdX(this.spdX);
        this.setSpdY(this.spdY);
        this.parent = param.parent ? param.parent : -1;
        globalVariables_1.initPack.bullet.push(this.getInitPack());
        Bullet.list[this.id] = this;
    }
}
Bullet.update = () => {
    let pack = [];
    for (let i in Bullet.list) {
        let bullet = Bullet.list[i];
        bullet.update();
        if (bullet.toRemove) {
            delete Bullet.list[i];
            globalVariables_1.removePack.bullet.push({ id: bullet.id, hitCategory: bullet.hitCategory, hitEntityCategory: bullet.hitEntityCategory, hitEntityId: bullet.hitEntityId });
        }
        else {
            pack.push(bullet.getUpdatePack());
        }
    }
    return pack;
};
Bullet.getAllInitPack = function () {
    let bullets = [];
    for (let i in Bullet.list) {
        bullets.push(Bullet.list[i].getInitPack());
    }
    return bullets;
};
Bullet.updateParam = (param) => {
    param.id = Math.random();
    return param;
};
Bullet.list = {};
exports.Bullet = Bullet;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const GeometryAndPhysics_1 = __webpack_require__(0);
const game_1 = __webpack_require__(3);
const PlayerClient_1 = __webpack_require__(7);
class BulletClient {
    constructor(initPack) {
        this.id = -1;
        this.position = new GeometryAndPhysics_1.Point(250, 250);
        this.map = "forest";
        this.img = Img["bullet"];
        this.width = 32;
        this.height = 32;
        this.hitCategory = 1;
        this.draw = () => {
            if (PlayerClient_1.PlayerClient.list[game_1.selfId].map !== this.map) {
                return;
            }
            let bx = this.position.x;
            let by = this.position.y;
            let mainPlayer = PlayerClient_1.PlayerClient.list[game_1.selfId];
            let mainPlayerx = mainPlayer.position.x;
            let mainPlayery = mainPlayer.position.y;
            let x = bx - (mainPlayerx - WIDTH / 2);
            x = x - (mouseX - WIDTH / 2) / CAMERA_BOX_ADJUSTMENT;
            let y = by - (mainPlayery - HEIGHT / 2);
            y = y - (mouseY - HEIGHT / 2) / CAMERA_BOX_ADJUSTMENT;
            ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, x - this.width / 2, y - this.height / 2, this.width, this.height);
        };
        this.hit = (category, entityCategory, entityId) => {
        };
        this.id = (initPack.id !== undefined) ? initPack.id : -1;
        this.position = (initPack.position !== undefined) ? initPack.position : new GeometryAndPhysics_1.Point(250, 250);
        this.width = (initPack.width !== undefined) ? initPack.width : 32;
        this.height = (initPack.height !== undefined) ? initPack.height : 32;
        this.hitCategory = (initPack.hitCategory !== undefined) ? initPack.hitCategory : 1;
        this.img = (initPack.img !== undefined) ? Img[initPack.img] : Img["bullet"];
        this.map = (initPack.map !== undefined) ? initPack.map : "forest";
        BulletClient.list[this.id] = this;
    }
}
BulletClient.list = {};
exports.BulletClient = BulletClient;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var initPack = { player: [], bullet: [], enemy: [], upgrade: [] };
class Pack {
    constructor() {
        this.player = [];
        this.bullet = [];
        this.enemy = [];
        this.upgrade = [];
    }
}
exports.Pack = Pack;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
class GameMap {
    constructor(_name, _width, _height) {
        this._name = _name;
        this._width = _width;
        this._height = _height;
        this.isPositionWall = (position) => {
            return 0;
        };
    }
    get width() { return this._width; }
    get height() { return this._height; }
    get name() { return this._name; }
}
exports.GameMap = GameMap;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
class LifeAndBodyController {
    constructor(parent, param) {
        this.parent = parent;
        this._hp = 30;
        this._hpMax = 30;
        this.heal = (hp) => {
            this._hp = (this._hp + hp > this._hpMax) ? (this._hpMax) : (this._hp + hp);
        };
        this.wasHit = (damage) => {
            this._hp = this._hp - damage;
            this._hp = (this._hp >= 0) ? this._hp : 0;
            if (this._hp == 0) {
                this.parent.onDeath();
            }
        };
        this.reset = () => {
            this._hp = this._hpMax;
        };
        this._hp = (param.hp) ? param.hp : this._hp;
        this._hpMax = this._hp;
    }
    get hp() { return this._hp; }
    get hpMax() { return this._hpMax; }
}
exports.LifeAndBodyController = LifeAndBodyController;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const WeaponCollection_1 = __webpack_require__(19);
const Counter_1 = __webpack_require__(12);
const GeometryAndPhysics_1 = __webpack_require__(0);
const Bullet_1 = __webpack_require__(13);
const enums_1 = __webpack_require__(1);
const WeaponTypes_1 = __webpack_require__(11);
class AttackController {
    constructor(parent, param) {
        this.parent = parent;
        this._melee = true;
        this._attackStarted = false;
        this._reloadCounter = new Counter_1.Counter(25);
        this._attackCounter = new Counter_1.Counter(25);
        this._weaponCollection = new WeaponCollection_1.WeaponCollection();
        this._pressingAttack = false;
        this.update = () => {
            this._reloadCounter.setInc(this._activeWeapon.reloadSpd);
            this._attackCounter.setInc(this._activeWeapon.attackSpd);
            if (this._reloadCounter.resetIfMax()) {
                this._reloadCounter.deactivate();
                this._activeWeapon.reload();
            }
            this._reloadCounter.count();
            this._attackCounter.count();
            this.performAttack();
        };
        this.performAttack = () => {
            if (!this._reloadCounter.isActive() && this._pressingAttack) {
                if (this._attackCounter.resetIfMax()) {
                    this._attackStarted = true;
                    console.log(this._activeWeapon.ammo);
                    console.log(this._melee);
                    this._melee = (this._activeWeapon.ammo > 0) ? this._melee : true;
                    this._melee ? this.closeAttack(this.parent.movementController.aimAngle) : this.distanceAttack();
                }
            }
        };
        this.closeAttack = (aimAngle) => (this.parent.type == 'player') ? this.attackCloseByPlayer(aimAngle) : this.attackCloseByEnemy(aimAngle);
        this.attackCloseByEnemy = (aimAngle) => {
            let player = this.parent.getClosestPlayer();
            let distance = 80;
            let maxDistance = Math.sqrt(player.width * player.width / 4 + player.height * player.height / 4) + distance;
            if (player) {
                if (this.parent.getDistance(player) < maxDistance) {
                    player.lifeAndBodyController.wasHit(this._activeWeapon.meleeDmg);
                }
            }
        };
        this.attackCloseByPlayer = (aimAngle) => {
            let enemy = this.parent.getClosestEnemy(40, 45);
            if (enemy) {
                enemy.lifeAndBodyController.wasHit(this._activeWeapon.meleeDmg);
            }
        };
        this.distanceAttack = () => {
            console.log("Distance attack:");
            if (this._activeWeapon.shoot(1)) {
                console.log("Shoot");
                let shootSpeed = this._activeWeapon.shootSpeed;
                let aimAngle = this.parent.movementController.aimAngle;
                let attackRadius = this._activeWeapon.attackRadius;
                this.shootBullet(this.parent.movementController.aimAngle, shootSpeed);
                for (let i = 0; i < attackRadius; i++) {
                    this.shootBullet(aimAngle + (i + 1) * 2, shootSpeed);
                    this.shootBullet(aimAngle - (i + 1) * 2, shootSpeed);
                }
            }
        };
        this.equip = (weapon) => {
            this.activeWeapon.equip(weapon);
            let weaponProperties = WeaponTypes_1.WeaponTypes.list[weapon];
            this._melee = weaponProperties.attackMelee;
        };
        this.shootBullet = (aimAngle, shootSpeed) => {
            new Bullet_1.Bullet({
                parent: this.parent.id,
                combatType: this.parent.type,
                angle: aimAngle,
                position: new GeometryAndPhysics_1.Point(this.parent.position.x, this.parent.position.y),
                map: this.parent.map,
                img: 'bullet',
                width: 8,
                height: 8,
                shootspeed: shootSpeed
            });
        };
        this.getDamage = () => {
            let damage = 0;
            damage = (this._melee) ? this._activeWeapon.meleeDmg : this._activeWeapon.shootDmg;
            return damage;
        };
        this._activeWeapon = new WeaponCollection_1.SingleWeapon({ weapon: "0", ammo: "20", parent: this.parent });
        if (param.atkSpd)
            this._attackCounter.setInc(param.atkSpd);
        this.equip(enums_1.WeaponType.knife);
        this.attackCounter.activate();
    }
    get melee() { return this._melee; }
    get pressingAttack() { return this._pressingAttack; }
    get weaponCollection() { return this._weaponCollection; }
    get activeWeapon() { return this._activeWeapon; }
    get reloadCounter() { return this._reloadCounter; }
    get attackCounter() { return this._attackCounter; }
    get attackStarted() { return this._attackStarted; }
    set pressingAttack(value) { this._pressingAttack = value; }
    set attackStarted(value) { this._attackStarted = value; }
}
exports.AttackController = AttackController;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const WeaponTypes_1 = __webpack_require__(11);
const enums_1 = __webpack_require__(1);
class WeaponCollection {
    constructor() {
        this.weapons = [];
        this.shoot = (id, bullets) => {
            return true;
        };
        this.chooseNextWeaponWithAmmo = () => {
        };
        this.choosePrevWeaponWithAmmo = () => {
        };
        this.removeWeapon = (id, amount) => {
        };
        this.addWeapon = (id, amount) => {
            for (var i = 0; i < this.weapons.length; i++) {
                if (this.weapons[i].id === id) {
                    this.weapons[i].amount += amount;
                    return;
                }
            }
            this.weapons.push({ id: id, amount: amount, ammo: 50, reload: WeaponTypes_1.WeaponTypes.list[id].reload });
            console.log("Weapon " + id + " added");
        };
        this.equip = () => {
        };
    }
}
exports.WeaponCollection = WeaponCollection;
class SingleWeapon {
    constructor(param) {
        this.ammoInGun = 30;
        this.name = "";
        this.reload = () => {
        };
        this.shoot = (bullets) => {
            if (bullets <= this._ammo) {
                this._ammo -= bullets;
                console.log("Ammo " + this._ammo);
                return true;
            }
            return false;
        };
        this.equip = (weapon) => {
            for (let i in WeaponTypes_1.WeaponTypes.list) {
                let weaponFromBank = WeaponTypes_1.WeaponTypes.list[i];
                if (weaponFromBank.weapon == weapon) {
                    this._weapon = weapon;
                    this.name = weaponFromBank.name;
                    console.log("Weapon equiped " + this._weapon + this.name);
                    break;
                }
            }
        };
        this._weapon = (param.weapon !== undefined) ? param.weapon : enums_1.WeaponType.knife;
        this._ammo = (param.ammo !== undefined) ? param.ammo : 8;
        this.name = (param.name !== undefined) ? param.name : "knife";
    }
    get ammo() { return this._ammo; }
    get weapon() { return this._weapon; }
    get reloadSpd() { return WeaponTypes_1.WeaponTypes.list[this._weapon].reloadSpd; }
    get attackSpd() { return WeaponTypes_1.WeaponTypes.list[this._weapon].attackSpd; }
    get attackRadius() { return WeaponTypes_1.WeaponTypes.list[this._weapon].attackRadius; }
    get shootSpeed() { return WeaponTypes_1.WeaponTypes.list[this._weapon].shootSpeed; }
    get meleeDmg() { return WeaponTypes_1.WeaponTypes.list[this._weapon].meleeDmg; }
    get shootDmg() { return WeaponTypes_1.WeaponTypes.list[this._weapon].shootDmg; }
}
exports.SingleWeapon = SingleWeapon;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const Counter_1 = __webpack_require__(12);
const GeometryAndPhysics_1 = __webpack_require__(0);
class MovementController {
    constructor(parent, param) {
        this.parent = parent;
        this._pressingDown = false;
        this._pressingUp = false;
        this._pressingLeft = false;
        this._pressingRight = false;
        this._moving = false;
        this._recoilCounter = new Counter_1.Counter(15);
        this.collisionBounds = { Up: -16, Down: 32, Left: -10, Right: 10 };
        this.updateSpd = () => {
            let map = this.parent.mapController.getMap(this.parent.map);
            let x = this.parent.position.x;
            let y = this.parent.position.y;
            let leftBumper = new GeometryAndPhysics_1.Point(x + this.collisionBounds.Left, y);
            let rightBumper = new GeometryAndPhysics_1.Point(x + this.collisionBounds.Right, y);
            let upBumper = new GeometryAndPhysics_1.Point(x, y + this.collisionBounds.Up);
            let downBumper = new GeometryAndPhysics_1.Point(x, y + this.collisionBounds.Down);
            let speedX = 0;
            let speedY = 0;
            if (map.isPositionWall(rightBumper)) {
                speedX = !this._pressingRight ? -this._maxSpdX : speedX;
            }
            else {
                speedX = this._pressingRight ? this._maxSpdX : speedX;
            }
            if (map.isPositionWall(leftBumper)) {
                speedX = !this._pressingLeft ? this._maxSpdX : speedX;
            }
            else {
                speedX = this._pressingLeft ? -this._maxSpdX : speedX;
            }
            if (map.isPositionWall(downBumper)) {
                speedY = !this._pressingDown ? -this._maxSpdY : speedY;
            }
            else {
                speedY = this._pressingDown ? this._maxSpdY : speedY;
            }
            if (map.isPositionWall(upBumper)) {
                speedY = !this._pressingUp ? this._maxSpdY : speedY;
            }
            else {
                speedY = this._pressingUp ? -this._maxSpdY : speedY;
            }
            if (this._recoilCounter.isActive() && !this._recoilCounter.resetIfMax()) {
                if (map.isPositionWall(downBumper) || map.isPositionWall(upBumper) || map.isPositionWall(leftBumper) || map.isPositionWall(rightBumper)) {
                    this._recoilCounter.deactivate();
                    this._recoilCounter.reset();
                }
                else {
                    speedX = Math.cos((this._aimAngle + 180) / 180 * Math.PI) * this._maxSpdX * 1.5 * (15 - this._recoilCounter.value) / 15;
                    speedY = Math.sin((this._aimAngle + 180) / 180 * Math.PI) * this._maxSpdX * 1.5 * (15 - this._recoilCounter.value) / 15;
                }
            }
            else {
                this._recoilCounter.deactivate();
            }
            this.parent.setSpdX(speedX);
            this.parent.setSpdY(speedY);
            this.validatePosition();
        };
        this.validatePosition = () => {
            let map = this.parent.mapController.getMap(this.parent.map);
            this.parent.position.x = (this.parent.position.x < this.parent.width / 2) ? this.parent.width / 2 : this.parent.position.x;
            this.parent.position.x = (this.parent.position.x > map.width - this.parent.width / 2) ? map.width - this.parent.width / 2 : this.parent.position.x;
            this.parent.position.y = (this.parent.position.y < this.parent.height / 2) ? this.parent.height / 2 : this.parent.position.y;
            this.parent.position.y = (this.parent.position.y > map.height - this.parent.height / 2) ? map.height - this.parent.height / 2 : this.parent.position.y;
        };
        this._maxSpdX = param.maxSpdX ? param.maxSpdX : 10;
        this._maxSpdY = param.maxSpdY ? param.maxSpdY : 10;
    }
    get pressingLeft() { return this._pressingLeft; }
    get pressingRight() { return this._pressingRight; }
    get pressingUp() { return this._pressingUp; }
    get pressingDown() { return this._pressingDown; }
    set pressingLeft(value) { this._pressingLeft = value; }
    set pressingRight(value) { this._pressingRight = value; }
    set pressingUp(value) { this._pressingUp = value; }
    set pressingDown(value) { this._pressingDown = value; }
    get aimAngle() { return this._aimAngle; }
    get moving() {
        if (this._pressingLeft || this._pressingRight || this._pressingDown || this.pressingUp) {
            this._moving = true;
        }
        else {
            this._moving = false;
        }
        return this._moving;
    }
    get recoilCounter() { return this._recoilCounter; }
    get maxSpdX() { return this._maxSpdX; }
    get maxSpdY() { return this._maxSpdY; }
    set aimAngle(value) { this._aimAngle = value; }
}
exports.MovementController = MovementController;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = __webpack_require__(1);
class Item {
    constructor(id, name, event, add, remove, info) {
        this.id = id;
        this.name = name;
        this.event = event;
        this.add = add;
        this.remove = remove;
        this.info = info;
        Item.list[this.id] = this;
    }
}
Item.list = {};
exports.Item = Item;
new Item("medicalkit", "Medical Kit", function (player) {
    player.lifeAndBodyController.heal(10);
    player.inventory.removeItem("medicalkit", 1);
}, function (actor, amount) { }, function (actor, amount) { }, function (actor) {
    return "";
});
new Item(enums_1.WeaponType.pistol, "Pistol", function (actor) {
    actor.attackController.equip(enums_1.WeaponType.pistol);
}, function (actor, amount) {
    actor.attackController.weaponCollection.addWeapon(enums_1.WeaponType.pistol, amount);
}, function (actor, amount) {
    actor.attackController.weaponCollection.removeWeapon(enums_1.WeaponType.pistol, amount);
}, function (actor) {
});
new Item(enums_1.WeaponType.knife, "Knife", function (actor) {
    actor.attackController.equip(enums_1.WeaponType.knife);
}, function (actor, amount) {
    actor.attackController.weaponCollection.addWeapon(enums_1.WeaponType.knife, amount);
}, function (actor, amount) {
    actor.attackController.weaponCollection.removeWeapon(enums_1.WeaponType.knife, amount);
}, function (actor) {
});
new Item(enums_1.WeaponType.shotgun, "Shotgun", function (actor) {
    actor.attackController.equip(enums_1.WeaponType.shotgun);
}, function (actor, amount) {
    actor.attackController.weaponCollection.addWeapon(enums_1.WeaponType.shotgun, amount);
}, function (actor, amount) {
    actor.attackController.weaponCollection.removeWeapon(enums_1.WeaponType.shotgun, amount);
}, function (actor) {
});
new Item(enums_1.WeaponType.rifle, "Rifle", function (actor) {
    actor.attackController.equip(enums_1.WeaponType.rifle);
}, function (actor, amount) {
    actor.attackController.weaponCollection.addWeapon(enums_1.WeaponType.rifle, amount);
}, function (actor, amount) {
    actor.attackController.weaponCollection.removeWeapon(enums_1.WeaponType.rifle, amount);
}, function (actor) {
});
new Item(enums_1.WeaponType.claws, "Claws", function (actor) {
    actor.attackController.equip(enums_1.WeaponType.claws);
}, function (actor, amount) {
    actor.attackController.weaponCollection.addWeapon(enums_1.WeaponType.claws, amount);
}, function (actor, amount) {
    actor.attackController.weaponCollection.removeWeapon(enums_1.WeaponType.claws, amount);
}, function (actor) {
});


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const GUI_1 = __webpack_require__(23);
gui = new GUI_1.GUI({ ctx: ctxui, width: WIDTH, height: HEIGHTUI });
let resizeCanvas = function () {
    WIDTH = window.innerWidth - 4;
    HEIGHT = window.innerHeight - 48 - HEIGHTUI;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvasui.width = WIDTH;
    canvasui.height = HEIGHTUI;
    ctx.font = '30px Arial';
    ctx.mozImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctxui.font = '30px Arial';
    ctxui.mozImageSmoothingEnabled = false;
    ctxui.msImageSmoothingEnabled = false;
    ctxui.imageSmoothingEnabled = false;
    gui.resize(canvasui.width, canvasui.height);
    gui.draw();
};
resizeCanvas();
window.addEventListener('resize', function () {
    resizeCanvas();
});


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
const PlayerClient_1 = __webpack_require__(7);
const game_1 = __webpack_require__(3);
class GUI {
    constructor(param) {
        this.draw = () => {
            this.ctx.clearRect(0, 0, this.width, this.height);
            let pat = this.ctx.createPattern(Img["guibackground"], "repeat-x");
            this.ctx.fillStyle = pat;
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.ctx.fill();
            this.ctx.fillStyle = "#000000";
            if (PlayerClient_1.PlayerClient.list[game_1.selfId]) {
                this.drawWeapon();
                this.drawAmmo();
                this.drawFace();
                this.drawItems();
                this.ctx.fillText('Hit points: ' + PlayerClient_1.PlayerClient.list[game_1.selfId].hp + '/' + PlayerClient_1.PlayerClient.list[game_1.selfId].hpMax, 0, 0.6 * this.height);
            }
        };
        this.resize = (width, height) => {
            this.width = width;
            this.height = height;
        };
        this.drawWeapon = () => {
            if (PlayerClient_1.PlayerClient.list[game_1.selfId]) {
                this.ctx.drawImage(Img[PlayerClient_1.PlayerClient.list[game_1.selfId].weapon], 0, 0, Img[PlayerClient_1.PlayerClient.list[game_1.selfId].weapon].width, Img[PlayerClient_1.PlayerClient.list[game_1.selfId].weapon].height, (this.width - 0.8 * this.height) / 4, (this.height - 0.8 * this.height) / 2, 0.8 * this.height, 0.8 * this.height);
            }
        };
        this.drawAmmo = () => {
            if (PlayerClient_1.PlayerClient.list[game_1.selfId]) {
                if (Img[PlayerClient_1.PlayerClient.list[game_1.selfId].weapon + "ammo"]) {
                    this.ctx.drawImage(Img[PlayerClient_1.PlayerClient.list[game_1.selfId].weapon + "ammo"], 0, 0, Img[PlayerClient_1.PlayerClient.list[game_1.selfId].weapon + "ammo"].width, Img[PlayerClient_1.PlayerClient.list[game_1.selfId].weapon + "ammo"].height, 11 * (this.width - 0.8 * this.height) / 32, (this.height - 0.4 * this.height) / 2, 0.4 * this.height, 0.4 * this.height);
                    this.ctx.fillText(' x' + PlayerClient_1.PlayerClient.list[game_1.selfId].ammo + "  " + PlayerClient_1.PlayerClient.list[game_1.selfId].ammoInGun + "/", 11 * (this.width - 0.8 * this.height) / 32 + 0.4 * this.height, (this.height) / 2 + 10);
                }
            }
        };
        this.drawItems = () => {
            if (PlayerClient_1.PlayerClient.list[game_1.selfId]) {
                this.ctx.drawImage(Img["medicalkit"], 0, 0, Img["medicalkit"].width, Img["medicalkit"].height, 3 * (this.width - 0.8 * this.height) / 4, (this.height - 0.8 * this.height) / 2, 0.8 * this.height, 0.8 * this.height);
                this.ctx.fillText(' x' + game_1.inventory.getItemAmount("medicalkit"), 3 * (this.width - 0.8 * this.height) / 4 + 0.8 * this.height, (this.height) / 2 + 10);
            }
        };
        this.drawFace = () => {
            let spriteRows = 2;
            let spriteColumns = 4;
            let facelook = 1;
            this.ctx.drawImage(Img["faceborder"], 0, 0, Img["faceborder"].width, Img["faceborder"].height, (this.width - 0.85 * this.height) / 2, (this.height - 0.85 * this.height) / 2, 0.85 * this.height, 0.85 * this.height);
            if (PlayerClient_1.PlayerClient.list[game_1.selfId]) {
                facelook = Math.round(((PlayerClient_1.PlayerClient.list[game_1.selfId].hpMax - PlayerClient_1.PlayerClient.list[game_1.selfId].hp) / PlayerClient_1.PlayerClient.list[game_1.selfId].hpMax) * (spriteRows * spriteColumns - 1));
                let facex = facelook % spriteColumns;
                let facey = Math.floor(facelook / spriteColumns);
                let frameWidth = Img["face"].width / spriteColumns;
                let frameHeight = Img["face"].height / spriteRows;
                this.ctx.drawImage(Img["face"], facex * frameWidth, facey * frameHeight, frameWidth, frameHeight, (this.width - 0.8 * this.height) / 2, (this.height - 0.8 * this.height) / 2, 0.8 * this.height, 0.8 * this.height);
            }
        };
        if (param.ctx !== undefined)
            this.ctx = param.ctx;
        if (param.width !== undefined)
            this.width = param.width;
        if (param.height !== undefined)
            this.height = param.height;
    }
}
exports.GUI = GUI;


/***/ })
/******/ ]);