package maile.com.example.mailer.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import maile.com.example.mailer.entity.User;
import maile.com.example.mailer.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public DataInitializer(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    @Override
    public void run(String... args) throws Exception {
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
    }
}