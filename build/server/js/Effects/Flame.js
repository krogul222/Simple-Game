Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./../enums");
const GeometryAndPhysics_1 = require("./../GeometryAndPhysics");
const Particle_1 = require("./Particle/Particle");
class Flame {
    constructor(param) {
        this._id = Math.random();
        this.particles = {};
        this.angle = 0;
        this.position = new GeometryAndPhysics_1.Point(0, 0);
        this.speed = 3;
        this.offset = 0;
        this.parent = null;
        this.create = false;
        this.life = 60;
        this.update = () => {
            if (this.create) {
                let angleInRad = 0;
                let posWithOffset = new GeometryAndPhysics_1.Point(0, 0);
                for (let i = 0; i < 1; i++) {
                    if (this.parent !== undefined) {
                        angleInRad = ((this.parent.movementController.aimAngle + 180) * Math.PI) / 180;
                        posWithOffset.x = this.parent.position.x - Math.cos(angleInRad) * this.offset;
                        posWithOffset.y = this.parent.position.y - Math.sin(angleInRad) * this.offset;
                    }
                    else {
                        angleInRad = (this.angle * Math.PI) / 180;
                        posWithOffset.x = this.position.x - Math.cos(angleInRad) * this.offset;
                        posWithOffset.y = this.position.y - Math.sin(angleInRad) * this.offset;
                    }
                    let flame = (0 - Math.random() * 2 * this.speed);
                    let velocity = new GeometryAndPhysics_1.Point(0, 0);
                    velocity.x = Math.cos(angleInRad) * flame;
                    velocity.y = Math.sin(angleInRad) * flame;
                    angleInRad += Math.PI / 2;
                    flame = (Math.random() * 2 * this.speed - this.speed) / 6;
                    velocity.x += Math.cos(angleInRad) * flame;
                    velocity.y += Math.sin(angleInRad) * flame;
                    let p = new Particle_1.Particle({ parent: this.parent.id, combatType: this.parent.type, position: posWithOffset, velocity: velocity, maxLife: this.life, type: enums_1.ParticleType.fire, game: this.game });
                    this.particles[p.id] = p;
                }
            }
        };
        if (param.position !== undefined) {
            this.position.x = param.position.x;
            this.position.y = param.position.y;
        }
        this.parent = (param.parent !== undefined) ? param.parent : null;
        this.angle = (param.angle !== undefined) ? param.angle : 0;
        this.offset = (param.offset !== undefined) ? param.offset : 0;
        this.life = (param.life !== undefined) ? param.life : 60;
        this.game = (param.game !== undefined) ? param.game : 0;
        Flame.list[this.id] = this;
    }
    get id() { return this._id; }
}
Flame.list = {};
exports.Flame = Flame;
//# sourceMappingURL=Flame.js.map