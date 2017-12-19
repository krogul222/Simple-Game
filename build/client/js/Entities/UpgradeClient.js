Object.defineProperty(exports, "__esModule", { value: true });
const GeometryAndPhysics_1 = require("./../../../server/js/GeometryAndPhysics");
const PlayerClient_1 = require("./PlayerClient");
const game_1 = require("../game/game");
const canvas_1 = require("../pregame/canvas");
const images_1 = require("../images");
class UpgradeClient {
    constructor(param) {
        this.position = new GeometryAndPhysics_1.Point(0, 0);
        this.id = -1;
        this.draw = () => {
            let p = PlayerClient_1.PlayerClient.list[game_1.selfId];
            if (p.map !== this.map) {
                return;
            }
            if (p.position.x - this.position.x > WIDTH || p.position.y - this.position.y > HEIGHT)
                return;
            let frame = images_1.jsonIAE["frames"][this.img + ".png"]["frame"];
            let frameWidth = frame["w"];
            let frameHeight = frame["h"];
            canvas_1.camera.drawImage(images_1.Img["IAE"], frameWidth, frameHeight, 0, 0, 0, this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height, frame["x"], frame["y"]);
        };
        this.id = param.id ? param.id : this.id;
        this.position = param.position ? param.position : this.position;
        this.width = param.width ? param.width : this.width;
        this.height = param.height ? param.height : this.height;
        this.map = param.map ? param.map : this.map;
        this.img = param.img ? param.img : this.img;
        this.category = param.category ? param.category : this.category;
        this.kind = param.kind ? param.kind : this.kind;
        UpgradeClient.list[this.id] = this;
    }
}
UpgradeClient.list = {};
exports.UpgradeClient = UpgradeClient;
//# sourceMappingURL=UpgradeClient.js.map