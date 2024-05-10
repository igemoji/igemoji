package com.ssafy.igemoji;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableJpaAuditing
@SpringBootApplication
@OpenAPIDefinition(
        servers = {
                @Server(url="https://back.igemoji.store", description="Default Server url")
        }
)
public class IgemojiApplication {

    public static void main(String[] args) {
        SpringApplication.run(IgemojiApplication.class, args);
    }

}