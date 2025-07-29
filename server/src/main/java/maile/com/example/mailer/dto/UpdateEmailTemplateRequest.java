package maile.com.example.mailer.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateEmailTemplateRequest {
    
    @NotBlank(message = "Nazwa szablonu jest wymagana")
    @Size(min = 1, max = 100, message = "Nazwa musi mieć od 1 do 100 znaków")
    private String name;
    
    @NotBlank(message = "Temat jest wymagany")
    @Size(min = 1, max = 200, message = "Temat musi mieć od 1 do 200 znaków")
    private String subject;
    
    @NotBlank(message = "Treść jest wymagana")
    private String content;
    
    private String description;
    
    private String status;
}