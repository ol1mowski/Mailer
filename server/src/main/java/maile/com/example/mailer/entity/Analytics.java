package maile.com.example.mailer.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "analytics")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Analytics {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id")
    private Campaign campaign;
    
    @Column(name = "total_emails", nullable = false)
    private Integer totalEmails;
    
    @Column(name = "total_recipients", nullable = false)
    private Integer totalRecipients;
    
    @Column(name = "total_opens", nullable = false)
    private Integer totalOpens;
    
    @Column(name = "total_clicks", nullable = false)
    private Integer totalClicks;
    
    @Column(name = "average_open_rate", nullable = false)
    private Double averageOpenRate;
    
    @Column(name = "average_click_rate", nullable = false)
    private Double averageClickRate;
    
    @Column(name = "bounce_rate", nullable = false)
    private Double bounceRate;
    
    @Column(name = "unsubscribe_rate", nullable = false)
    private Double unsubscribeRate;
    
    @Column(name = "period_start", nullable = false)
    private LocalDateTime periodStart;
    
    @Column(name = "period_end", nullable = false)
    private LocalDateTime periodEnd;
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}