package maile.com.example.mailer.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

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
        AKTYWNY("Aktywny"),
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

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String firstName;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
} 