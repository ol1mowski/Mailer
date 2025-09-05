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
    
    // Ustawienia użytkownika
    private String firstName;
    private String lastName;
    private String timezone;
    
    
    // Ustawienia email
    private String smtpHost;
    private Integer smtpPort;
    private String smtpUsername;
    private String smtpEncryption;
    private String fromEmail;
    private String fromName;
    private String replyToEmail;
    
    // Status konta
    private UserSettings.AccountStatus accountStatus;
    private String subscriptionPlan;
    private LocalDateTime subscriptionExpires;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}