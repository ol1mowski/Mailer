package maile.com.example.mailer.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import maile.com.example.mailer.dto.CreateEmailTemplateRequest;
import maile.com.example.mailer.dto.EmailTemplateResponse;
import maile.com.example.mailer.dto.UpdateEmailTemplateRequest;
import maile.com.example.mailer.entity.EmailTemplate;
import maile.com.example.mailer.entity.User;
import maile.com.example.mailer.repository.EmailTemplateRepository;
import maile.com.example.mailer.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailTemplateService {
    
    private final EmailTemplateRepository emailTemplateRepository;
    private final UserRepository userRepository;
    
    public List<EmailTemplateResponse> getAllTemplates(Long userId) {
        log.info("Pobieranie wszystkich szablonów dla użytkownika: {}", userId);
        
        List<EmailTemplate> templates = emailTemplateRepository.findAllByUserIdOrderByCreatedAtDesc(userId);
        
        return templates.stream()
                .map(this::mapToEmailTemplateResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public EmailTemplateResponse createTemplate(CreateEmailTemplateRequest request, Long userId) {
        log.info("Tworzenie nowego szablonu dla użytkownika: {}", userId);
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Użytkownik nie został znaleziony"));
        
        EmailTemplate template = EmailTemplate.builder()
                .name(request.getName())
                .subject(request.getSubject())
                .content(request.getContent())
                .description(request.getDescription())
                .status(EmailTemplate.TemplateStatus.valueOf(request.getStatus()))
                .user(user)
                .build();
        
        EmailTemplate savedTemplate = emailTemplateRepository.save(template);
        log.info("Szablon utworzony z ID: {}", savedTemplate.getId());
        
        return mapToEmailTemplateResponse(savedTemplate);
    }
    
    @Transactional
    public EmailTemplateResponse updateTemplate(Long templateId, UpdateEmailTemplateRequest request, Long userId) {
        log.info("Aktualizacja szablonu ID: {} dla użytkownika: {}", templateId, userId);
        
        EmailTemplate template = emailTemplateRepository.findByIdAndUserId(templateId, userId)
                .orElseThrow(() -> new RuntimeException("Szablon nie został znaleziony"));
        
        template.setName(request.getName());
        template.setSubject(request.getSubject());
        template.setContent(request.getContent());
        template.setDescription(request.getDescription());
        if (request.getStatus() != null) {
            template.setStatus(EmailTemplate.TemplateStatus.valueOf(request.getStatus()));
        }
        
        EmailTemplate updatedTemplate = emailTemplateRepository.save(template);
        log.info("Szablon zaktualizowany: {}", updatedTemplate.getId());
        
        return mapToEmailTemplateResponse(updatedTemplate);
    }
    
    @Transactional
    public void deleteTemplate(Long templateId, Long userId) {
        log.info("Usuwanie szablonu ID: {} dla użytkownika: {}", templateId, userId);
        
        EmailTemplate template = emailTemplateRepository.findByIdAndUserId(templateId, userId)
                .orElseThrow(() -> new RuntimeException("Szablon nie został znaleziony"));
        
        emailTemplateRepository.delete(template);
        log.info("Szablon usunięty: {}", templateId);
    }
    
    @Transactional
    public EmailTemplateResponse duplicateTemplate(Long templateId, Long userId) {
        log.info("Duplikowanie szablonu ID: {} dla użytkownika: {}", templateId, userId);
        
        EmailTemplate originalTemplate = emailTemplateRepository.findByIdAndUserId(templateId, userId)
                .orElseThrow(() -> new RuntimeException("Szablon nie został znaleziony"));
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Użytkownik nie został znaleziony"));
        
        EmailTemplate duplicatedTemplate = EmailTemplate.builder()
                .name(originalTemplate.getName() + " (Kopia)")
                .subject(originalTemplate.getSubject())
                .content(originalTemplate.getContent())
                .description(originalTemplate.getDescription())
                .status(EmailTemplate.TemplateStatus.DRAFT)
                .user(user)
                .build();
        
        EmailTemplate savedTemplate = emailTemplateRepository.save(duplicatedTemplate);
        log.info("Szablon zduplikowany z ID: {}", savedTemplate.getId());
        
        return mapToEmailTemplateResponse(savedTemplate);
    }
    
    @Transactional
    public EmailTemplateResponse toggleTemplateStatus(Long templateId, Long userId) {
        log.info("Zmiana statusu szablonu ID: {} dla użytkownika: {}", templateId, userId);
        
        EmailTemplate template = emailTemplateRepository.findByIdAndUserId(templateId, userId)
                .orElseThrow(() -> new RuntimeException("Szablon nie został znaleziony"));
        
        EmailTemplate.TemplateStatus newStatus = template.getStatus() == EmailTemplate.TemplateStatus.ACTIVE 
                ? EmailTemplate.TemplateStatus.INACTIVE 
                : EmailTemplate.TemplateStatus.ACTIVE;
        
        template.setStatus(newStatus);
        EmailTemplate updatedTemplate = emailTemplateRepository.save(template);
        log.info("Status szablonu zmieniony na: {}", newStatus);
        
        return mapToEmailTemplateResponse(updatedTemplate);
    }
    
    private EmailTemplateResponse mapToEmailTemplateResponse(EmailTemplate template) {
        return EmailTemplateResponse.builder()
                .id(template.getId())
                .name(template.getName())
                .subject(template.getSubject())
                .content(template.getContent())
                .description(template.getDescription())
                .status(template.getStatus().name().toLowerCase())
                .createdAt(template.getCreatedAt())
                .updatedAt(template.getUpdatedAt())
                .build();
    }
}