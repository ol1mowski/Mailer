package maile.com.example.mailer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CampaignPerformanceResponse {
    private String name;
    private Integer sent;
    private Integer opened;
    private Integer clicked;
    private Double openRate;
    private Double clickRate;
}