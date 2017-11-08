import { initPack, removePack } from './../globalVariables';
import { Point } from './../GeometryAndPhysics';
export class Smoke {

    id: number = Math.random();
    public radius: number = 10;
    public grow: boolean = true;

    constructor(public position: Point, public maxRadius: number, public time: number, public speed: number, public map){
        Smoke.list[this.id] = this;
        initPack.smoke.push(this.getInitPack());
    }

    update = () => {
        if(this.time > 0){
            if(this.grow){
                if(this.radius >= this.maxRadius){ this.grow = false; }
                this.radius += this.speed;
            } else{
                if(this.time*this.speed - this.maxRadius <= 0 && this.radius > 0){
                    this.radius -= this.speed;
                }
            }
            this.time--;
        }
    }

    getInitPack = () => {
        return {
            id: this.id,
            position: this.position,
            radius: this.radius,
            map: this.map,
            maxRadius: this.maxRadius,
            time: this.time
        };
    }

    getUpdatePack = () => {
        return {
            id: this.id,
            radius: this.radius
        }
    }

    static update = () => {
        let pack: any[] =[];
        for(let i in Smoke.list){
            let smoke: Smoke = Smoke.list[i];
            smoke.update();
            if(smoke.time == 0){
                delete Smoke.list[i];
                removePack.smoke.push(smoke.id);
            } else {
                pack.push(smoke.getUpdatePack());
            }
        }
        return pack;
    }

    static list = {};
}