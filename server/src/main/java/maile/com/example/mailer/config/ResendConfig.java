package maile.com.example.mailer.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Component
@ConfigurationProperties(prefix = "resend")
@Data
@Slf4j
public class ResendConfig {
    
    private String apiKey;
    private String fromEmail;
    private String fromName;
    private String replyToEmail;
    private String customDomain;
    
    @PostConstruct
    public void logConfig() {
        log.info("Resend Config loaded:");
        log.info("  API Key: {}", apiKey != null && !apiKey.isEmpty() ? "***SET***" : "NOT SET");
        log.info("  From Email: {}", fromEmail);
        log.info("  From Name: {}", fromName);
        log.info("  Reply To: {}", replyToEmail);
        log.info("  Custom Domain: {}", customDomain);
        log.info("  Has Valid Config: {}", hasValidFallbackConfig());
    }
    
    public boolean hasValidFallbackConfig() {
        return apiKey != null && !apiKey.isEmpty() && 
               fromEmail != null && !fromEmail.isEmpty();
    }
}
