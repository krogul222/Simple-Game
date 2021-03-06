Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./../enums");
const Flame_1 = require("./../Effects/Flame");
const Bullet_1 = require("./../Entities/Bullet");
const WeaponCollection_1 = require("./../Weapons/WeaponCollection");
const Counter_1 = require("./../Counter");
const WeaponTypes_1 = require("../Weapons/WeaponTypes");
const GeometryAndPhysics_1 = require("../GeometryAndPhysics");
class AttackController {
    constructor(parent, param) {
        this.parent = parent;
        this._melee = true;
        this._attackStarted = false;
        this._reloadCounter = new Counter_1.Counter(50);
        this._attackCounter = new Counter_1.Counter(25);
        this._pressingAttack = false;
        this._accuracy = 0;
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
            if (this._pressingAttack == false)
                this._flame.create = false;
        };
        this.performAttack = () => {
            if (!this._reloadCounter.isActive() && this._pressingAttack) {
                if (this._attackCounter.resetIfMax()) {
                    this._attackStarted = true;
                    this._melee = (this._activeWeapon._ammoInGun > 0) ? WeaponTypes_1.WeaponTypes.getWeaponParameters(this._activeWeapon.weapon).attackMelee : true;
                    this._melee ? this.closeAttack(this.parent.movementController.aimAngle) : this.distanceAttack();
                }
            }
        };
        this.closeAttack = (aimAngle) => (this.parent.type == 'player') ? this.attackCloseByPlayer(aimAngle) : this.attackCloseByEnemy(aimAngle);
        this.attackCloseByEnemy = (aimAngle) => {
            let player = this.parent.getClosestPlayer(10000000, 360);
            let distance = 80;
            if (player) {
                let maxDistance = Math.sqrt(player.width * player.width / 4 + player.height * player.height / 4) + distance;
                if (this.parent.getDistance(player) < maxDistance) {
                    player.lifeAndBodyController.wasHit(this._activeWeapon.meleeDmg);
                }
            }
        };
        this.attackCloseByPlayer = (aimAngle) => {
            let enemy = this.parent.getClosestPlayerorEnemy(20, 45);
            if (enemy) {
                enemy.lifeAndBodyController.wasHit(this._activeWeapon.meleeDmg);
            }
        };
        this.distanceAttack = () => {
            if (this._activeWeapon.shoot(1)) {
                let shootSpeed = this._activeWeapon.shootSpeed;
                let accuracy = (Math.random() - 0.5) * this._accuracy;
                let aimAngle = this.parent.movementController.aimAngle + accuracy;
                let attackRadius = this._activeWeapon.attackRadius;
                if (this._activeWeapon.attackType == enums_1.AttackType.bullet) {
                    this.shootBullet(aimAngle, shootSpeed);
                    for (let i = 0; i < attackRadius; i++) {
                        this.shootBullet(aimAngle + (i + 1) * 2, shootSpeed);
                        this.shootBullet(aimAngle - (i + 1) * 2, shootSpeed);
                    }
                }
                if (this._activeWeapon.attackType == enums_1.AttackType.fire) {
                    this._flame.create = true;
                    this._flame.update();
                }
            }
        };
        this.equip = (weapon) => {
            this.activeWeapon.equip(weapon);
            let weaponProperties = WeaponTypes_1.WeaponTypes.list[weapon];
            this._melee = weaponProperties.attackMelee;
            console.log("BRON: " + weaponProperties.name + " " + "melee:" + weaponProperties.attackMelee);
        };
        this.shootBullet = (aimAngle, shootSpeed) => {
            let b = new Bullet_1.Bullet({
                parent: this.parent.id,
                combatType: this.parent.type,
                angle: aimAngle,
                position: new GeometryAndPhysics_1.Point(this.parent.position.x, this.parent.position.y),
                map: this.parent.map,
                game: this.parent.game,
                img: 'bullet',
                width: 8,
                height: 8,
                shootspeed: shootSpeed
            });
            let counter = 0;
            while (!b.isToRemove) {
                b.update();
                counter++;
                if (counter == 1) {
                    b.startPosition.x = b.position.x;
                    b.startPosition.y = b.position.y;
                }
            }
        };
        this.getDamage = () => {
            let damage = 0;
            damage = (this._melee) ? this._activeWeapon.meleeDmg : this._activeWeapon.shootDmg;
            return damage;
        };
        this._weaponCollection = new WeaponCollection_1.WeaponCollection(this.parent);
        this._activeWeapon = new WeaponCollection_1.SingleWeapon(this.parent, { weapon: "0", ammo: "20", parent: this.parent });
        if (param.atkSpd)
            this._attackCounter.setInc(param.atkSpd);
        this._flame = new Flame_1.Flame({ parent: parent, game: this.parent.game, offset: 50, life: 30 });
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
    set accuracy(value) { this._accuracy = value; }
}
exports.AttackController = AttackController;
//# sourceMappingURL=AttackControler.js.map