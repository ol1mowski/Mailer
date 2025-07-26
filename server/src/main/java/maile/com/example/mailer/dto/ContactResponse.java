package maile.com.example.mailer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactResponse {
    private Long id;
    private String email;
    private String firstName;
    private String status;
    private List<String> tags;
    private LocalDateTime createdAt;
    
    public String getFullName() {
        return firstName != null ? firstName : "";
    }
} 