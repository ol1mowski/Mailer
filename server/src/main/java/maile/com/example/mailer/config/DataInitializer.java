package maile.com.example.mailer.config;

import maile.com.example.mailer.entity.*;
import maile.com.example.mailer.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {
    
    private final UserRepository userRepository;
    private final EmailRepository emailRepository;
    private final ContactRepository contactRepository;
    private final EmailTemplateRepository emailTemplateRepository;
    private final ActivityRepository activityRepository;
    private final PasswordEncoder passwordEncoder;
    
    public DataInitializer(
            UserRepository userRepository,
            EmailRepository emailRepository,
            ContactRepository contactRepository,
            EmailTemplateRepository emailTemplateRepository,
            ActivityRepository activityRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.emailRepository = emailRepository;
        this.contactRepository = contactRepository;
        this.emailTemplateRepository = emailTemplateRepository;
        this.activityRepository = activityRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    @Override
    public void run(String... args) throws Exception {
        // Dodaj testowego użytkownika jeśli nie istnieje
        User adminUser = null;
        if (!userRepository.existsByEmail("admin@mailer.com")) {
            adminUser = new User();
            adminUser.setEmail("admin@mailer.com");
            adminUser.setPassword(passwordEncoder.encode("password123"));
            adminUser.setFirstName("Admin");
            adminUser.setLastName("User");
            adminUser.setRole(User.UserRole.ADMIN);
            
            adminUser = userRepository.save(adminUser);
            System.out.println("Testowy użytkownik admin został utworzony: admin@mailer.com / password123");
        } else {
            adminUser = userRepository.findByEmail("admin@mailer.com").orElse(null);
        }
        
        if (!userRepository.existsByEmail("user@mailer.com")) {
            User regularUser = new User();
            regularUser.setEmail("user@mailer.com");
            regularUser.setPassword(passwordEncoder.encode("password123"));
            regularUser.setFirstName("Regular");
            regularUser.setLastName("User");
            regularUser.setRole(User.UserRole.USER);
            
            userRepository.save(regularUser);
            System.out.println("Testowy użytkownik został utworzony: user@mailer.com / password123");
        }
        
        // Dodaj dane testowe dla dashboard jeśli użytkownik admin istnieje
        if (adminUser != null) {
            initializeDashboardData(adminUser);
        }
    }
    
    private void initializeDashboardData(User user) {
        // Dodaj kontakty testowe
        if (contactRepository.countByUserId(user.getId()) == 0) {
            for (int i = 1; i <= 15; i++) {
                Contact contact = Contact.builder()
                        .email("contact" + i + "@example.com")
                        .firstName("Jan" + i)
                        .lastName("Kowalski" + i)
                        .phone("+48 123 456 " + String.format("%03d", i))
                        .company("Firma " + i)
                        .status(Contact.ContactStatus.ACTIVE)
                        .user(user)
                        .build();
                contactRepository.save(contact);
            }
            System.out.println("Dodano 15 kontaktów testowych");
        }
        
        // Dodaj szablony email testowe
        if (emailTemplateRepository.countByUserId(user.getId()) == 0) {
            for (int i = 1; i <= 8; i++) {
                EmailTemplate template = EmailTemplate.builder()
                        .name("Szablon " + i)
                        .subject("Temat szablonu " + i)
                        .content("<h1>Treść szablonu " + i + "</h1><p>To jest przykładowa treść szablonu.</p>")
                        .description("Opis szablonu " + i)
                        .status(EmailTemplate.TemplateStatus.ACTIVE)
                        .user(user)
                        .build();
                emailTemplateRepository.save(template);
            }
            System.out.println("Dodano 8 szablonów email testowych");
        }
        
        // Dodaj emaile testowe
        if (emailRepository.countByUserId(user.getId()) == 0) {
            for (int i = 1; i <= 25; i++) {
                Email.EmailStatus status = i <= 20 ? Email.EmailStatus.OPENED : Email.EmailStatus.SENT;
                LocalDateTime sentAt = LocalDateTime.now().minusHours(i);
                LocalDateTime openedAt = status == Email.EmailStatus.OPENED ? 
                    sentAt.plusMinutes(5) : null;
                
                Email email = Email.builder()
                        .subject("Test email " + i)
                        .content("Treść testowego emaila " + i)
                        .recipient("recipient" + i + "@example.com")
                        .sender("admin@mailer.com")
                        .status(status)
                        .sentAt(sentAt)
                        .openedAt(openedAt)
                        .user(user)
                        .build();
                emailRepository.save(email);
            }
            System.out.println("Dodano 25 emaili testowych (20 otwartych, 5 wysłanych)");
        }
        
        // Dodaj aktywności testowe
        if (activityRepository.findRecentActivitiesByUserId(user.getId()).isEmpty()) {
            String[] activityTypes = {"email", "contact", "template", "campaign"};
            String[] descriptions = {
                "Mail wysłany pomyślnie",
                "Nowy kontakt dodany",
                "Szablon zaktualizowany",
                "Kampania zakończona",
                "Import kontaktów zakończony",
                "Raport wygenerowany"
            };
            Activity.ActivityStatus[] statuses = {
                Activity.ActivityStatus.SUCCESS,
                Activity.ActivityStatus.INFO,
                Activity.ActivityStatus.WARNING
            };
            
            for (int i = 1; i <= 10; i++) {
                Activity activity = Activity.builder()
                        .type(activityTypes[i % activityTypes.length])
                        .description(descriptions[i % descriptions.length])
                        .status(statuses[i % statuses.length])
                        .details("Szczegóły aktywności " + i)
                        .user(user)
                        .build();
                activityRepository.save(activity);
            }
            System.out.println("Dodano 10 aktywności testowych");
        }
    }
} 