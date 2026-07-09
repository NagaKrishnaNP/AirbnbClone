package com.playpower.airbnbclone.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.playpower.airbnbclone.exception.ListingNotFoundException;
import com.playpower.airbnbclone.model.Listing;
import com.playpower.airbnbclone.model.Photo;
import com.playpower.airbnbclone.model.Review;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Loads listing data from the bundled data/listings.json file at startup and
 * serves it from memory. Swap this out for a real repository/database layer
 * (see the architecture diagram) when moving beyond a take-home assignment.
 */
@Service
public class ListingService {

    private final Map<String, Listing> listingsById = new LinkedHashMap<>();

    @PostConstruct
    public void loadData() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        try (InputStream is = new ClassPathResource("data/listings.json").getInputStream()) {
            List<Listing> listings = mapper.readValue(is, mapper.getTypeFactory()
                    .constructCollectionType(List.class, Listing.class));
            for (Listing listing : listings) {
                listingsById.put(listing.getId(), listing);
            }
        }
    }

    public List<Listing> getAllListings() {
        return List.copyOf(listingsById.values());
    }

    public Listing getListing(String id) {
        Listing listing = listingsById.get(id);
        if (listing == null) {
            throw new ListingNotFoundException(id);
        }
        return listing;
    }

    public List<Photo> getPhotos(String id) {
        return getListing(id).getPhotos().stream()
                .sorted(Comparator.comparingInt(Photo::getOrder))
                .collect(Collectors.toList());
    }

    public List<Photo> getHeroPhotos(String id) {
        return getPhotos(id).stream()
                .filter(Photo::isHero)
                .collect(Collectors.toList());
    }

    public List<Review> getReviews(String id) {
        return getListing(id).getReviews();
    }
}
