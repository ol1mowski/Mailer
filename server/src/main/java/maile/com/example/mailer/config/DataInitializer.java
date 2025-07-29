package maile.com.example.mailer.config;

import java.time.LocalDateTime;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import maile.com.example.mailer.entity.Activity;
import maile.com.example.mailer.entity.Contact;
import maile.com.example.mailer.entity.Email;
import maile.com.example.mailer.entity.EmailTemplate;
import maile.com.example.mailer.entity.User;
import maile.com.example.mailer.repository.ActivityRepository;
import maile.com.example.mailer.repository.ContactRepository;
import maile.com.example.mailer.repository.EmailRepository;
import maile.com.example.mailer.repository.EmailTemplateRepository;
import maile.com.example.mailer.repository.UserRepository;

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
        
        if (adminUser != null) {
            initializeDashboardData(adminUser);
        }
    }
    
    private void initializeDashboardData(User user) {   
        if (contactRepository.countByUserId(user.getId()) == 0) {
            String[] names = {"Jan", "Anna", "Piotr", "Maria", "Tomasz", "Katarzyna", "Marek", "Ewa", "Andrzej", "Joanna"};
            String[][] tags = {
                {"VIP"}, {"Newsletter"}, {"Nowy klient"}, {"VIP"}, {"Test"},
                {"Klient", "Premium"}, {"Newsletter"}, {"VIP"}, {"Nowy klient"}, {"Klient"}
            };
            Contact.ContactStatus[] statuses = {
                Contact.ContactStatus.ACTIVE, Contact.ContactStatus.ACTIVE, Contact.ContactStatus.INACTIVE,
                Contact.ContactStatus.ACTIVE, Contact.ContactStatus.INACTIVE, Contact.ContactStatus.ACTIVE,
                Contact.ContactStatus.ACTIVE, Contact.ContactStatus.ACTIVE, Contact.ContactStatus.INACTIVE,
                Contact.ContactStatus.ACTIVE
            };
            
            for (int i = 1; i <= 15; i++) {
                int index = (i - 1) % 10;
                Contact contact = Contact.builder()
                        .email(names[index].toLowerCase() + i + "@example.com")
                        .firstName(names[index])
                        .tags(java.util.Arrays.asList(tags[index]))
                        .status(statuses[index])
                        .user(user)
                        .build();
                contactRepository.save(contact);
            }
            System.out.println("Dodano 15 kontaktów testowych z różnymi tagami i statusami");
        }
        
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