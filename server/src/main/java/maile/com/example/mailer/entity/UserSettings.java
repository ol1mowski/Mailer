package maile.com.example.mailer.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_settings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class UserSettings {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
    
    // Ustawienia użytkownika
    @Column(name = "first_name")
    private String firstName;
    
    @Column(name = "last_name")
    private String lastName;
    
    @Column(name = "timezone")
    private String timezone;
    
    // Ustawienia powiadomień
    @Column(name = "email_notifications")
    private Boolean emailNotifications;
    
    @Column(name = "sms_notifications")
    private Boolean smsNotifications;
    
    @Column(name = "campaign_notifications")
    private Boolean campaignNotifications;
    
    @Column(name = "weekly_reports")
    private Boolean weeklyReports;
    
    @Column(name = "monthly_reports")
    private Boolean monthlyReports;
    
    // Ustawienia bezpieczeństwa
    @Column(name = "login_notifications")
    private Boolean loginNotifications;
    
    @Column(name = "password_change_reminder")
    private Boolean passwordChangeReminder;
    
    // Ustawienia email
    @Column(name = "smtp_host")
    private String smtpHost;
    
    @Column(name = "smtp_port")
    private Integer smtpPort;
    
    @Column(name = "smtp_username")
    private String smtpUsername;
    
    @Column(name = "smtp_password")
    private String smtpPassword;
    
    @Column(name = "smtp_encryption")
    private String smtpEncryption;
    
    @Column(name = "from_email")
    private String fromEmail;
    
    @Column(name = "from_name")
    private String fromName;
    
    @Column(name = "reply_to_email")
    private String replyToEmail;
    
    // Status konta
    @Column(name = "account_status")
    @Enumerated(EnumType.STRING)
    private AccountStatus accountStatus;
    
    @Column(name = "subscription_plan")
    private String subscriptionPlan;
    
    @Column(name = "subscription_expires")
    private LocalDateTime subscriptionExpires;
    
    @Column(name = "storage_used")
    private Long storageUsed;
    
    @Column(name = "storage_limit")
    private Long storageLimit;
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    public enum AccountStatus {
        ACTIVE, SUSPENDED, CANCELLED, PENDING
    }
}