Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
exports.imageName = {};
exports.mapTileImageName = {};
exports.mapTileSideImageName = {};
exports.mapTileCornerImageName = {};
exports.mapObjectImageName = {};
exports.mapObjectCollisions = {};
exports.GAME_SPEED_TOOLINGFACTOR = 0.75;
exports.TILE_SIZE = 8;
exports.imageName[enums_1.ItemType.pistol] = "pistol";
exports.imageName[enums_1.ItemType.shotgun] = "shotgun";
exports.imageName[enums_1.ItemType.rifle] = "rifle";
exports.imageName[enums_1.ItemType.medicalkit] = "medicalkit";
exports.imageName[enums_1.ItemType.knife] = "knife";
exports.imageName[enums_1.ItemType.flamethrower] = "flamethrower";
exports.imageName[enums_1.WeaponAmmoType.pistol] = "pistolammo";
exports.imageName[enums_1.WeaponAmmoType.shotgun] = "shotgunammo";
exports.imageName[enums_1.WeaponAmmoType.rifle] = "rifleammo";
exports.mapTileImageName[enums_1.TerrainMaterial.dirt] = "dirt";
exports.mapTileImageName[enums_1.TerrainMaterial.water] = "water";
exports.mapTileImageName[enums_1.TerrainMaterial.stone] = "stone";
exports.mapTileSideImageName[enums_1.Orientation.left] = {};
exports.mapTileSideImageName[enums_1.Orientation.left][enums_1.TerrainMaterial.stone] = "stoneL";
exports.mapTileSideImageName[enums_1.Orientation.left][enums_1.TerrainMaterial.dirt] = "dirtL";
exports.mapTileSideImageName[enums_1.Orientation.left][enums_1.TerrainMaterial.water] = "waterL";
exports.mapTileSideImageName[enums_1.Orientation.right] = {};
exports.mapTileSideImageName[enums_1.Orientation.right][enums_1.TerrainMaterial.stone] = "stoneR";
exports.mapTileSideImageName[enums_1.Orientation.right][enums_1.TerrainMaterial.dirt] = "dirtR";
exports.mapTileSideImageName[enums_1.Orientation.right][enums_1.TerrainMaterial.water] = "waterR";
exports.mapTileSideImageName[enums_1.Orientation.up] = {};
exports.mapTileSideImageName[enums_1.Orientation.up][enums_1.TerrainMaterial.stone] = "stoneU";
exports.mapTileSideImageName[enums_1.Orientation.up][enums_1.TerrainMaterial.dirt] = "dirtU";
exports.mapTileSideImageName[enums_1.Orientation.up][enums_1.TerrainMaterial.water] = "waterU";
exports.mapTileSideImageName[enums_1.Orientation.down] = {};
exports.mapTileSideImageName[enums_1.Orientation.down][enums_1.TerrainMaterial.stone] = "stoneD";
exports.mapTileSideImageName[enums_1.Orientation.down][enums_1.TerrainMaterial.dirt] = "dirtD";
exports.mapTileSideImageName[enums_1.Orientation.down][enums_1.TerrainMaterial.water] = "waterD";
exports.mapTileCornerImageName[enums_1.CornerOrientation.RU] = {};
exports.mapTileCornerImageName[enums_1.CornerOrientation.RU][enums_1.TerrainMaterial.stone] = "stoneRU";
exports.mapTileCornerImageName[enums_1.CornerOrientation.RU][enums_1.TerrainMaterial.dirt] = "dirtRU";
exports.mapTileCornerImageName[enums_1.CornerOrientation.RU][enums_1.TerrainMaterial.water] = "waterRU";
exports.mapTileCornerImageName[enums_1.CornerOrientation.RD] = {};
exports.mapTileCornerImageName[enums_1.CornerOrientation.RD][enums_1.TerrainMaterial.stone] = "stoneRD";
exports.mapTileCornerImageName[enums_1.CornerOrientation.RD][enums_1.TerrainMaterial.dirt] = "dirtRD";
exports.mapTileCornerImageName[enums_1.CornerOrientation.RD][enums_1.TerrainMaterial.water] = "waterRD";
exports.mapTileCornerImageName[enums_1.CornerOrientation.LU] = {};
exports.mapTileCornerImageName[enums_1.CornerOrientation.LU][enums_1.TerrainMaterial.stone] = "stoneLU";
exports.mapTileCornerImageName[enums_1.CornerOrientation.LU][enums_1.TerrainMaterial.dirt] = "dirtLU";
exports.mapTileCornerImageName[enums_1.CornerOrientation.LU][enums_1.TerrainMaterial.water] = "waterLU";
exports.mapTileCornerImageName[enums_1.CornerOrientation.LD] = {};
exports.mapTileCornerImageName[enums_1.CornerOrientation.LD][enums_1.TerrainMaterial.stone] = "stoneLD";
exports.mapTileCornerImageName[enums_1.CornerOrientation.LD][enums_1.TerrainMaterial.dirt] = "dirtLD";
exports.mapTileCornerImageName[enums_1.CornerOrientation.LD][enums_1.TerrainMaterial.water] = "waterLD";
exports.mapObjectImageName[enums_1.MapObjectType.GR_D] = "groundRingD";
exports.mapObjectImageName[enums_1.MapObjectType.GR_U] = "groundRingU";
exports.mapObjectImageName[enums_1.MapObjectType.GR_L] = "groundRingL";
exports.mapObjectImageName[enums_1.MapObjectType.GR_R] = "groundRingR";
exports.mapObjectImageName[enums_1.MapObjectType.GR_RU] = "groundRingRU";
exports.mapObjectImageName[enums_1.MapObjectType.GR_LU] = "groundRingLU";
exports.mapObjectImageName[enums_1.MapObjectType.GR_RD] = "groundRingRD";
exports.mapObjectImageName[enums_1.MapObjectType.GR_LD] = "groundRingLD";
exports.mapObjectImageName[enums_1.MapObjectType.GR_EU] = "groundRingUenter";
exports.mapObjectImageName[enums_1.MapObjectType.GR_ED] = "groundRingDenter";
exports.mapObjectImageName[enums_1.MapObjectType.GR_EL] = "groundRingLenter";
exports.mapObjectImageName[enums_1.MapObjectType.GR_ER] = "groundRingRenter";
exports.mapObjectCollisions[enums_1.MapObjectType.GR_D] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
exports.mapObjectCollisions[enums_1.MapObjectType.GR_U] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
exports.mapObjectCollisions[enums_1.MapObjectType.GR_L] = [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0];
exports.mapObjectCollisions[enums_1.MapObjectType.GR_R] = [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0];
exports.mapObjectCollisions[enums_1.MapObjectType.GR_RD] = [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0];
exports.mapObjectCollisions[enums_1.MapObjectType.GR_LD] = [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2];
exports.mapObjectCollisions[enums_1.MapObjectType.GR_RU] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0];
exports.mapObjectCollisions[enums_1.MapObjectType.GR_LU] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0];
exports.mapObjectCollisions[enums_1.MapObjectType.GR_EU] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 1, 2, 2, 2, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
exports.mapObjectCollisions[enums_1.MapObjectType.GR_ED] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2];
exports.mapObjectCollisions[enums_1.MapObjectType.GR_EL] = [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0];
exports.mapObjectCollisions[enums_1.MapObjectType.GR_ER] = [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0];
//# sourceMappingURL=Constants.js.map