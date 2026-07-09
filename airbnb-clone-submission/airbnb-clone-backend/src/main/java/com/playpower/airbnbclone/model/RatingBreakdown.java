package com.playpower.airbnbclone.model;

import java.util.List;

public class RatingBreakdown {

    private double cleanliness;
    private double accuracy;
    private double checkIn;
    private double communication;
    private double location;
    private double value;
    /** Percentage of reviews at 5,4,3,2,1 stars, in that order (sums to ~100). */
    private List<Integer> starDistribution;

    public RatingBreakdown() {
    }

    public double getCleanliness() {
        return cleanliness;
    }

    public void setCleanliness(double cleanliness) {
        this.cleanliness = cleanliness;
    }

    public double getAccuracy() {
        return accuracy;
    }

    public void setAccuracy(double accuracy) {
        this.accuracy = accuracy;
    }

    public double getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(double checkIn) {
        this.checkIn = checkIn;
    }

    public double getCommunication() {
        return communication;
    }

    public void setCommunication(double communication) {
        this.communication = communication;
    }

    public double getLocation() {
        return location;
    }

    public void setLocation(double location) {
        this.location = location;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public List<Integer> getStarDistribution() {
        return starDistribution;
    }

    public void setStarDistribution(List<Integer> starDistribution) {
        this.starDistribution = starDistribution;
    }
}
