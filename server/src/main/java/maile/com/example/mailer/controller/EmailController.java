package maile.com.example.mailer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import maile.com.example.mailer.dto.SendEmailRequest;
import maile.com.example.mailer.dto.SendEmailResponse;
import maile.com.example.mailer.service.ResendEmailService;

@RestController
@RequestMapping("/api/emails")
@Slf4j
public class EmailController extends BaseController {
    
    private final ResendEmailService resendEmailService;
    
    public EmailController(ResendEmailService resendEmailService) {
        this.resendEmailService = resendEmailService;
    }
    
    @PostMapping("/send")
    public ResponseEntity<SendEmailResponse> sendEmail(@Valid @RequestBody SendEmailRequest request) {
        try {
            Long userId = getCurrentUserId();
            log.info("Wysyłanie email dla użytkownika: {}", userId);
            
            SendEmailResponse response = resendEmailService.sendEmail(request, userId);
            
            if ("success".equals(response.getStatus())) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest().body(response);
            }
            
        } catch (Exception e) {
            log.error("Błąd podczas wysyłania email: ", e);
            return ResponseEntity.internalServerError()
                    .body(SendEmailResponse.error("Wewnętrzny błąd serwera"));
        }
    }
    
    @GetMapping("/configuration/validate")
    public ResponseEntity<ConfigurationValidationResponse> validateConfiguration() {
        try {
            Long userId = getCurrentUserId();
            boolean isValid = resendEmailService.validateResendConfiguration(userId);
            
            ConfigurationValidationResponse response = ConfigurationValidationResponse.builder()
                    .isValid(isValid)
                    .message(isValid ? "Konfiguracja Resend jest poprawna" : "Konfiguracja Resend wymaga uzupełnienia")
                    .build();
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Błąd podczas walidacji konfiguracji: ", e);
            return ResponseEntity.internalServerError()
                    .body(ConfigurationValidationResponse.builder()
                            .isValid(false)
                            .message("Błąd podczas walidacji konfiguracji")
                            .build());
        }
    }
    
    // Inner class dla response walidacji
    public static class ConfigurationValidationResponse {
        private boolean isValid;
        private String message;
        
        public ConfigurationValidationResponse() {}
        
        public ConfigurationValidationResponse(boolean isValid, String message) {
            this.isValid = isValid;
            this.message = message;
        }
        
        public static Builder builder() {
            return new Builder();
        }
        
        public boolean isValid() {
            return isValid;
        }
        
        public void setValid(boolean valid) {
            isValid = valid;
        }
        
        public String getMessage() {
            return message;
        }
        
        public void setMessage(String message) {
            this.message = message;
        }
        
        public static class Builder {
            private boolean isValid;
            private String message;
            
            public Builder isValid(boolean isValid) {
                this.isValid = isValid;
                return this;
            }
            
            public Builder message(String message) {
                this.message = message;
                return this;
            }
            
            public ConfigurationValidationResponse build() {
                return new ConfigurationValidationResponse(isValid, message);
            }
        }
    }
}
