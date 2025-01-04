package com.kinsoku.kingserver;

import jakarta.websocket.server.ServerEndpointConfig;
import org.eclipse.jetty.ee10.servlet.DefaultServlet;
import org.eclipse.jetty.ee10.servlet.ServletContextHandler;
import org.eclipse.jetty.ee10.servlet.ServletHolder;
import org.eclipse.jetty.ee10.websocket.jakarta.server.config.JakartaWebSocketServletContainerInitializer;
import org.eclipse.jetty.server.*;
import org.eclipse.jetty.util.ssl.SslContextFactory;

import java.net.URL;
import java.time.Duration;
import java.util.Objects;

import java.net.URL;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

public class JettyServer {

    public static void main(String[] args) throws Exception
    {
        Server server = JettyServer.newServer(8080);
        server.start();
        server.join();
    }

    /**
     * copied from jetty-examples/.../ee10-websocket-jakarta-api/src/main/java/examples/annotated/EchoServer
     * @param port
     * @return
     */
    public static Server newServer(int port)
    {
        int httpPort = 8080;
        int httpsPort = 8443;

        Server server = new Server(port);

        ServletContextHandler servletContextHandler = new ServletContextHandler(ServletContextHandler.SESSIONS);
        servletContextHandler.setContextPath("/kingserver");
        server.setHandler(servletContextHandler);

        // following code is from jetty-examples/embedded/ee10-servlet-security/.../ServletTransportGuaranteeExample
        SslContextFactory.Server sslContextFactory = new SslContextFactory.Server();
        // オレオレ認証証明書の作り方は https://qiita.com/riversun/items/2909019123b28471ea79
        /* keytool -genkey -dname "cn=localhost, ou=Example div., o=Example Inc., l=Minato-ku, st=Tokyo, c=JP" -alias jetty -keystore mykeystore.jks -storepass mypassword -keypass mypassword -keyalg RSA -keysize 2048 -sigalg SHA256withRSA -validity 3650 -ext SAN=dns:192.168.11.8
        */
        sslContextFactory.setKeyStorePath(System.getProperty("user.dir") + "/KingsServer/mykeystore.jks");
        sslContextFactory.setKeyStorePassword("mypassword");

        // Setup HTTPS Configuration
        HttpConfiguration httpsConf = new HttpConfiguration();
        httpsConf.setSecurePort(httpsPort);
        httpsConf.setSecureScheme("https");
        httpsConf.addCustomizer(new SecureRequestCustomizer()); // adds ssl info to request object

        // Establish the HTTPS ServerConnector
        ServerConnector httpsConnector = new ServerConnector(server,
                new SslConnectionFactory(sslContextFactory, "http/1.1"),
                new HttpConnectionFactory(httpsConf));
        httpsConnector.setPort(httpsPort);

        server.addConnector(httpsConnector);


        // Add javax.websocket support
        JakartaWebSocketServletContainerInitializer.configure(servletContextHandler, (context, container) ->
        {
            // Add websocket endpoint to server container
            ServerEndpointConfig config = ServerEndpointConfig.Builder.create(WebsocketEndpoint.class, "/endpoint").build();
            container.setDefaultMaxSessionIdleTimeout(10*60*1000);  // 10 minutes
            container.addEndpoint(config);
        });

        // Add default servlet (to serve the html/css/js)
        // Figure out where the static files are stored.
        URL urlStatics = Thread.currentThread().getContextClassLoader().getResource("webapp/index.html");
        Objects.requireNonNull(urlStatics, "Unable to find index.html in classpath");
        String urlBase = urlStatics.toExternalForm().replaceFirst("/[^/]*$", "/");
        ServletHolder defHolder = new ServletHolder("default", new DefaultServlet());
        defHolder.setInitParameter("resourceBase", urlBase);
        defHolder.setInitParameter("dirAllowed", "true");
        servletContextHandler.addServlet(defHolder, "/");

        return server;
    }
}
