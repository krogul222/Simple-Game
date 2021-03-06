import { Upgrade } from './Upgrade';
import { GameController } from './../Controllers/GameController';
import { Flame } from './../Effects/Flame';
import { Smoke } from './../Effects/Smoke';
import { initPack, removePack } from './../globalVariables';
import { Enemy } from './Enemy';
import { Bullet } from './Bullet';
import { Actor } from "./Actor";
import { Point } from './../GeometryAndPhysics';
import { Pack } from '../Pack';
import { WeaponType, ItemType, ActorStartingPack } from '../enums';
import { MapController } from '../Controllers/MapControler';
import { GameMap } from '../Map/GameMap';


export class Player extends Actor {
    private updatePack = {};
    private closeEnemiesArr: number[];
    private closeUpgradesArr: number[];
    private counter: number = 0;
    private fragPlayer: number = 0;
    private fragEnemy: number = 0;
    private updateFreqyencyFactor: number = 0;

    constructor(param) { 
        super(param);
        initPack.player.push(this.getInitPack());
        Player.list[param.id] = this;

        if(param.starterPack !== undefined)
            this.giveItems(param.starterPack);
        else
            this.giveItems(ActorStartingPack.FULL);

        if(GameController.list[this.game] !== undefined){
            GameController.list[this.game].initPack.player.push(this.getInitPack());
        }

        GameController.list[this.game].addPlayer(this);
    } 

    giveItems = (startingPack: ActorStartingPack) => {

        if(startingPack >= ActorStartingPack.BASIC){
            this.inventory.addItem(ItemType.knife,1);
            this.inventory.addItem(ItemType.pistol,1);
            this.attackController.weaponCollection.setWeaponAmmo(WeaponType.pistol, 50);
            this.inventory.useItem(WeaponType.pistol);
        }
        
        if(startingPack >= ActorStartingPack.MODERATE){
            this.inventory.addItem(ItemType.shotgun,1);
            this.inventory.addItem(ItemType.rifle,1);
            this.inventory.addItem(ItemType.medicalkit,2); 
            this.attackController.weaponCollection.setWeaponAmmo(WeaponType.shotgun, 40);
            this.attackController.weaponCollection.setWeaponAmmo(WeaponType.pistol, 100);
            this.attackController.weaponCollection.setWeaponAmmo(WeaponType.rifle, 40);
            this.inventory.useItem(WeaponType.shotgun);
        }      

        if(startingPack >= ActorStartingPack.FULL){
            this.inventory.addItem(ItemType.flamethrower,1);
            this.inventory.addItem(ItemType.medicalkit,2); 
            this.attackController.weaponCollection.setWeaponAmmo(WeaponType.shotgun, 100);
            this.attackController.weaponCollection.setWeaponAmmo(WeaponType.pistol, 200);
            this.attackController.weaponCollection.setWeaponAmmo(WeaponType.rifle, 100);
            this.attackController.weaponCollection.setWeaponAmmo(WeaponType.flamethrower, 400);
            this.inventory.useItem(WeaponType.shotgun);
        }      
    }

    getInitPack = () => {
        return {
            id: this.id,
            position: this.position,
            hp: this.lifeAndBodyController.hp,
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
            ammoInGun: this.attackController.activeWeapon.ammoInGun,
            burn: this.lifeAndBodyController.burn,
            fragPlayer: this.fragPlayer,
            fragEnemy: this.fragEnemy
        };
    }

    extendedUpdate = () => {
        this.update();
        this.counter++;

        if(this.counter % (30+this.updateFreqyencyFactor)){
            this.closeEnemiesArr = this.closeEnemies(800);
            this.closeUpgradesArr = this.closeUpgrades(800);
            this.updateFreqyencyFactor = Math.floor(20*Math.random());
        }
    }

    getCloseEnemies = () => {
        return this.closeEnemiesArr;
    }

    getCloseUpgrades = () => {
        return this.closeUpgradesArr;
    }

    incFragPlayer = () => {
        this.fragPlayer++;
    }

    incFragEnemy = () => {
        this.fragEnemy++;    
    }

    getUpdatePack = () => {
        let attackStartedTmp = this.attackController.attackStarted;
        this.attackController.attackStarted = false;

        let newPack = {};
    
        this.updatePack['id'] = this.id;
        newPack['id'] = this.id;
        
        if(this.updatePack['position'] !== this.position){
            newPack['position'] = this.position;
            this.updatePack['position'] = new Point(this.position.x, this.position.y);
        }

        if(this.updatePack['hp'] !== this.lifeAndBodyController.hp){
            newPack['hp'] = this.lifeAndBodyController.hp;
            this.updatePack['hp'] = this.lifeAndBodyController.hp;
        }
        if(this.updatePack['moving'] !== this.movementController.moving){
            newPack['moving'] = this.movementController.moving;
            this.updatePack['moving'] = this.movementController.moving;
        }
        if(this.updatePack['aimAngle'] !== this.movementController.aimAngle){
            newPack['aimAngle'] = this.movementController.aimAngle;
            this.updatePack['aimAngle'] = this.movementController.aimAngle;
        }

        if(this.updatePack['attackStarted'] !== attackStartedTmp){
            newPack['attackStarted'] = attackStartedTmp;
            this.updatePack['attackStarted'] = attackStartedTmp;
        }

        if(this.updatePack['weapon'] !== this.attackController.activeWeapon.name){
            newPack['weapon'] = this.attackController.activeWeapon.name;
            this.updatePack['weapon'] = this.attackController.activeWeapon.name;
        }

        if(this.updatePack['attackMelee'] !== this.attackController.melee){
            newPack['attackMelee'] = this.attackController.melee;
            this.updatePack['attackMelee'] = this.attackController.melee;
        }

        if(this.updatePack['ammo'] !== this.attackController.activeWeapon.ammo){
            newPack['ammo'] = this.attackController.activeWeapon.ammo;
            this.updatePack['ammo'] = this.attackController.activeWeapon.ammo;
        }

        if(this.updatePack['ammoInGun'] !== this.attackController.activeWeapon.ammoInGun){
            newPack['ammoInGun'] = this.attackController.activeWeapon.ammoInGun;
            this.updatePack['ammoInGun'] = this.attackController.activeWeapon.ammoInGun;
        }

        if(this.updatePack['reload'] !== this.attackController.reloadCounter.isActive()){
            newPack['reload'] = this.attackController.reloadCounter.isActive();
            this.updatePack['reload'] = this.attackController.reloadCounter.isActive();
        }

        if(this.updatePack['pressingAttack'] !== this.attackController.pressingAttack){
            newPack['pressingAttack'] = this.attackController.pressingAttack;
            this.updatePack['pressingAttack'] = this.attackController.pressingAttack;
        }

        if(this.updatePack['burn'] !== this.lifeAndBodyController.burn){
            newPack['burn'] = this.lifeAndBodyController.burn;
            this.updatePack['burn'] = this.lifeAndBodyController.burn;
        }

        if(this.updatePack['fragPlayer'] !== this.fragPlayer){
            newPack['fragPlayer'] = this.fragPlayer;
            this.updatePack['fragPlayer'] = this.fragPlayer;
        }

        if(this.updatePack['fragEnemy'] !== this.fragEnemy){
            newPack['fragEnemy'] = this.fragEnemy;
            this.updatePack['fragEnemy'] = this.fragEnemy;
        }        

        return newPack;

    }

    static onConnect = (socket, createdGame: boolean = false, gID: number = -1, data: any = {}) => {

        let game:GameController; 
        let gameId: number = gID;

        if(createdGame == true) {

            if(data !== undefined){
                game = new GameController(data);
            } else{
                game = new GameController({});
            }
            
            if(data.monstersnumber !== undefined){
                let num = data.monstersnumber;
                for(let i = 0; i < num; i++){
                    Enemy.randomlyGenerate(game);
                }
            } else{
                for(let i = 0; i < 40; i++){
                    Enemy.randomlyGenerate(game);
                }
            }

            if(data.itemsnumber !== undefined){
                let num = data.itemsnumber;
                for(let i = 0; i < num; i++){
                    Upgrade.randomlyGenerate(game);
                }
            } else{
                for(let i = 0; i < 20; i++){
                    Upgrade.randomlyGenerate(game);
                }
            }

            gameId = game.id;

        } else{
            game = GameController.list[gameId];
            gameId = game.id;
        }

        game.addSocket(socket);
        let map = game.map;

        let player:Player = new Player({
             id: socket.id,
             maxSpdX: 12,
             maxSpdY: 12,
             map: map,
             game: gameId,
             img: 'player',
             atkSpd: 7,
             width: 50, 
             height: 50, 
             type: "player", 
             hp: 40, 
             socket: socket,
             starterPack: game.starterPack});

        socket.on('changeWeapon', function(data){
            if(data.state == 'next') { player.attackController.weaponCollection.chooseNextWeaponWithAmmo() }
            if(data.state == 'prev') { player.attackController.weaponCollection.choosePrevWeaponWithAmmo() }
        });

        socket.on('keyPress', function(data){
            if(data.inputId == 'left') player.movementController.pressingLeft = data.state;
            if(data.inputId == 'right') player.movementController.pressingRight = data.state;
            if(data.inputId == 'up') player.movementController.pressingUp = data.state;
            if(data.inputId == 'down') player.movementController.pressingDown = data.state;
            if(data.inputId == 'attack') player.attackController.pressingAttack = data.state;
            if(data.inputId == 'mouseAngle') player.movementController.aimAngle = data.state;
            if(data.inputId == 'heal') player.inventory.useItem(ItemType.medicalkit);
            if(data.inputId == '1') player.attackController.weaponCollection.changeWeapon(WeaponType.knife);   
            if(data.inputId == '2') player.attackController.weaponCollection.changeWeapon(WeaponType.pistol); 
            if(data.inputId == '3') player.attackController.weaponCollection.changeWeapon(WeaponType.shotgun); 
            if(data.inputId == '4') player.attackController.weaponCollection.changeWeapon(WeaponType.rifle); 
            if(data.inputId == '5') player.attackController.weaponCollection.changeWeapon(WeaponType.flamethrower); 
            if(data.inputId == 'space') player.attackController.weaponCollection.chooseNextWeaponWithAmmo();
            if(data.inputId == 'smoke') new Smoke(new Point(player.position.x -128,player.position.y -128), 150, 750, 20, player.game);
        });

        socket.on('PlayerLeftGame', function(data){
            Player.onDisconnect(socket);
        });

        socket.emit('init',{player: Player.getAllSpecificInitPack(game.id),enemy:Enemy.getAllSpecificInitPack(game.id),selfId:socket.id});
        socket.emit('mapData', MapController.getMapPack(game.map));
        
    }

    onDeath = () => {
        this.lifeAndBodyController.reset();
        let map = MapController.getMap(this.map);
        let x = Math.random() * map.width; 
        let y = Math.random() * map.height; 
        let position = new Point(x, y);

        while(map.isPositionWall(position)){
            x = Math.random() * map.width; 
            y = Math.random() * map.height; 
            position.updatePosition(x, y); 
        }

        this.setPosition(position); 
    }

    closeEnemies = (distance) => {
        let ids: number[] = [];
        let e: Enemy;

        if(GameController.list[this.game] !== undefined) {
            let enemies = GameController.list[this.game].enemies;
            for(let i in enemies){
                e = enemies[i];
                if(Math.abs(e.position.x - this.position.x) < distance && Math.abs(e.position.y - this.position.y) < distance){
                    ids.push(e.id);
                }
            }
        }
        return ids;
    }

    closeUpgrades = (distance) => {
        let ids: number[] = [];
        let u: Upgrade;

        if(GameController.list[this.game] !== undefined) {
            let upgrades = GameController.list[this.game].upgrades;
            for(let i in upgrades){
                u = upgrades[i];
                if(Math.abs(u.position.x - this.position.x) < distance && Math.abs(u.position.y - this.position.y) < distance){
                    ids.push(u.id);
                }
            }
        }
        return ids;
    }

    static getAllInitPack = () => {
        let players: any[] = [];
        for(let i in Player.list) { players.push(Player.list[i].getInitPack()); }
        return players;
    }

    static getAllSpecificInitPack = (game) => {
        let players: any[] = [];
        if(GameController.list[game] !== undefined){
            let p = GameController.list[game].players;
            for(let i in p) { players.push(p[i].getInitPack()); }
        }
        
        return players;
    }

    static onDisconnect = (socket) => {
        delete Player.list[socket.id];
        removePack.player.push(socket.id);
        
        console.log("Disconnect");

        for(let key in GameController.list){
            let players = GameController.list[key].players;
            for(let i in players){
                if(players[i].id == socket.id) {
                    GameController.list[key].removePack.player.push(socket.id);
                    delete GameController.list[key].socketList[socket.id];
                }
            }
        }
    }

    static update = () => {
        let pack: any[] =[];
        for(let i in Player.list){
            let player = Player.list[i];
            player.extendedUpdate();
            pack.push(player.getUpdatePack());
        }
        return pack;
    }

    static updateSpecific = (players) => {
        let pack: any[] =[];
        for(let i in players){
            let player = players[i];
            player.extendedUpdate();
            pack.push(player.getUpdatePack());
        }
        return pack;
    }

    static list = {};
}