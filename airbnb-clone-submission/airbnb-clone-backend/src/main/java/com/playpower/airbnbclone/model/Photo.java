package com.playpower.airbnbclone.model;

public class Photo {

    private String id;
    private String url;
    private String room;       // e.g. "Living room 1", "Full Kitchen"
    private String caption;    // e.g. "Sofa, Air conditioning, Ceiling fan, TV"
    private int order;
    private boolean isHero;    // used in the 5-photo hero grid on the listing page

    public Photo() {
    }

    public Photo(String id, String url, String room, String caption, int order, boolean isHero) {
        this.id = id;
        this.url = url;
        this.room = room;
        this.caption = caption;
        this.order = order;
        this.isHero = isHero;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public boolean isHero() {
        return isHero;
    }

    public void setHero(boolean hero) {
        isHero = hero;
    }
}
