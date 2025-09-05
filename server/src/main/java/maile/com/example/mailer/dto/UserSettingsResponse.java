package maile.com.example.mailer.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import maile.com.example.mailer.entity.UserSettings;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSettingsResponse {
    
    private String firstName;
    private String lastName;
    private String timezone;
    
    
    private String resendApiKey;
    private String fromEmail;
    private String fromName;
    private String replyToEmail;
    private String customDomain;
    
    private UserSettings.AccountStatus accountStatus;
    private String subscriptionPlan;
    private LocalDateTime subscriptionExpires;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}