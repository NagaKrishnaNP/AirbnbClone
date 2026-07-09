package com.playpower.airbnbclone.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Comma-separated list of allowed origins. Defaults to the local Angular
     * dev server. In production (e.g. on Render), set the
     * APP_CORS_ALLOWED_ORIGINS environment variable to your deployed
     * frontend's actual URL, e.g. https://airbnb-clone-frontend.onrender.com
     */
    @Value("${app.cors.allowed-origins:http://localhost:4200}")
    private String allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(allowedOrigins.split("\\s*,\\s*"))
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}
