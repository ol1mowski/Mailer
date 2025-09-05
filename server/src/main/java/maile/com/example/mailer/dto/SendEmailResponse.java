package maile.com.example.mailer.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SendEmailResponse {
    
    private String id; // Resend email ID
    private String status;
    private String message;
    private LocalDateTime sentAt;
    private Integer recipientCount;
    
    public static SendEmailResponse success(String id, Integer recipientCount) {
        return SendEmailResponse.builder()
                .id(id)
                .status("success")
                .message("Email wysłany pomyślnie")
                .sentAt(LocalDateTime.now())
                .recipientCount(recipientCount)
                .build();
    }
    
    public static SendEmailResponse error(String message) {
        return SendEmailResponse.builder()
                .status("error")
                .message(message)
                .sentAt(LocalDateTime.now())
                .build();
    }
}
