package maile.com.example.mailer.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import io.github.cdimascio.dotenv.Dotenv;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class DotenvConfig implements ApplicationContextInitializer<ConfigurableApplicationContext> {

    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        try {
            Dotenv dotenv = Dotenv.configure()
                    .directory("./")  
                    .ignoreIfMissing()
                    .load();
            
            Map<String, Object> dotenvMap = new HashMap<>();
            dotenv.entries().forEach(entry -> {
                dotenvMap.put(entry.getKey(), entry.getValue());
            });
            
            ConfigurableEnvironment environment = applicationContext.getEnvironment();
            environment.getPropertySources()
                    .addFirst(new MapPropertySource("dotenv", dotenvMap));  
            
            log.info("Loaded .env file successfully");
            
            log.debug("DB_URL: {}", dotenv.get("DB_URL", "NOT SET"));
            log.debug("RESEND_FROM_EMAIL: {}", dotenv.get("RESEND_FROM_EMAIL", "NOT SET"));
            log.debug("RESEND_API_KEY: {}", dotenv.get("RESEND_API_KEY") != null ? "***SET***" : "NOT SET");
            
        } catch (Exception e) {
            log.warn("Could not load .env file: {}", e.getMessage());
        }
    }
}
