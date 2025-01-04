package com.kinsoku.kingserver;

import jakarta.websocket.server.ServerEndpointConfig;
import org.eclipse.jetty.ee10.servlet.DefaultServlet;
import org.eclipse.jetty.ee10.servlet.ServletContextHandler;
import org.eclipse.jetty.ee10.servlet.ServletHolder;
import org.eclipse.jetty.ee10.websocket.jakarta.server.config.JakartaWebSocketServletContainerInitializer;
import org.eclipse.jetty.server.Server;

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
        Server server = new Server(port);

        ServletContextHandler servletContextHandler = new ServletContextHandler(ServletContextHandler.SESSIONS);
        servletContextHandler.setContextPath("/");
        server.setHandler(servletContextHandler);

        // Add javax.websocket support
        JakartaWebSocketServletContainerInitializer.configure(servletContextHandler, (context, container) ->
        {
            // Add echo endpoint to server container
            ServerEndpointConfig config = ServerEndpointConfig.Builder.create(WebsocketEndpoint.class, "/kingserver/endpoint").build();
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
