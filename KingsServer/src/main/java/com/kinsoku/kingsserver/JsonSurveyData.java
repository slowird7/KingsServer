/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kinsoku.kingsserver;

import java.io.StringReader;
import java.io.StringWriter;
import javax.json.Json;
import javax.json.JsonException;
import javax.json.JsonObject;
import javax.json.stream.JsonGenerator;
import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

/**
 *
 * @author n_otsuka
 */
public class JsonSurveyData {
    
    private String name;
    private String date;
    private String stage;
    private double x;
    private double y;
    private double z;
    private double difX;
    private double difY;
    private double difZ;
    private double thX;
    private double thY;

    // surveyX, surveyY, surveyZ, difX_MM / 1000., difY_MM / 1000., difZ_MM / 1000., katamukiX, katamukiY, name, ""
    public JsonSurveyData(String name, String date, String stage, double x, double y, double z, double difX, double difY, double difZ, double katamukiX, double katamukiY) {
        this.name = name;
        this.date = date;
        this.stage = stage;
        this.x = x;
        this.y = y;
        this.z = z;
        this.difX = difX;
        this.difY = difY;
        this.difZ = difZ;
        this.thX = thX;
        this.thY = thY;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getZ() {
        return z;
    }

    public void setZ(double z) {
        this.z = z;
    }

    public double getDifX() {
        return difX;
    }

    public void setDifX(double difX) {
        this.difX = difX;
    }

    public double getDifY() {
        return difY;
    }

    public void setDifY(double difY) {
        this.difY = difY;
    }

    public double getDifZ() {
        return difZ;
    }

    public void setDifZ(double difZ) {
        this.difZ = difZ;
    }

    public double getThX() {
        return thX;
    }

    public void setThX(double thX) {
        this.thX = thX;
    }

    public double getThY() {
        return thY;
    }

    public void setThY(double thY) {
        this.thY = thY;
    }

    public String getStage() {
        return stage;
    }

    public void setStage(String stage) {
        this.stage = stage;
    }
    

    
}
