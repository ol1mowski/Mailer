package maile.com.example.mailer.dto;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCampaignRequest {
    @NotBlank(message = "Nazwa kampanii jest wymagana")
    private String name;
    
    @NotBlank(message = "Temat jest wymagany")
    private String subject;
    
    @NotBlank(message = "Treść jest wymagana")
    private String content;
    
    private String description;
    
    private String status;
    
    private LocalDateTime scheduledAt;
    
    private Long templateId;
    
    private List<Long> recipientIds;
}