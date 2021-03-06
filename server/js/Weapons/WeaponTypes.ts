import { AttackType } from './../enums';
import { WeaponType } from "../enums";


export class WeaponTypes {

    name: string = "";
    meleeDmg: number = 0;
    shootDmg: number = 0;
    shootSpeed: number = 0;
    attackRadius: number = 0;
    attackSpd: number = 30;
    attackMelee: boolean = true;
    reloadSpd: number = 30;
    recoil: boolean = false;
    _weapon: WeaponType;
    attackType: AttackType;
    maxSpd: number = 8;
    reloadAmmo: number = 0; 

    constructor(param) {
        this._weapon = (param.weapon !== undefined) ? param.weapon : WeaponType.knife; 
        this.attackRadius = (param.attackRadius !== undefined) ? param.attackRadius : 0; 
        this.attackSpd = (param.attackSpd !== undefined) ? param.attackSpd : 0;
        this.attackMelee = (param.attackMelee !== undefined) ? param.attackMelee : true;
        this.shootDmg = (param.shootDmg !== undefined) ? param.shootDmg : 0;
        this.meleeDmg = (param.meleeDmg !== undefined) ? param.meleeDmg : 0;
        this.maxSpd = (param.maxSpd !== undefined) ? param.maxSpd : 8;
        this.shootSpeed = (param.shootSpeed !== undefined) ? param.shootSpeed : 0;
        this.reloadAmmo = (param.reloadAmmo !== undefined) ? param.reloadAmmo : 0;
        this.reloadSpd = (param.reloadSpd !== undefined) ? param.reloadSpd : 0;
        this.recoil = (param.recoil !== undefined) ? param.recoil : false;
        this.name = (param.name !== undefined) ? param.name : "knife";
        this.attackType = (param.attackType !== undefined) ? param.attackType : AttackType.contact;

        WeaponTypes.list[param.weapon] = this;
    }

    get weapon() { return this._weapon; }

    static getWeaponParameters = (weapon : WeaponType) => {
        
        for(let i in WeaponTypes.list){
            let weaponFromBank: WeaponTypes = WeaponTypes.list[i];
            if(weaponFromBank.weapon == weapon){
                return weaponFromBank;
            }
        }
        return WeaponTypes.list[0];
    }

    static getWeaponIdbyName = (name: string) => {
        for(let i in WeaponTypes.list){
            let weaponFromBank: WeaponTypes = WeaponTypes.list[i]
            if(weaponFromBank.name == name){
                return weaponFromBank.weapon;
            }
        }

        return WeaponType.knife;
    }

    static list = {};
}

new WeaponTypes({weapon: WeaponType.pistol, name: "pistol",
attackRadius: 0,
attackSpd: 4,
attackMelee : false,
shootDmg : 2,
meleeDmg : 2,
maxSpd : 10,
shootSpeed : 30,
reloadAmmo : 6,
reloadSpd: 5,
recoil: false,
attackType: AttackType.bullet
});

new WeaponTypes({weapon: WeaponType.flamethrower, name: "flamethrower",
attackRadius: 0,
attackSpd: 6,
attackMelee : false,
shootDmg : 2,
meleeDmg : 2,
maxSpd : 10,
shootSpeed : 30,
reloadAmmo : 0,
reloadSpd: -1,
recoil: false,
attackType: AttackType.fire
});

new WeaponTypes({weapon: WeaponType.shotgun, name: "shotgun",
attackRadius: 3,
attackSpd: 2,
attackMelee : false,
shootDmg : 3,
meleeDmg : 4,
maxSpd : 8,
shootSpeed : 25,
reloadAmmo : 2,
reloadSpd: 2,
recoil: false,
attackType: AttackType.bullet
});

new WeaponTypes({weapon: WeaponType.knife, name: "knife",
attackRadius: 0,
attackSpd: 3,
attackMelee : true,
shootDmg : 0,
meleeDmg : 8,
maxSpd : 11,
reloadAmmo : 0,
reloadSpd: 0,
recoil: false,
attackType: AttackType.contact
});

new WeaponTypes({weapon: WeaponType.rifle, name: "rifle",
attackRadius: 0,
attackSpd: 1,
attackMelee : false,
shootDmg : 15,
meleeDmg : 4,
maxSpd : 8,
shootSpeed : 40,
reloadAmmo : 1,
reloadSpd: 2,
recoil: true,
attackType: AttackType.bullet
});

new WeaponTypes({weapon: WeaponType.claws , name: "claws",
attackRadius: 0,
attackSpd: 3,
attackMelee : true,
shootDmg : 0,
meleeDmg : 5,
reloadAmmo : 0,
reloadSpd: 0,
recoil: false,
attackType: AttackType.contact

});