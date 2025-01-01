<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>建方キングモニタ</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <!--script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/8.0.0/pixi.js"></script-->
        <script src="https://pixijs.download/release/pixi.js"></script>
    </head>
    <body>
        <h1>建方キングモニタ</h1>
        <!-- %=new java.util.Date()%><br -->
        <namey id="name"></namey>
        <name id="date"></name>
        <name id="section"></name>
        <name id="selMeasureMode"></name>
        <main id="appSpace">
        </main>
        <script type="text/javascript">
            const app = new PIXI.Application();
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
            let gc = new PIXI.GraphicsContext();

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
        </script>
        <script type="module" src="monitor.js">
        </script>

        <button type="button" id="teishi">計測開始</button>
        <button type="button" id="kaiten">回転</button>
        <button type="button" id="chousei">調整</button>
        <input type="text" id="txtRot"/>
        <br>
        <name id="output"></name>
        <script type="text/javascript" src="Websocket.js"></script>
        <script type="text/javascript" src="monitor.js"></script>
    </body>
</html>
