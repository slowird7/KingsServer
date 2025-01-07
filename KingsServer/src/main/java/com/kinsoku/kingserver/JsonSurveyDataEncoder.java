/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kinsoku.kingserver;

import javax.json.Json;
import javax.json.stream.JsonGenerator;
import jakarta.websocket.EncodeException;
import jakarta.websocket.EndpointConfig;
import java.io.StringWriter;

/**
 *
 * @author n_otsuka
 */
public class JsonSurveyDataEncoder implements jakarta.websocket.Encoder.Text<JsonSurveyData> {

    @Override
    public void init(EndpointConfig ec) {
        System.out.println("JsonSurveyDataEncoder> init");
    }

    @Override
    public String encode(JsonSurveyData surveyData) throws EncodeException {
        //Java API for JSON Processingを使ってJSONを生成
        StringWriter w = new StringWriter();
        try (JsonGenerator g = Json.createGenerator(w)) {
            g.writeStartObject()
                    .write("name", surveyData.getName())
                    .write("date", surveyData.getDate())
                    .write("section", surveyData.getSection())
                    .write("columnAngle", surveyData.getColumnAngle())
                    .write("x", surveyData.getX())
                    .write("y", surveyData.getY())
                    .write("z", surveyData.getZ())
                    .write("difX", surveyData.getDifX())
                    .write("difY", surveyData.getDifY())
                    .write("difZ", surveyData.getDifZ())
                    .writeEnd();
        }
        return w.toString();
    }


    @Override
    public void destroy() {
        System.out.println("JsonSurveyDataEncoder> destroy");
    }

}
