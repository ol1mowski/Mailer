package maile.com.example.mailer.dto;

import java.util.List;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SendEmailRequest {
    
    @NotEmpty(message = "Lista odbiorców nie może być pusta")
    private List<@Email(message = "Nieprawidłowy format adresu email") String> to;
    
    private List<@Email(message = "Nieprawidłowy format adresu email") String> cc;
    
    private List<@Email(message = "Nieprawidłowy format adresu email") String> bcc;
    
    @NotBlank(message = "Temat wiadomości jest wymagany")
    private String subject;
    
    @NotBlank(message = "Treść wiadomości jest wymagana")
    private String html;
    
    private String text;
    
    private List<EmailAttachment> attachments;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EmailAttachment {
        @NotBlank(message = "Nazwa załącznika jest wymagana")
        private String filename;
        
        @NotBlank(message = "Typ MIME jest wymagany")
        private String contentType;
        
        @NotBlank(message = "Zawartość załącznika jest wymagana")
        private String content; // Base64 encoded content
    }
}
