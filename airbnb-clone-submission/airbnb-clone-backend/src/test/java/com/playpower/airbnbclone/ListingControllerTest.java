package com.playpower.airbnbclone;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ListingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getListing_returnsSeedListing() throws Exception {
        mockMvc.perform(get("/api/listings/mirashya-ug10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Romantic Jacuzzi 1BHK Candolim | Mirashya UG10"))
                .andExpect(jsonPath("$.photos.length()").value(14));
    }

    @Test
    void getListing_unknownId_returns404() throws Exception {
        mockMvc.perform(get("/api/listings/does-not-exist"))
                .andExpect(status().isNotFound());
    }

    @Test
    void getHeroPhotos_returnsOnlyFivePhotos() throws Exception {
        mockMvc.perform(get("/api/listings/mirashya-ug10/photos/hero"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(5));
    }
}
