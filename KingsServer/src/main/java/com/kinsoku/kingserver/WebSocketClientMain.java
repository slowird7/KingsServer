package com.kinsoku.kingserver;

import org.glassfish.tyrus.spi.ClientContainer;

import javax.websocket.*;
import java.net.URI;

/**
 * Websocket Endpoint implementation class WebSocketClientMain
 */

@ClientEndpoint

public class WebSocketClientMain {

	static public void main(String[] args) throws Exception {

		System.err.println(ClientContainer.class.getName());

		// 初期化のため WebSocket コンテナのオブジェクトを取得する
		WebSocketContainer container = ContainerProvider.getWebSocketContainer();
		// サーバー・エンドポイントの URI
		URI uri = URI.create("ws://localhost:8080/kingserver/endpoint");
		// サーバー・エンドポイントとのセッションを確立する
		Session session = container.connectToServer(new WebSocketClientMain(), uri);

		session.getBasicRemote().sendText("こんにちは");

		while (session.isOpen()) {
			Thread.sleep(100 * 1000);
			System.err.println("open");
		}

	}

	public WebSocketClientMain() {
		super();
	}

	@OnClose
	public void onClose(Session session) {
		/* セッション解放時の処理 */
	}

	@OnError
	public void onError(Throwable th) {
		System.err.println(th);
	}

	@OnMessage
	public void onMessage(String message) {
		/* メッセージ受信時の処理 */
		System.err.println("[受信]:" + message);
	}

	@OnOpen
	public void onOpen(Session session) {
		/* セッション確立時の処理 */
		System.err.println("[セッション確立]");
	}

}
