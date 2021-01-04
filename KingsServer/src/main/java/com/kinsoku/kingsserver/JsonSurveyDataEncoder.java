/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kinsoku.kingsserver;

import java.io.StringWriter;
import javax.json.Json;
import javax.json.stream.JsonGenerator;
import javax.websocket.EncodeException;
import javax.websocket.EndpointConfig;

/**
 *
 * @author n_otsuka
 */
public class JsonSurveyDataEncoder implements javax.websocket.Encoder.Text<JsonSurveyData> {

    @Override
    public String encode(JsonSurveyData surveyData) throws EncodeException {
        //Java API for JSON Processingを使ってJSONを生成
        StringWriter w = new StringWriter();
        try (JsonGenerator g = Json.createGenerator(w)) {
            g.writeStartObject()
                    .write("name", surveyData.getName())
                    .write("date", surveyData.getDate())
                    .write("stage", surveyData.getStage())
                    .write("x", surveyData.getX())
                    .write("y", surveyData.getY())
                    .write("z", surveyData.getZ())
                    .write("difX", surveyData.getDifX())
                    .write("difY", surveyData.getDifY())
                    .write("difZ", surveyData.getDifZ())
                    .write("thX", surveyData.getThX())
                    .write("thY", surveyData.getThY())
                    .writeEnd();
        }
        return w.toString();
    }

    @Override
    public void init(EndpointConfig ec) {
        System.out.println("init");
    }

    @Override
    public void destroy() {
        System.out.println("destroy");
    }

}
