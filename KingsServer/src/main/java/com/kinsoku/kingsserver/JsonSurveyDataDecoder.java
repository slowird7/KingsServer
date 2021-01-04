/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kinsoku.kingsserver;

import java.io.StringReader;
import javax.json.Json;
import javax.json.JsonException;
import javax.json.JsonObject;
import javax.websocket.DecodeException;
import javax.websocket.EndpointConfig;

/**
 *
 * @author otsuka
 */
    public class JsonSurveyDataDecoder implements javax.websocket.Decoder.Text<JsonSurveyData> {

        // String name, String date, String stage, double x, double y, double z, double difX, double difY, double difZ, double katamukiX, double katamukiY
        @Override
        public JsonSurveyData decode(String string) throws DecodeException {
            JsonObject jsonObject = Json.createReader(new StringReader(string)).readObject();
            JsonSurveyData surveyData = new JsonSurveyData(
                    jsonObject.getString("name")
                    ,jsonObject.getString("date")
                    ,jsonObject.getString("stage")
                    ,jsonObject.getJsonNumber("x").doubleValue()
                    ,jsonObject.getJsonNumber("y").doubleValue()
                    ,jsonObject.getJsonNumber("z").doubleValue()
                    ,jsonObject.getJsonNumber("difX").doubleValue()
                    ,jsonObject.getJsonNumber("difY").doubleValue()
                    ,jsonObject.getJsonNumber("difZ").doubleValue()
                    ,jsonObject.getJsonNumber("thX").doubleValue()
                    ,jsonObject.getJsonNumber("thY").doubleValue()
            );
            return  surveyData; //new JsonSurveyData();
        }

        @Override
        public boolean willDecode(String string) {
            try {
                JsonObject readObject = Json.createReader(new StringReader(string)).readObject();
                return true;
            } catch (JsonException ex) {
                ex.printStackTrace();
                return false;
            }
         }

        @Override
        public void init(EndpointConfig ec) {
            System.out.println("init>");
        }

        @Override
        public void destroy() {
            System.out.println("destroy");
        }

    }
    
    
