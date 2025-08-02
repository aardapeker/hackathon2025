package com.aardapeker.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Hackathon2025BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(Hackathon2025BackendApplication.class, args);

	}

	/**
	 * Configures CORS to allow requests from the specified origin.
	 * This is necessary for the frontend to communicate with the backend.
	 *
	 * @return a WebMvcConfigurer that configures CORS settings
	 */
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(@NonNull CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("http://localhost", "http://localhost:5173", "https://btk-hackathon2025.netlify.app",
								"hackathon2025.aardapeker.com")
						.allowedMethods("*")
						.allowedHeaders("*")
						.allowCredentials(true);
			}
		};
	}

}
