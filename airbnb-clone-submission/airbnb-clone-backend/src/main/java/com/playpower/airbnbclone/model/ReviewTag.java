package com.playpower.airbnbclone.model;

public class ReviewTag {

    private String emoji;
    private String label;
    private int count;

    public ReviewTag() {
    }

    public String getEmoji() {
        return emoji;
    }

    public void setEmoji(String emoji) {
        this.emoji = emoji;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
