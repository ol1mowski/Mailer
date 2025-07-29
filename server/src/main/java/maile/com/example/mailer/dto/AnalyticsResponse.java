package maile.com.example.mailer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsResponse {
    private Integer totalEmails;
    private Integer totalRecipients;
    private Integer totalOpens;
    private Integer totalClicks;
    private Double averageOpenRate;
    private Double averageClickRate;
    private Double bounceRate;
    private Double unsubscribeRate;
}