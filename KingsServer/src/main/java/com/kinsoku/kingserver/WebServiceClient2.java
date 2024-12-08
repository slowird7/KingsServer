package com.kinsoku.kingserver;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.java_websocket.handshake.ServerHandshake;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import javax.websocket.ClientEndpoint;

import static java.lang.Thread.sleep;

@ClientEndpoint
public class WebServiceClient2 {

    public final static WebServiceClient2 INSTANCE = new WebServiceClient2();
//    private final static Logger LOGGER = LogManager.getLogger(WebServiceClient2.class);
    ExecutorService executor;
    Gson gson = new GsonBuilder().create();
    org.java_websocket.client.WebSocketClient client;

    public static WebServiceClient2 getInstance() {
        return INSTANCE;
    }

    public void open(URI uri) throws URISyntaxException {
//        LOGGER.info("open>");
        client = new org.java_websocket.client.WebSocketClient(uri) {
            @Override
            public void onOpen(ServerHandshake handshakedata) {
//                LOGGER.info("clientonOpen> established WebSocket connection.");
            }

            @Override
            public void onMessage(String message) {
//                LOGGER.info("client.onMessage> received [" + message + "]");
                // 受信メッセージをJSONパースする
                Gson gson = new GsonBuilder().create();
                // JSONデータをパースするためのクラス
                JsonSurveyData data = gson.fromJson(message, JsonSurveyData.class);
                System.out.println("パース結果: " + data);
            }

            @Override
            public void onClose(int code, String reason, boolean remote) {
//                LOGGER.info("client.onClose> closed WebSocket connection.");
            }

            @Override
            public void onError(Exception ex) {
//                LOGGER.warn("client.onError> WebSocket error.", ex);
            }
        };

        // WebSocketクライアントを実行するためのExecutorServiceを作成
        executor = Executors.newSingleThreadExecutor();
        executor.execute(client);
        try {
            sleep(5000);
        } catch (InterruptedException e) {
            // do nothing.
        }
    }

    public void close() {
        client.close();
        executor.shutdown();
        try {
            executor.awaitTermination(1, java.util.concurrent.TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public void send(JsonSurveyData jsonSurveyData) {
        String json = gson.toJson(jsonSurveyData);
        client.send(json);
    }

/*
    public static void main(String[] args) throws URISyntaxException {
        // WebSocketサーバーのURI
        URI uri = new URI("ws://localhost:8080/kingserver/endpoint");

        // WebSocketクライアントのインスタンスを作成
        org.java_websocket.client.WebSocketClient client = new org.java_websocket.client.WebSocketClient(uri) {
            @Override
            public void onOpen(ServerHandshake handshakedata) {
                System.out.println("WebSocket接続が確立しました");
            }

            @Override
            public void onMessage(String message) {
                System.out.println("受信メッセージ: " + message);
                // 受信メッセージをJSONパースする
                Gson gson = new GsonBuilder().create();
                // JSONデータをパースするためのクラス
                JsonSurveyData data = gson.fromJson(message, JsonSurveyData.class);
                System.out.println("パース結果: " + data);
            }

            @Override
            public void onClose(int code, String reason, boolean remote) {
                System.out.println("WebSocket接続が閉じられました");
            }

            @Override
            public void onError(Exception ex) {
                System.out.println("WebSocketエラーが発生しました");
            }
        };

        // WebSocketクライアントを実行するためのExecutorServiceを作成
        ExecutorService executor = Executors.newSingleThreadExecutor();
        executor.execute(client);
        try {
            sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        // JSONデータを送信する
        Gson gson = new GsonBuilder().create();
        JsonSurveyData data = new JsonSurveyData("pile1", "2024-12-02", "initial", 10., 20.,0.,2, 3, 0, 100, 200);
        String json = gson.toJson(data);
        client.send(json);
        executor.shutdown();
        try {
            executor.awaitTermination(1, java.util.concurrent.TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

 */
}
