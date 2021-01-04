/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kinsoku.kingsserver;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author n_otsuka
 */
@ServerEndpoint(value="/endpoint", encoders = {JsonSurveyDataEncoder.class}, decoders = {JsonSurveyDataDecoder.class})
public class KingsServer {

    private static Set<Session> peers = Collections.synchronizedSet(new HashSet<Session>());

    @OnMessage
    public void broadcastSurveyData(JsonSurveyData surveyData, Session session) throws IOException, EncodeException {
        System.out.println("broadcastSurveyData: " + surveyData);
        for (Session peer : peers) {
            if (!peer.equals(session)) {
                peer.getBasicRemote().sendObject(surveyData);
            }
        }
    }
    
    @OnClose
    public void onClose(Session peer) {
        peers.remove(peer);
    }
    
    /**
     *
     * @param peer
     */
    @OnOpen
    public void onOpen(Session peer) {
        peers.add(peer);
        
    }
    
    
}
