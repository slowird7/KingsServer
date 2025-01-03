package com.kinsoku.kingserver;

import org.eclipse.jetty.server.*;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.util.ssl.SslContextFactory;

public class JettyServer {

    public void start() {

    }
    public static void main(String[] args) throws Exception {
        final Server server = new Server();
        final SslContextFactory sslContextFactory = new SslContextFactory();
        sslContextFactory.setKeyStorePath(System.getProperty("user.dir") + "/KingsServer/mykeystore.jks");
        sslContextFactory.setKeyStorePassword("mypassword");
        final ServerConnector httpsConnector = new ServerConnector(server, sslContextFactory);
//        final ServerConnector httpsConnector = new ServerConnector(server);
        httpsConnector.setPort(443);
        final ResourceHandler resourceHandler = new ResourceHandler();
//        resourceHandler.setResourceBase(System.getProperty("user.dir") + "/htdocs");
        resourceHandler.setResourceBase(System.getProperty("user.dir") +"/KingsServer/src/webapp");
        server.setConnectors(new Connector[] { httpsConnector });
        server.setHandler(resourceHandler);
        server.start();
        server.join();
    }
}
