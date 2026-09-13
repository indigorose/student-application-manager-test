package com.studentappmanager.backend.config;

import java.beans.BeanProperty;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenApiConfig {
    @BeanProperty
    public OpenAPI customOpenAPI() {
        return new OpenAPI().info(new Info()
                .title("Student Application Manager API")
                .version("1.0")
                .description("Backend API for managing students, tutors, courses and applications."
                        + "No authentication is implemented - this is a demo build."));
    }
}
