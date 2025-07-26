package maile.com.example.mailer.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import maile.com.example.mailer.dto.ContactResponse;
import maile.com.example.mailer.dto.ContactStatsResponse;
import maile.com.example.mailer.dto.CreateContactRequest;
import maile.com.example.mailer.dto.UpdateContactRequest;
import maile.com.example.mailer.dto.ImportContactsRequest;
import maile.com.example.mailer.entity.User;
import maile.com.example.mailer.repository.UserRepository;
import maile.com.example.mailer.service.ContactService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

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
            Long userId = 1L;
            
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
    
    @GetMapping("/tags")
    public ResponseEntity<List<String>> getAvailableTags() {
        try {
            List<String> availableTags = java.util.Arrays.stream(maile.com.example.mailer.entity.Contact.ContactTag.values())
                .map(maile.com.example.mailer.entity.Contact.ContactTag::getDisplayName)
                .collect(Collectors.toList());
            
            log.info("Pobrano dostępne tagi: {}", availableTags);
            return ResponseEntity.ok(availableTags);
        } catch (Exception e) {
            log.error("Błąd podczas pobierania dostępnych tagów: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping
    public ResponseEntity<List<ContactResponse>> getAllContacts() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Long userId = 1L;
            
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
    
    @PostMapping
    public ResponseEntity<ContactResponse> createContact(@Valid @RequestBody CreateContactRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Long userId = 1L;
            
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
            
            ContactResponse contact = contactService.createContact(request, userId);
            log.info("Utworzono kontakt dla użytkownika: {}", userId);
            
            return ResponseEntity.ok(contact);
        } catch (Exception e) {
            log.error("Błąd podczas tworzenia kontaktu: ", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{contactId}")
    public ResponseEntity<ContactResponse> updateContact(
            @PathVariable Long contactId,
            @Valid @RequestBody UpdateContactRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Long userId = 1L;
            
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
            
            ContactResponse contact = contactService.updateContact(contactId, request, userId);
            log.info("Zaktualizowano kontakt {} dla użytkownika: {}", contactId, userId);
            
            return ResponseEntity.ok(contact);
        } catch (Exception e) {
            log.error("Błąd podczas aktualizacji kontaktu: ", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{contactId}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long contactId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Long userId = 1L;
            
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
            
            contactService.deleteContact(contactId, userId);
            log.info("Usunięto kontakt {} dla użytkownika: {}", contactId, userId);
            
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Błąd podczas usuwania kontaktu: ", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/import")
    public ResponseEntity<List<ContactResponse>> importContacts(@Valid @RequestBody ImportContactsRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Long userId = 1L;
            
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
            
            List<ContactResponse> importedContacts = contactService.importContacts(request, userId);
            log.info("Zaimportowano {} kontaktów dla użytkownika: {}", importedContacts.size(), userId);
            
            return ResponseEntity.ok(importedContacts);
        } catch (Exception e) {
            log.error("Błąd podczas importu kontaktów: ", e);
            return ResponseEntity.badRequest().build();
        }
    }
} 