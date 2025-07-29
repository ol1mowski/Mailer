package maile.com.example.mailer.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CampaignResponse {
    private Long id;
    private String name;
    private String subject;
    private String content;
    private String description;
    private String status;
    private LocalDateTime scheduledAt;
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
    private Integer totalRecipients;
    private Integer sentEmails;
    private Integer openedEmails;
    private Integer clickedEmails;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private EmailTemplateResponse template;
    private List<ContactResponse> recipients;
}