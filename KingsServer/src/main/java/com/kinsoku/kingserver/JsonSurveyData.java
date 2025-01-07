/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.kinsoku.kingserver;

/**
 *
 * @author n_otsuka
 */
public class JsonSurveyData {
    
    private String name;
    private String date;
    private String section;
    private double columnAngle;
    private double x;
    private double y;
    private double z;
    private double difX;
    private double difY;
    private double difZ;
    // surveyX, surveyY, surveyZ, difX_MM / 1000., difY_MM / 1000., difZ_MM / 1000., katamukiX, katamukiY, name, ""
    public JsonSurveyData(String name, String date, String section, double columnAngle, double x, double y, double z, double difX, double difY, double difZ) {
        this.name = name;
        this.date = date;
        this.section = section;
        this.columnAngle = columnAngle;
        this.x = x;
        this.y = y;
        this.z = z;
        this.difX = difX;
        this.difY = difY;
        this.difZ = difZ;
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

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public double getColumnAngle() {
        return columnAngle;
    }

    public void setColumnAngle(double difZ) {
        this.columnAngle = difZ;
    }

}
