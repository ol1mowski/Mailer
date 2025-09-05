package maile.com.example.mailer.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserSettingsRequest {
    
    @NotBlank(message = "Imię jest wymagane")
    private String firstName;
    
    private String lastName;
    
    private String timezone;
    
    private Boolean emailNotifications;
    private Boolean smsNotifications;
    private Boolean campaignNotifications;
    private Boolean weeklyReports;
    private Boolean monthlyReports;
    
    private Boolean loginNotifications;
    private Boolean passwordChangeReminder;
    
    private String smtpHost;
    private Integer smtpPort;
    private String smtpUsername;
    private String smtpPassword;
    private String smtpEncryption;
    
    @Email(message = "Nieprawidłowy format adresu email")
    private String fromEmail;
    
    private String fromName;
    
    @Email(message = "Nieprawidłowy format adresu email")
    private String replyToEmail;
}