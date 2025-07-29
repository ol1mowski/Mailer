package maile.com.example.mailer.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExportDataRequest {
    @NotBlank(message = "Okres jest wymagany")
    private String period;
    
    @NotBlank(message = "Format eksportu jest wymagany")
    private String format; // csv, xlsx, pdf
}