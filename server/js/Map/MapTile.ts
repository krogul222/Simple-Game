import { mapObjectCollisions, TILE_SIZE } from './../Constants';
import { Point } from './../GeometryAndPhysics';
import { TerrainMaterial, MapObjectType } from "../enums";

export class MapTile {

    public grid: number[][];
    private _material: TerrainMaterial;
    public sides: number[] = [];
    public corners: number[] = [];
    public objects: MapObjectType[] = [];
    public convex: boolean = true;
    public collisions: boolean = false;

    constructor(private _width: number, private _height: number, material: TerrainMaterial) {
        this._material = material;
        this.grid = [];
        for(let i = 0; i < this._height; i++){
            this.grid[i] = [];
            for(let j = 0; j < this._width; j++){
                this.grid[i][j] = (material != TerrainMaterial.water) ? 0 : 2;
                if(this.grid[i][j]>0){
                    this.collisions = true;
                }
            }
        }

        for(let i = 0; i < 4 ; i++ ){
            this.sides[i] = 0;
            this.corners[i] = 0;
        }
        this.objects.push(0);
    }

    updateMaterial = (material) => {
        this._material = material;
    }

    isPositionWall = (position: Point) => {
        let areaX = Math.floor(position.x/32);
        let areaY = Math.floor(position.y/32);
        //console.log("AX = "+areaX + "   areaY = "+areaY);
        if(areaX < this._width && areaY < this._height){
          //  console.log(this.grid[areaY][areaX]);
            return this.grid[areaY][areaX];
           // return 0;
        }
        else{
           // console.log("MAPTILE FAIL "+areaX+" "+areaY);
            return 0;
        }
            
    }

    addObject = (type : MapObjectType, collisions: boolean) => {
        this.objects.push(type);
        if(collisions == true){
            this.updateCollisions(type);
        }
        
    }

    updateCollisions = (type : MapObjectType) => {

        let gridUpdate = mapObjectCollisions[type];
        console.log("COLLISIONS: "+mapObjectCollisions[type]);
        this.collisions = false;
        for(let i = 0; i < this._height; i++){
            for(let j = 0; j < this._width; j++){
               // if(gridUpdate[i*TILE_SIZE+j] > this.grid[i][j]){
                    this.grid[i][j] = gridUpdate[i*TILE_SIZE+j];
                    if(this.grid[i][j] > 0){
                        this.collisions = true;
                    }
                    
               // }
            }
        }

    }



    get width() { return this._width; }
    get height() { return this._height; }
    get material() { return this._material; }
}