package com.playpower.airbnbclone.controller;

import com.playpower.airbnbclone.model.Listing;
import com.playpower.airbnbclone.model.Photo;
import com.playpower.airbnbclone.model.Review;
import com.playpower.airbnbclone.service.ListingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/listings")
public class ListingController {

    private final ListingService listingService;

    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    @GetMapping
    public ResponseEntity<List<Listing>> getAllListings() {
        return ResponseEntity.ok(listingService.getAllListings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Listing> getListing(@PathVariable String id) {
        return ResponseEntity.ok(listingService.getListing(id));
    }

    @GetMapping("/{id}/photos")
    public ResponseEntity<List<Photo>> getPhotos(@PathVariable String id) {
        return ResponseEntity.ok(listingService.getPhotos(id));
    }

    @GetMapping("/{id}/photos/hero")
    public ResponseEntity<List<Photo>> getHeroPhotos(@PathVariable String id) {
        return ResponseEntity.ok(listingService.getHeroPhotos(id));
    }

    @GetMapping("/{id}/reviews")
    public ResponseEntity<List<Review>> getReviews(@PathVariable String id) {
        return ResponseEntity.ok(listingService.getReviews(id));
    }
}
