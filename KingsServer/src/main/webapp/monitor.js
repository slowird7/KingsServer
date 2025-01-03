//import * as PIXI from 'pixi.js';
const app = new PIXI.Application();
//await app.init({ width: appWidth, height: appHeight, backgroundColor: 0xF0F0F0 });
await app.init({ resizeTo: window, backgroundColor: 0xF0F0F0 });
document.getElementById('appSpace').appendChild(app.canvas);;

const container = new PIXI.Container();
//app.stage.container = container;
app.stage.addChild(container);

// https://pixijs.com/8.x/examples/basic/container.html
// Move the container to the center
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;
const appWidth = app.screen.width;
const appHeight = app.screen.height;
// Center the bunny sprites in local container coordinates
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;
let matrix = container.localTransform

//const FONTSIZE = 70;
//const FONTOFFSET = FONTSIZE / 2;
const compass = ["北", "東", "南", "西"];
const indiators = [
    ["西←", "東→", "北↑", "南↓"],
    ["南西←", "北東→", "北西↑", "南東↓"],
    ["南←", "北→", "西↑", "東↓"],
    ["南東←", "北西→", "南西↑", "北東↓"],
    ["東←", "西→", "南↑", "北↓"],
    ["北東←", "南西→", "南東↑", "北西↓"],
    ["北←", "南→", "東↑", "西↓"],
    ["北西←", "南東→", "北東↑", "南西↓"]];

// 各種アイテムの表示位置
const posX = [30, 260];
const posY = [10, 40, 70, 100, 130];

let angleStart = 0;
let angleEnd = 0;
let fMX = 0; // マウス用
let fMY = 0;
let sMX = 0;
let sMY = 0;

let surveyData = '';
// ずれ
let difX = 0;
let difY = 0;
let difZ = 0;
// 実測
let mz = 0;
let scale = 10 * appHeight / 500.0 * 1.1;
let selection = true;
let angle = 0.;
let north = -90;
let rot = document.getElementById('txtRot');
let selMeasureMode = document.getElementById('selMeasureMode');
// Create the application helper and add its render target to the page

let scaleD = scale;
let outR = 10; // 外円の半径
let inR = 5; // 内円の半径
let point = 0.75; // 赤丸

/*
* 外側の円を描画する
*/
let outerCircle = new PIXI.Graphics().circle(0, 0, outR * scaleD); // 左上x, y, 幅、高さ
outerCircle.stroke({ color: 0xff7f26, width: 5 });
outerCircle.fill(0xffff80);
//outerCircle.pivot.x = -320;
//outerCircle.pivot.y = -200;
container.addChild(outerCircle);
outerCircle.interactive = true;
outerCircle.on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointermove', onDragMove);
/*
* 内側の円を描画する
*/
let innerCircle = new PIXI.Graphics().circle(0, 0, inR * scaleD);
innerCircle.stroke(0x00A2E8);
innerCircle.fill(0x80FFFF); //gc.setFill(Color.rgb(128, 255, 255));
//innerCircle.pivot.x = -320;
//innerCircle.pivot.y = -200;
container.addChild(innerCircle);


// 座標軸
let axis = new PIXI.Graphics();
axis.moveTo(-appWidth, 0).lineTo(appWidth, 0);
axis.moveTo(0, -appHeight).lineTo(0, appHeight);
axis.stroke({ color: 0x000000, width: 1 });
container.addChild(axis);

// 赤丸を作る
let redMark = new PIXI.Graphics().circle(0, 0, 10).fill(0xff0000);
//redMark.pivot.x = -320;
//redMark.pivot.y = -200;
//redMark.x = 0;
//redMark.y = 0;
container.addChild(redMark);

/*
 * 円周上の「東西南北」表示
 */
const northMark = new PIXI.Text({ text: compass[0], fill: 0x000000, fontSize: 20, fontFamily: 'Arial' });
const northP = new PIXI.Point(0, -180);
northMark.anchor.set(0.5, 0.5);
const eastMark = new PIXI.Text({ text: compass[1], fill: 0x000000, fontSize: 20, fontFamily: 'Arial' });
const eastP = new PIXI.Point(180, 0);
eastMark.anchor.set(0.5, 0.5);
const southMark = new PIXI.Text({ text: compass[2], fill: 0x000000, fontSize: 20, fontFamily: 'Arial' });
const southP = new PIXI.Point(0, 180);
southMark.anchor.set(0.5, 0.5);
const westMark = new PIXI.Text({ text: compass[3], fill: 0x000000, fontSize: 20, fontFamily: 'Arial' });
const westP = new PIXI.Point(-180, 0);
westMark.anchor.set(0.5, 0.5);

app.stage.addChild(northMark, eastMark, southMark, westMark);

const date = new PIXI.Text({ text: '', fill: 0x000000, fontSize: 20, fontFamily: 'Arial' });
date.x = posX[0];
date.y = posY[0];

const section2 = new PIXI.Text({ text: "節", fill: 0x000000, fontSize: 20, fontFamily: 'Arial' });
section2.x = posX[0];
section2.y = posY[1];
const name2 = new PIXI.Text({ text: "杭番号", fill: 0x000000, fontSize: 20, fontFamily: 'Arial' });
name2.x = posX[0];
name2.y = posY[2];
const zureXX = new PIXI.Text({ text: "---", fill: 0x000000, fontSize: 20, fontFamily: 'Arial' });
zureXX.x = posX[0];
zureXX.y = posY[3];
const zureYY = new PIXI.Text({ text: "---", fill: 0x000000, fontSize: 20, fontFamily: 'Arial' });
zureYY.x = posX[0];
zureYY.y = posY[4];
app.stage.addChild(date, section2, name2, zureXX, zureYY);

updateView('{"name": "柱01", "date": "2024-12-08 12:00:00", "section": "1節", "difX": 0, "difY": -0.01}');

function updateView(newData) {
    surveyData = newData;
    _updateView();
}

function _updateView() {

    console.log("updateView");
    container.angle = angle;

    let json = JSON.parse(surveyData);
    //    context.fillStyle = json.color;
    difX = json.difX * 1000;
    difY = json.difY * 1000;
    //Rotate rotScreen = new Rotate(angle);

    let dif = Math.max(Math.abs(difX), Math.abs(difY));
    if (dif <= 12) {
        outR = 10;
        inR = 3;
        point = 0.75;
    } else {
        let n = 30 / 10;
        scaleD = 30 / n * appHeight / 500.0 * 1.1;
        outR = 10 * n;
        inR = 5;
        if (dif > 34) {
            let n2 = 50 / 10;
            scaleD = 30 / n2 * appHeight / 500.0 * 1.1;
            outR = 10 * n2;
            inR = 4;
        }
    }

    console.log("scaleD: " + scaleD, "difX: " + difX + ", difY: " + difY, "outR: " + outR, "inR: ", inR);
    /*
    * 外側の円を描画する
    */
    outerCircle.clear(); // 左上x, y, 幅、高さ
    outerCircle.circle(0, 0, outR * scaleD); // 左上x, y, 幅、高さ
    //outerCircle.pivot.x = -320;
    //outerCircle.pivot.y = -200;
    outerCircle.stroke({ color: 0xff7f26, width: 5 });
    outerCircle.fill(0xffff80);

    /*
    * 内側の円を描画する
    */
    innerCircle.clear();
    innerCircle.circle(0, 0, inR * scaleD);
    //innerCircle.pivot.x = -320;
    //innerCircle.pivot.y = -200;
    innerCircle.stroke(0x00A2E8);
    innerCircle.fill(0x80FFFF); //gc.setFill(Color.rgb(128, 255, 255));

    /*
    * 測点の赤丸を描画する
    *
    */
    redMark.x = difX * scaleD / 2;
    redMark.y = difY * scaleD / 2;

    /*
    * 円周上の「東西南北」表示
    */
    matrix = new PIXI.Matrix(Math.cos(-angle / 180 * 3.14), -Math.sin(-angle / 180 * 3.14), Math.sin(-angle / 180 * 3.14), Math.cos(-angle / 180 * 3.14), appWidth / 2, appHeight / 2); //matrix transform;
    northMark.x = matrix.apply(northP).x
    northMark.y = matrix.apply(northP).y;
    eastMark.x = matrix.apply(eastP).x;
    eastMark.y = matrix.apply(eastP).y;
    southMark.x = matrix.apply(southP).x;
    southMark.y = matrix.apply(southP).y;
    westMark.x = matrix.apply(westP).x
    westMark.y = matrix.apply(westP).y

    date.text = json.date;
    /*
     * 画面左上に点名表示
     */
    section2.text = json.section;
    // if (Command.isTsNoReply()) {
    // } else {
    name2.text = json.name;
    // }

    // 画面左端にX軸／Y軸方向ずれ量を表示する
    // int difColumnX, difColumnY;
    if (Number.isNaN(difX)) {
        name2.text = "エラー";
    } else {
        //     Point2D difColumn = rotScreen.deltaTransform(difX, difY);
        let difColumnX = Math.round(Math.cos(angle / 180 * 3.14) * difX - Math.sin(angle / 180 * 3.14) * difY);
        let difColumnY = Math.round(Math.sin(angle / 180 * 3.14) * difX + Math.cos(angle / 180 * 3.14) * difY);
        let ind = indicator(angle - north);

        //     if (Command.isTsNoReply()) {
        //     } else {
        //var f = zureXX.font;f.fill = '#FF0000';t.setStyle(f);
        zureXX.text = (difColumnX >= 0 ? ind[0] : ind[1]) + Math.abs(difColumnX);
        zureYY.text = (difColumnY >= 0 ? ind[2] : ind[3]) + Math.abs(difColumnY);
        // }

        // 画面右下に鉛直方向ずれ量を表示する
        // if (Settei2SceneController.getZEnable()) {
        //     if (difZ != 0) {
        //         gc.setFill(Color.CRIMSON);
        //     } else {
        //         gc.setFill(Color.rgb(0, 255, 0));
        //     }

        //     if (Command.isTsNoReply()) {
        //         gc.fillText("H = -", gc.getCanvas().getWidth() - 360, gc.getCanvas().getHeight() - 100); //NOI18N
        //     } else {
        //         gc.fillText(java.text.MessageFormat.format(rb.getString("H = {0}"), difZ), gc.getCanvas().getWidth() - 360, gc.getCanvas().getHeight() - 100); //NOI18N
        //     }
        // }

        // 画面右上に水平方向ずれ量を表示する
        // int distance = (int) (Math.sqrt(difX * difX + difY * difY) + 0.5);

        // if (Command.isTsNoReply()) {
        //     gc.fillText("L= -", gc.getCanvas().getWidth() - 360, 140); //NOI18N
        // } else {
        //     gc.fillText(java.text.MessageFormat.format(rb.getString("L={0}"), new Object[]{distance}), gc.getCanvas().getWidth() - 360, 140); //NOI18N
        // }

    }
}
function indicator(angle) {
    const unit = 360. / 16;
    while (angle < 0) {
        angle += 360.;
    }
    while (angle >= 360) {
        angle -= 360;
    }
    if (angle <= unit * 1) {
        return indiators[0];
    } else if (angle <= unit * 3) {
        return indiators[1];
    } else if (angle <= unit * 5) {
        return indiators[2];
    } else if (angle <= unit * 7) {
        return indiators[3];
    } else if (angle <= unit * 9) {
        return indiators[4];
    } else if (angle <= unit * 11) {
        return indiators[5];
    } else if (angle <= unit * 13) {
        return indiators[6];
    } else if (angle <= unit * 15) {
        return indiators[7];
    } else {
        return indiators[0];
    }
}

document.getElementById('kaiten').addEventListener("click", () => {
    angle = (angle + 90) % 360;
    container.angle = angle;
    _updateView();

});

document.getElementById('chousei').addEventListener("click", () => {
    if (Number(document.getElementById('txtRot').value) != 0) {
        angle = Number(document.getElementById('txtRot').value) % 360;
        container.angle = angle;
        _updateView();
    }
});

let dragging = false;

function onDragStart(e) {
    angleStart = Math.atan2(e.data.global.y - container.y, e.data.global.x - container.x) * 180 / Math.PI;
    dragging = true;
}

function onDragMove(e) {
    if (!dragging) return; // not dragging
    angleEnd = Math.atan2(e.data.global.y - container.y, e.data.global.x - container.x) * 180 / Math.PI;
    angle = angle + (angleEnd - angleStart);
    angleStart = angleEnd;
    _updateView();
};

function onDragEnd(e) {
    dragging = false;
    _updateView();
};

export { updateView };


