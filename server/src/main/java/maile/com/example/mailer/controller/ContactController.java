package maile.com.example.mailer.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import maile.com.example.mailer.dto.ContactResponse;
import maile.com.example.mailer.dto.ContactStatsResponse;
import maile.com.example.mailer.entity.User;
import maile.com.example.mailer.repository.UserRepository;
import maile.com.example.mailer.service.ContactService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@RequiredArgsConstructor
@Slf4j
public class ContactController {
    
    private final ContactService contactService;
    private final UserRepository userRepository;
    
    @GetMapping("/stats")
    public ResponseEntity<ContactStatsResponse> getContactStats() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Long userId = 1L; // Default fallback
            
            if (authentication != null && authentication.getPrincipal() instanceof User) {
                User user = (User) authentication.getPrincipal();
                userId = user.getId();
            } else if (authentication != null && authentication.getPrincipal() instanceof org.springframework.security.core.userdetails.UserDetails) {
                String email = ((org.springframework.security.core.userdetails.UserDetails) authentication.getPrincipal()).getUsername();
                User user = userRepository.findByEmail(email).orElse(null);
                if (user != null) {
                    userId = user.getId();
                }
            }
            
            ContactStatsResponse stats = contactService.getContactStats(userId);
            log.info("Pobrano statystyki kontaktów dla użytkownika: {}", userId);
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            log.error("Błąd podczas pobierania statystyk kontaktów: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping
    public ResponseEntity<List<ContactResponse>> getAllContacts() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Long userId = 1L; // Default fallback
            
            if (authentication != null && authentication.getPrincipal() instanceof User) {
                User user = (User) authentication.getPrincipal();
                userId = user.getId();
            } else if (authentication != null && authentication.getPrincipal() instanceof org.springframework.security.core.userdetails.UserDetails) {
                String email = ((org.springframework.security.core.userdetails.UserDetails) authentication.getPrincipal()).getUsername();
                User user = userRepository.findByEmail(email).orElse(null);
                if (user != null) {
                    userId = user.getId();
                }
            }
            
            List<ContactResponse> contacts = contactService.getAllContacts(userId);
            log.info("Pobrano kontakty dla użytkownika: {}", userId);
            
            return ResponseEntity.ok(contacts);
        } catch (Exception e) {
            log.error("Błąd podczas pobierania kontaktów: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }
} 