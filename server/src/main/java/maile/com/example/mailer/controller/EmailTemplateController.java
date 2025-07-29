package maile.com.example.mailer.controller;

import java.util.List;

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

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import maile.com.example.mailer.dto.CreateEmailTemplateRequest;
import maile.com.example.mailer.dto.EmailTemplateResponse;
import maile.com.example.mailer.dto.UpdateEmailTemplateRequest;
import maile.com.example.mailer.entity.User;
import maile.com.example.mailer.repository.UserRepository;
import maile.com.example.mailer.service.EmailTemplateService;

@RestController
@RequestMapping("/api/email-templates")
@RequiredArgsConstructor
@Slf4j
public class EmailTemplateController {
    
    private final EmailTemplateService emailTemplateService;
    private final UserRepository userRepository;
    
    @GetMapping
    public ResponseEntity<List<EmailTemplateResponse>> getAllTemplates() {
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
            
            List<EmailTemplateResponse> templates = emailTemplateService.getAllTemplates(userId);
            log.info("Pobrano szablony dla użytkownika: {}", userId);
            
            return ResponseEntity.ok(templates);
        } catch (Exception e) {
            log.error("Błąd podczas pobierania szablonów: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<EmailTemplateResponse> createTemplate(@Valid @RequestBody CreateEmailTemplateRequest request) {
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
            
            EmailTemplateResponse template = emailTemplateService.createTemplate(request, userId);
            log.info("Utworzono szablon dla użytkownika: {}", userId);
            
            return ResponseEntity.ok(template);
        } catch (Exception e) {
            log.error("Błąd podczas tworzenia szablonu: ", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{templateId}")
    public ResponseEntity<EmailTemplateResponse> updateTemplate(
            @PathVariable Long templateId,
            @Valid @RequestBody UpdateEmailTemplateRequest request) {
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
            
            EmailTemplateResponse template = emailTemplateService.updateTemplate(templateId, request, userId);
            log.info("Zaktualizowano szablon {} dla użytkownika: {}", templateId, userId);
            
            return ResponseEntity.ok(template);
        } catch (Exception e) {
            log.error("Błąd podczas aktualizacji szablonu: ", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{templateId}")
    public ResponseEntity<Void> deleteTemplate(@PathVariable Long templateId) {
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
            
            emailTemplateService.deleteTemplate(templateId, userId);
            log.info("Usunięto szablon {} dla użytkownika: {}", templateId, userId);
            
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Błąd podczas usuwania szablonu: ", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/{templateId}/duplicate")
    public ResponseEntity<EmailTemplateResponse> duplicateTemplate(@PathVariable Long templateId) {
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
            
            EmailTemplateResponse template = emailTemplateService.duplicateTemplate(templateId, userId);
            log.info("Zduplikowano szablon {} dla użytkownika: {}", templateId, userId);
            
            return ResponseEntity.ok(template);
        } catch (Exception e) {
            log.error("Błąd podczas duplikowania szablonu: ", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/{templateId}/toggle-status")
    public ResponseEntity<EmailTemplateResponse> toggleTemplateStatus(@PathVariable Long templateId) {
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
            
            EmailTemplateResponse template = emailTemplateService.toggleTemplateStatus(templateId, userId);
            log.info("Zmieniono status szablonu {} dla użytkownika: {}", templateId, userId);
            
            return ResponseEntity.ok(template);
        } catch (Exception e) {
            log.error("Błąd podczas zmiany statusu szablonu: ", e);
            return ResponseEntity.badRequest().build();
        }
    }
}