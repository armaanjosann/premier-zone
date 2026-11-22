package PremierZone;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Lets browser apps on other sites call the API (CORS).
// The allowed sites come from app.cors.allowed-origins in application.properties,
// which can be overridden with the CORS_ORIGINS environment variable when the API is hosted.
// Entries can be patterns, e.g. https://*.vercel.app
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${app.cors.allowed-origins}")
    private String[] allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOriginPatterns(allowedOrigins) // patterns, so "https://*.vercel.app" works
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
