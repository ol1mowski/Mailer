package maile.com.example.mailer.config;

import maile.com.example.mailer.entity.User;
import maile.com.example.mailer.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    @Override
    public void run(String... args) throws Exception {
        // Dodaj testowego użytkownika jeśli nie istnieje
        if (!userRepository.existsByEmail("admin@mailer.com")) {
            User adminUser = new User();
            adminUser.setEmail("admin@mailer.com");
            adminUser.setPassword(passwordEncoder.encode("password123"));
            adminUser.setFirstName("Admin");
            adminUser.setLastName("User");
            adminUser.setRole(User.UserRole.ADMIN);
            
            userRepository.save(adminUser);
            System.out.println("Testowy użytkownik admin został utworzony: admin@mailer.com / password123");
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
    }
} 