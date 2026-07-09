package com.playpower.airbnbclone.model;

import java.util.List;

public class Host {

    private String id;
    private String name;
    private String avatarUrl;
    private boolean superhost;
    private int yearsHosting;
    private int responseRatePercent;
    private String responseTime;
    private double hostRating;
    private int hostReviewCount;
    private String bornDecade;
    private String school;
    private List<CoHost> coHosts;

    public Host() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public boolean isSuperhost() {
        return superhost;
    }

    public void setSuperhost(boolean superhost) {
        this.superhost = superhost;
    }

    public int getYearsHosting() {
        return yearsHosting;
    }

    public void setYearsHosting(int yearsHosting) {
        this.yearsHosting = yearsHosting;
    }

    public int getResponseRatePercent() {
        return responseRatePercent;
    }

    public void setResponseRatePercent(int responseRatePercent) {
        this.responseRatePercent = responseRatePercent;
    }

    public String getResponseTime() {
        return responseTime;
    }

    public void setResponseTime(String responseTime) {
        this.responseTime = responseTime;
    }

    public double getHostRating() {
        return hostRating;
    }

    public void setHostRating(double hostRating) {
        this.hostRating = hostRating;
    }

    public int getHostReviewCount() {
        return hostReviewCount;
    }

    public void setHostReviewCount(int hostReviewCount) {
        this.hostReviewCount = hostReviewCount;
    }

    public String getBornDecade() {
        return bornDecade;
    }

    public void setBornDecade(String bornDecade) {
        this.bornDecade = bornDecade;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public List<CoHost> getCoHosts() {
        return coHosts;
    }

    public void setCoHosts(List<CoHost> coHosts) {
        this.coHosts = coHosts;
    }
}
