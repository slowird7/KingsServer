/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//canvas.addEventListener("click", defineImage, false);

//const canvas = document.getElementById('mycanvas');
//const renderer = new PIXI.Renderer({
//  view: canvas,
//  width: window.innerWidth,  // 追加
//  height: window.innerHeight  // 追加
//});
// Pixiアプリケーション生成
let app = new PIXI.Application({
    width: 640,     // スクリーン(ビュー)横幅 
    height: 400,    // スクリーン(ビュー)縦幅  
    backgroundColor: 0xdddddd,  // 背景色 16進 0xRRGGBB
});
// HTMLの<main id="app"></main>の中に上で作ったPIXIアプリケーション(app)のビュー(canvas)を突っ込む
let el = document.getElementById('app');
el.appendChild(app.view);

// 座標軸
var axisX = new PIXI.Graphics().lineStyle(2,0x000000).moveTo(0,200).lineTo(640,200);
app.stage.addChild(axisX);
var axisY = new PIXI.Graphics().lineStyle(2,0x000000).moveTo(320,0).lineTo(320,400);
app.stage.addChild(axisY);
var outerLimit = new PIXI.Graphics().lineStyle(2,0x000000).drawCircle(0,0,100);
outerLimit.pivot.x = -320;
outerLimit.pivot.y = -200;
app.stage.addChild(outerLimit);

// 赤丸を作る
let redMark = new PIXI.Graphics()       // メソッドチェーンで描画するので、;(セミコロン)を付けない  
.beginFill(0xff0000)                    // endFill()までの描画に対する塗りつぶし色指定
.drawCircle(0,0,10)                     // (中心のx座標, 中心のy座標, 幅, 高さ)
.endFill();                             // ここまでに描いた図形を塗りつぶす

// 基準点を設定(px) 図形(PIXI.Graphicsにはpivotはないので注意)
//redMark.setAnchor(-50,-50);
redMark.pivot.x = -320;
redMark.pivot.y = -200;
redMark.x = 0;
redMark.y = 0;
app.stage.addChild(redMark);

            

function updateView(surveyData) {
    console.log("updateView");
    var json = JSON.parse(surveyData);
//    context.fillStyle = json.color;
    name.innerHTML = "杭番号:" + json.name;
    stage.innerHTML = "工程:" + json.stage;
    redMark.x = json.difX * 1000;
    redMark.y = json.difY * 1000;
//    context.beginPath();
//    context.arc(json.difX * 1000 + 500, json.difY * 1000 + 500, 5, 0, 2 * Math.PI, false);
//    context.fill();
    
}
