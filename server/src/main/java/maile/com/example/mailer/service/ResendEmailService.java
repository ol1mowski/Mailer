package maile.com.example.mailer.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;

import lombok.extern.slf4j.Slf4j;
import maile.com.example.mailer.config.ResendConfig;
import maile.com.example.mailer.dto.SendEmailRequest;
import maile.com.example.mailer.dto.SendEmailResponse;
import maile.com.example.mailer.entity.UserSettings;
import maile.com.example.mailer.repository.UserSettingsRepository;

@Service
@Slf4j
public class ResendEmailService {
    
    private final UserSettingsRepository userSettingsRepository;
    private final ResendConfig resendConfig;
    
    public ResendEmailService(UserSettingsRepository userSettingsRepository, ResendConfig resendConfig) {
        this.userSettingsRepository = userSettingsRepository;
        this.resendConfig = resendConfig;
    }
    
    public SendEmailResponse sendEmail(SendEmailRequest request, Long userId) {
        try {
            UserSettings userSettings = userSettingsRepository.findByUserId(userId).orElse(null);
            
            ResendEmailConfig emailConfig = resolveEmailConfig(userSettings);
            
            if (!emailConfig.isValid()) {
                return SendEmailResponse.error("Konfiguracja Resend nie jest dostępna. Skonfiguruj ustawienia użytkownika lub zmienne środowiskowe.");
            }
            
            Resend resend = new Resend(emailConfig.getApiKey());
            
            String fromAddress = buildFromAddress(emailConfig);
            
            CreateEmailOptions.Builder emailBuilder = CreateEmailOptions.builder()
                    .from(fromAddress)
                    .to(request.getTo())
                    .subject(request.getSubject())
                    .html(request.getHtml());
            
            if (request.getText() != null && !request.getText().isEmpty()) {
                emailBuilder.text(request.getText());
            }
            
            if (request.getCc() != null && !request.getCc().isEmpty()) {
                emailBuilder.cc(request.getCc());
            }
            
            if (request.getBcc() != null && !request.getBcc().isEmpty()) {
                emailBuilder.bcc(request.getBcc());
            }
            
            if (emailConfig.getReplyToEmail() != null && !emailConfig.getReplyToEmail().isEmpty()) {
                emailBuilder.replyTo(List.of(emailConfig.getReplyToEmail()));
            }
            
            if (request.getAttachments() != null && !request.getAttachments().isEmpty()) {
                log.warn("Załączniki nie są jeszcze obsługiwane");
            }
            
            CreateEmailOptions emailOptions = emailBuilder.build();
            
            CreateEmailResponse response = resend.emails().send(emailOptions);
            
            log.info("Email wysłany pomyślnie. ID: {}, Użytkownik: {}", response.getId(), userId);
            
            return SendEmailResponse.success(response.getId(), request.getTo().size());
            
        } catch (ResendException e) {
            log.error("Błąd Resend podczas wysyłania email: {}", e.getMessage(), e);
            return SendEmailResponse.error("Błąd wysyłania email: " + e.getMessage());
        } catch (Exception e) {
            log.error("Nieoczekiwany błąd podczas wysyłania email: {}", e.getMessage(), e);
            return SendEmailResponse.error("Nieoczekiwany błąd podczas wysyłania email");
        }
    }
    
    private String buildFromAddress(ResendEmailConfig emailConfig) {
        String fromEmail = emailConfig.getFromEmail();
        String fromName = emailConfig.getFromName();
        
        if (fromName != null && !fromName.isEmpty()) {
            return String.format("%s <%s>", fromName, fromEmail);
        }
        
        return fromEmail;
    }
    
    private ResendEmailConfig resolveEmailConfig(UserSettings userSettings) {
        if (userSettings != null && hasValidUserConfig(userSettings)) {
            return ResendEmailConfig.fromUserSettings(userSettings);
        }
        
        if (resendConfig.hasValidFallbackConfig()) {
            return ResendEmailConfig.fromResendConfig(resendConfig);
        }
        
        return ResendEmailConfig.invalid();
    }
    
    private boolean hasValidUserConfig(UserSettings userSettings) {
        return userSettings.getResendApiKey() != null && !userSettings.getResendApiKey().isEmpty() &&
               userSettings.getFromEmail() != null && !userSettings.getFromEmail().isEmpty();
    }
    
    public boolean validateResendConfiguration(Long userId) {
        try {
            UserSettings userSettings = userSettingsRepository.findByUserId(userId).orElse(null);
            ResendEmailConfig emailConfig = resolveEmailConfig(userSettings);
            return emailConfig.isValid();
        } catch (Exception e) {
            log.error("Błąd podczas walidacji konfiguracji Resend: {}", e.getMessage(), e);
            return false;
        }
    }
    
    private static class ResendEmailConfig {
        private final String apiKey;
        private final String fromEmail;
        private final String fromName;
        private final String replyToEmail;
        private final boolean valid;
        
        private ResendEmailConfig(String apiKey, String fromEmail, String fromName, 
                                String replyToEmail, boolean valid) {
            this.apiKey = apiKey;
            this.fromEmail = fromEmail;
            this.fromName = fromName;
            this.replyToEmail = replyToEmail;
            this.valid = valid;
        }
        
        public static ResendEmailConfig fromUserSettings(UserSettings userSettings) {
            return new ResendEmailConfig(
                userSettings.getResendApiKey(),
                userSettings.getFromEmail(),
                userSettings.getFromName(),
                userSettings.getReplyToEmail(),
                true
            );
        }
        
        public static ResendEmailConfig fromResendConfig(ResendConfig resendConfig) {
            return new ResendEmailConfig(
                resendConfig.getApiKey(),
                resendConfig.getFromEmail(),
                resendConfig.getFromName(), 
                resendConfig.getReplyToEmail(),
                true
            );
        }
        
        public static ResendEmailConfig invalid() {
            return new ResendEmailConfig(null, null, null, null, false);
        }
        
        public boolean isValid() { return valid; }
        public String getApiKey() { return apiKey; }
        public String getFromEmail() { return fromEmail; }
        public String getFromName() { return fromName; }
        public String getReplyToEmail() { return replyToEmail; }
    }
}
