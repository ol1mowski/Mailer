package maile.com.example.mailer.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "contacts")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Contact {
    
    public enum ContactStatus {
        ACTIVE, INACTIVE, UNSUBSCRIBED
    }
    
    public enum ContactTag {
        VIP("VIP"),
        NEWSLETTER("Newsletter"),
        NOWY_KLIENT("Nowy klient"),
        TEST("Test"),
        KLIENT("Klient"),
        PREMIUM("Premium"),
        PROSPEKT("Prospekt"),
        PARTNER("Partner"),
        DOSTAWCA("Dostawca");
        
        private final String displayName;
        
        ContactTag(String displayName) {
            this.displayName = displayName;
        }
        
        public String getDisplayName() {
            return displayName;
        }
        
        public static boolean isValidTag(String tag) {
            for (ContactTag validTag : values()) {
                if (validTag.displayName.equals(tag)) {
                    return true;
                }
            }
            return false;
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String firstName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ElementCollection
    @CollectionTable(name = "contact_tags", joinColumns = @JoinColumn(name = "contact_id"))
    @Column(name = "tag")
    private List<String> tags;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private ContactStatus status = ContactStatus.ACTIVE;

    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
} 