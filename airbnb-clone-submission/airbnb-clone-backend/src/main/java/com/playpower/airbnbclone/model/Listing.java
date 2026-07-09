package com.playpower.airbnbclone.model;

import java.util.List;

public class Listing {

    private String id;
    private String title;              // "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10"
    private String propertyType;        // "Entire serviced apartment"
    private String city;
    private String country;
    private int guests;
    private int bedrooms;
    private int beds;
    private int bathrooms;
    private double rating;
    private int reviewCount;
    private boolean isRare;             // e.g. "Rare find" badge
    private double pricePerNight;
    private String currency;
    private double totalPrice;
    private int nights;
    private String checkInDate;
    private String checkOutDate;
    private String cancellationDeadline;
    private int defaultGuestSelection;
    private double discountPercent;     // "Get 10% off your next stay"
    private String description;
    private List<String> amenities;
    private List<String> houseRules;
    private String cancellationPolicy;
    private Host host;
    private List<Photo> photos;
    private List<Review> reviews;
    private String neighbourhoodHighlights;
    private List<RoomSummary> sleepingArrangements;
    private List<AmenityItem> amenityItems;
    private RatingBreakdown ratingBreakdown;
    private List<ReviewTag> reviewTags;
    private List<String> safetyItems;
    private List<NearbyListing> nearbyListings;

    public Listing() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPropertyType() {
        return propertyType;
    }

    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public int getGuests() {
        return guests;
    }

    public void setGuests(int guests) {
        this.guests = guests;
    }

    public int getBedrooms() {
        return bedrooms;
    }

    public void setBedrooms(int bedrooms) {
        this.bedrooms = bedrooms;
    }

    public int getBeds() {
        return beds;
    }

    public void setBeds(int beds) {
        this.beds = beds;
    }

    public int getBathrooms() {
        return bathrooms;
    }

    public void setBathrooms(int bathrooms) {
        this.bathrooms = bathrooms;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public int getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(int reviewCount) {
        this.reviewCount = reviewCount;
    }

    public boolean isRare() {
        return isRare;
    }

    public void setRare(boolean rare) {
        isRare = rare;
    }

    public double getPricePerNight() {
        return pricePerNight;
    }

    public void setPricePerNight(double pricePerNight) {
        this.pricePerNight = pricePerNight;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public int getNights() {
        return nights;
    }

    public void setNights(int nights) {
        this.nights = nights;
    }

    public String getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(String checkInDate) {
        this.checkInDate = checkInDate;
    }

    public String getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(String checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public String getCancellationDeadline() {
        return cancellationDeadline;
    }

    public void setCancellationDeadline(String cancellationDeadline) {
        this.cancellationDeadline = cancellationDeadline;
    }

    public int getDefaultGuestSelection() {
        return defaultGuestSelection;
    }

    public void setDefaultGuestSelection(int defaultGuestSelection) {
        this.defaultGuestSelection = defaultGuestSelection;
    }

    public double getDiscountPercent() {
        return discountPercent;
    }

    public void setDiscountPercent(double discountPercent) {
        this.discountPercent = discountPercent;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getAmenities() {
        return amenities;
    }

    public void setAmenities(List<String> amenities) {
        this.amenities = amenities;
    }

    public List<String> getHouseRules() {
        return houseRules;
    }

    public void setHouseRules(List<String> houseRules) {
        this.houseRules = houseRules;
    }

    public String getCancellationPolicy() {
        return cancellationPolicy;
    }

    public void setCancellationPolicy(String cancellationPolicy) {
        this.cancellationPolicy = cancellationPolicy;
    }

    public Host getHost() {
        return host;
    }

    public void setHost(Host host) {
        this.host = host;
    }

    public List<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(List<Photo> photos) {
        this.photos = photos;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public String getNeighbourhoodHighlights() {
        return neighbourhoodHighlights;
    }

    public void setNeighbourhoodHighlights(String neighbourhoodHighlights) {
        this.neighbourhoodHighlights = neighbourhoodHighlights;
    }

    public List<RoomSummary> getSleepingArrangements() {
        return sleepingArrangements;
    }

    public void setSleepingArrangements(List<RoomSummary> sleepingArrangements) {
        this.sleepingArrangements = sleepingArrangements;
    }

    public List<AmenityItem> getAmenityItems() {
        return amenityItems;
    }

    public void setAmenityItems(List<AmenityItem> amenityItems) {
        this.amenityItems = amenityItems;
    }

    public RatingBreakdown getRatingBreakdown() {
        return ratingBreakdown;
    }

    public void setRatingBreakdown(RatingBreakdown ratingBreakdown) {
        this.ratingBreakdown = ratingBreakdown;
    }

    public List<ReviewTag> getReviewTags() {
        return reviewTags;
    }

    public void setReviewTags(List<ReviewTag> reviewTags) {
        this.reviewTags = reviewTags;
    }

    public List<String> getSafetyItems() {
        return safetyItems;
    }

    public void setSafetyItems(List<String> safetyItems) {
        this.safetyItems = safetyItems;
    }

    public List<NearbyListing> getNearbyListings() {
        return nearbyListings;
    }

    public void setNearbyListings(List<NearbyListing> nearbyListings) {
        this.nearbyListings = nearbyListings;
    }
}
