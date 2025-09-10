package maile.com.example.mailer.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import maile.com.example.mailer.dto.ContactResponse;
import maile.com.example.mailer.dto.ContactStatsResponse;
import maile.com.example.mailer.dto.CreateContactRequest;
import maile.com.example.mailer.dto.ImportContactsRequest;
import maile.com.example.mailer.dto.UpdateContactRequest;
import maile.com.example.mailer.entity.User;
import maile.com.example.mailer.repository.UserRepository;
import maile.com.example.mailer.service.ContactService;

@RestController
@RequestMapping("/api/contacts")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Kontakty", description = "Zarządzanie kontaktami użytkownika")
@SecurityRequirement(name = "JWT")
public class ContactController {
    
    private final ContactService contactService;
    private final UserRepository userRepository;
    
    @GetMapping("/stats")
    @Operation(summary = "Pobierz statystyki kontaktów", 
               description = "Zwraca statystyki kontaktów aktualnego użytkownika")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Statystyki pobrane pomyślnie",
                    content = @Content(mediaType = "application/json", 
                                     schema = @Schema(implementation = ContactStatsResponse.class))),
        @ApiResponse(responseCode = "500", description = "Błąd serwera")
    })
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
    @Operation(summary = "Pobierz dostępne tagi", 
               description = "Zwraca listę wszystkich dostępnych tagów dla kontaktów")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Tagi pobrane pomyślnie"),
        @ApiResponse(responseCode = "500", description = "Błąd serwera")
    })
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
    @Operation(summary = "Pobierz wszystkie kontakty", 
               description = "Zwraca listę wszystkich kontaktów aktualnego użytkownika")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Kontakty pobrane pomyślnie"),
        @ApiResponse(responseCode = "500", description = "Błąd serwera")
    })
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
    @Operation(summary = "Utwórz nowy kontakt", 
               description = "Tworzy nowy kontakt dla aktualnego użytkownika")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Kontakt utworzony pomyślnie",
                    content = @Content(mediaType = "application/json", 
                                     schema = @Schema(implementation = ContactResponse.class))),
        @ApiResponse(responseCode = "400", description = "Nieprawidłowe dane wejściowe")
    })
    public ResponseEntity<ContactResponse> createContact(
            @Parameter(description = "Dane nowego kontaktu", required = true)
            @Valid @RequestBody CreateContactRequest request) {
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
    @Operation(summary = "Zaktualizuj kontakt", 
               description = "Aktualizuje istniejący kontakt")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Kontakt zaktualizowany pomyślnie",
                    content = @Content(mediaType = "application/json", 
                                     schema = @Schema(implementation = ContactResponse.class))),
        @ApiResponse(responseCode = "400", description = "Nieprawidłowe dane lub kontakt nie istnieje")
    })
    public ResponseEntity<ContactResponse> updateContact(
            @Parameter(description = "ID kontaktu do aktualizacji", required = true)
            @PathVariable Long contactId,
            @Parameter(description = "Nowe dane kontaktu", required = true)
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
    @Operation(summary = "Usuń kontakt", 
               description = "Usuwa kontakt o podanym ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Kontakt usunięty pomyślnie"),
        @ApiResponse(responseCode = "400", description = "Kontakt nie istnieje lub błąd podczas usuwania")
    })
    public ResponseEntity<Void> deleteContact(
            @Parameter(description = "ID kontaktu do usunięcia", required = true)
            @PathVariable Long contactId) {
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
    @Operation(summary = "Importuj kontakty", 
               description = "Importuje wiele kontaktów jednocześnie")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Kontakty zaimportowane pomyślnie"),
        @ApiResponse(responseCode = "400", description = "Błąd podczas importu kontaktów")
    })
    public ResponseEntity<List<ContactResponse>> importContacts(
            @Parameter(description = "Dane kontaktów do importu", required = true)
            @Valid @RequestBody ImportContactsRequest request) {
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