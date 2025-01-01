//import { Application, Graphics } from '/pixi.js';
const appWidth = 640;
const appHeight = 640;
const app = new PIXI.Application();
await app.init({ width: appWidth, height: appWidth, backgroundColor: 0xdddddd });
const cx = app.canvas.width / 2.0;
const cy = app.canvas.height / 2.0;
const container = new PIXI.Container();
container.pivot.x = cx;
container.pivot.y = cy;
app.stage.addChild(container);
document.getElementById('appSpace').appendChild(app.canvas);;

const FONTSIZE = 70;
const FONTOFFSET = FONTSIZE / 2;
const compass = ("北", "東", "南", "西");
const indiators = (
    ( "西←", "東→", "北↑", "南↓" ),
    ( "南西←", "北東→", "北西↑", "南東↓" ),
    ( "南←", "北→", "西↑", "東↓" ),
    ( "南東←", "北西→", "南西↑", "北東↓" ),
    ( "東←", "西→", "南↑", "北↓" ),
    ( "北東←", "南西→", "南東↑", "北西↓" ),
    ( "北←", "南→", "東↑", "西↓" ),
    ( "北西←", "南東→", "北東↑", "南西↓" ));

    // 各種アイテムの表示位置
const posX = (30, 260);
const posY = (130, 200, 270, 340, 410);


let fMX = 0; // マウス用
let fMY = 0;
let sMX = 0;
let sMY = 0;
// ずれ
let difX = 0;
let difY = 0;
let difZ = 0;
// 実測
let mz = 0;
let scale = 30.0;
let selection = true;
let name = document.getElementById('name');
let angle = 0.;
let north = 0;
let rot = document.getElementById('txtRot');
let selMeasureMode = document.getElementById('selMeasureMode');
let section = document.getElementById('section');
// Create the application helper and add its render target to the page

let date = document.getElementById('date');

let scaleD = scale;
let outR = 10; // 外円の半径
let inR = 5; // 内円の半径
let point = 0.75; // 赤丸

/*
* 外側の円を描画する
*/
let outerCircle = new PIXI.Graphics().circle(0, 0, outR * scaleD); // 左上x, y, 幅、高さ
outerCircle.stroke({color: 0xff7f26, width: 5});
outerCircle.fill(0xffff80);
//outerCircle.pivot.x = -320;
//outerCircle.pivot.y = -200;
container.addChild(outerCircle);

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
axis.moveTo(-appWidth, 0).lineTo(appWidth,0);
axis.moveTo(0, -appHeight).lineTo(0, appHeight);
axis.stroke({color: 0x000000, width: 2});
container.addChild(axis);

// 赤丸を作る
let redMark = new PIXI.Graphics().circle(0,0,10).fill(0xff0000);
//redMark.pivot.x = -320;
//redMark.pivot.y = -200;
//redMark.x = 0;
//redMark.y = 0;
container.addChild(redMark);

//updateView('{"name": "柱01", "date": "2024-12-08 12:00:00", "section": "1節", "difX": 0, "difY": 0}');

function updateView(surveyData) {
    console.log("updateView");

    let json = JSON.parse(surveyData);
//    context.fillStyle = json.color;
    difX = json.difX;
    difY = json.difY;
    name.innerHTML = "杭番号:" + json.name;
    section.innerHTML = "工程:" + json.section;
    date.innerHTML = "日付:" + json.date;
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

    /*
    * 外側の円を描画する
    */
    outerCircle.clear(); // 左上x, y, 幅、高さ
    outerCircle.circle(0, 0, outR * scaleD); // 左上x, y, 幅、高さ
    //outerCircle.pivot.x = -320;
    //outerCircle.pivot.y = -200;
    outerCircle.stroke({color: 0xff7f26, width: 5});
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
    redMark.x = difX * 1000;
    redMark.y = difY * 1000;

  //  gc.setLineDashes(0);
    //gc.setLineWidth(2);

    // let p = rotScreen.transform(difX * scaleD / 2, difY * scaleD / 2);
    // gc.fillOval(cx + p.getX() - (point * scale) / 2, cy + p.getY() - (point * scale) / 2, point * scale, point * scale);
    // gc.setStroke(Color.rgb(0, 0, 0));
    // gc.setLineWidth(0.5);

    // gc.strokeRect(cx - outR * scaleD / 2 - 10, cy - outR * scaleD / 2 - 10, outR * scaleD + 20, outR * scaleD + 20);
    // gc.strokeLine(cx, 0, cx, gc.getCanvas().getHeight());
    // gc.strokeLine(0, cy, gc.getCanvas().getWidth(), cy);
    

    /*
     * 円周上の「東西南北」表示
     */
    // gc.setFill(Color.rgb(0, 0, 0));
    // gc.setFont(new Font(FONTSIZE));
    // Point2D p;
    // p = rotCompass.transform(0, -outR * scaleD / 2 - FONTOFFSET);
    // gc.fillText(compass[0], cx + p.getX() - FONTOFFSET, cy + p.getY() + FONTOFFSET);
    // p = rotCompass.transform(-outR * scaleD / 2 + outR * scaleD + FONTOFFSET, 0);
    // gc.fillText(compass[1], cx + p.getX() - FONTOFFSET, cy + p.getY() + FONTOFFSET);
    // p = rotCompass.transform(0, -outR * scaleD / 2 + outR * scaleD + FONTOFFSET);
    // gc.fillText(compass[2], cx + p.getX() - FONTOFFSET, cy + p.getY() + FONTOFFSET);
    // p = rotCompass.transform(-outR * scaleD / 2 - FONTOFFSET, 0);
    // gc.fillText(compass[3], cx + p.getX() - FONTOFFSET, cy + p.getY() + FONTOFFSET);

    /*
     * 画面左上に点名表示
     */
    // if (Command.isTsNoReply()) {
    //     gc.fillText(java.text.MessageFormat.format(
    //                     rb.getString("点名 : 観測エラー"), name),
    //             posX[0], posY[0]);
    // } else {
    //     gc.fillText(java.text.MessageFormat.format(
    //                     rb.getString("点名 : {0}"), name),
    //             posX[0], posY[0]);
    // }

    // 画面左端にX軸／Y軸方向ずれ量を表示する
    // int difColumnX, difColumnY;
    // if (difX == Integer.MAX_VALUE) {
    //     gc.setFill(Color.rgb(255, 0, 0));
    //     gc.fillText(rb.getString("エラー"), posX[0], posY[1]);
    // } else {
    //     Point2D difColumn = rotScreen.deltaTransform(difX, difY);
    //     difColumnX = (int) Math.round(difColumn.getX());
    //     difColumnY = (int) Math.round(difColumn.getY());
    //     String[] ind = indicator(angle - north);

    //     if (Command.isTsNoReply()) {
    //         gc.fillText(difColumnX >= 0 ? ind[0] : ind[1], posX[0], posY[1]);
    //         gc.fillText("-", posX[1], posY[1]); //NOI18N

    //         gc.fillText(difColumnY >= 0 ? ind[2] : ind[3], posX[0], posY[2]);
    //         gc.fillText("-", posX[1], posY[2]); //NOI18N
    //     } else {
    //         gc.setFill(difColumnX == 0 ? Color.rgb(0, 255, 0) : Color.rgb(255, 0, 0));
    //         gc.fillText(difColumnX >= 0 ? ind[0] : ind[1], posX[0], posY[1]);
    //         gc.fillText(java.text.MessageFormat.format(
    //                 rb.getString("{0}"),
    //                 Math.abs(difColumnX)), posX[1], posY[1]); //NOI18N

    //         gc.setFill(difColumnY == 0 ? Color.rgb(0, 255, 0) : Color.rgb(255, 0, 0));
    //         gc.fillText(difColumnY >= 0 ? ind[2] : ind[3], posX[0], posY[2]);
    //         gc.fillText(java.text.MessageFormat.format(
    //                 rb.getString("{0}"),
    //                 Math.abs(difColumnY)), posX[1], posY[2]); //NOI18N
    //     }
    // }
    //画面左端にカメラトラッキング座標を表示する
    //gc.setFill(Color.rgb(0, 0, 0));
    //gc.fillText(String.format(rb.getString("カメラX:"),camX), posX[0], posY[3]);
    //gc.fillText(String.format(rb.getString("カメラY:"),camY), posX[0], posY[4]);

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

//    context.beginPath();
//    context.arc(json.difX * 1000 + 500, json.difY * 1000 + 500, 5, 0, 2 * Math.PI, false);
//    context.fill();
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
});

export { updateView };


