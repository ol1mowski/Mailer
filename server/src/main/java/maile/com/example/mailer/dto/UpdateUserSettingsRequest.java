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
    
    
    private String resendApiKey;
    
    @Email(message = "Nieprawidłowy format adresu email")
    private String fromEmail;
    
    private String fromName;
    
    @Email(message = "Nieprawidłowy format adresu email")
    private String replyToEmail;
    
    private String customDomain;
}