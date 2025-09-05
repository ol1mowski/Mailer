package maile.com.example.mailer.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import maile.com.example.mailer.dto.CampaignResponse;
import maile.com.example.mailer.dto.CreateCampaignRequest;
import maile.com.example.mailer.dto.SendEmailRequest;
import maile.com.example.mailer.dto.SendEmailResponse;
import maile.com.example.mailer.dto.UpdateCampaignRequest;
import maile.com.example.mailer.entity.Campaign;
import maile.com.example.mailer.entity.Contact;
import maile.com.example.mailer.entity.EmailTemplate;
import maile.com.example.mailer.entity.User;
import maile.com.example.mailer.repository.CampaignRepository;
import maile.com.example.mailer.repository.ContactRepository;
import maile.com.example.mailer.repository.EmailTemplateRepository;
import maile.com.example.mailer.repository.UserRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class CampaignService {
    
    private final CampaignRepository campaignRepository;
    private final UserRepository userRepository;
    private final EmailTemplateRepository emailTemplateRepository;
    private final ContactRepository contactRepository;
    private final ResendEmailService resendEmailService;
    
    public List<CampaignResponse> getAllCampaigns(Long userId) {
        log.info("Pobieranie wszystkich kampanii dla użytkownika: {}", userId);
        
        List<Campaign> campaigns = campaignRepository.findAllByUserIdOrderByCreatedAtDesc(userId);
        
        return campaigns.stream()
                .map(this::mapToCampaignResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public CampaignResponse createCampaign(CreateCampaignRequest request, Long userId) {
        log.info("Tworzenie nowej kampanii dla użytkownika: {}", userId);
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Użytkownik nie został znaleziony"));
        
        Campaign campaign = Campaign.builder()
                .name(request.getName())
                .subject(request.getSubject())
                .content(request.getContent())
                .description(request.getDescription())
                .status(Campaign.CampaignStatus.valueOf(request.getStatus().toUpperCase()))
                .scheduledAt(request.getScheduledAt())
                .user(user)
                .totalRecipients(0)
                .sentEmails(0)
                .openedEmails(0)
                .clickedEmails(0)
                .build();
        
        if (request.getTemplateId() != null) {
            EmailTemplate template = emailTemplateRepository.findByIdAndUserId(request.getTemplateId(), userId)
                    .orElseThrow(() -> new RuntimeException("Szablon nie został znaleziony"));
            campaign.setTemplate(template);
        }
        
        if (request.getRecipientIds() != null && !request.getRecipientIds().isEmpty()) {
            List<Contact> recipients = contactRepository.findAllById(request.getRecipientIds());
            campaign.setRecipients(recipients);
            campaign.setTotalRecipients(recipients.size());
        }
        
        Campaign savedCampaign = campaignRepository.save(campaign);
        log.info("Kampania utworzona z ID: {}", savedCampaign.getId());
        

        if (savedCampaign.getStatus() == Campaign.CampaignStatus.ACTIVE) {
            log.info("Automatyczne uruchamianie kampanii z statusem ACTIVE: {}", savedCampaign.getId());
            return startCampaign(savedCampaign.getId(), userId);
        }
        
        return mapToCampaignResponse(savedCampaign);
    }
    
    @Transactional
    public CampaignResponse updateCampaign(Long campaignId, UpdateCampaignRequest request, Long userId) {
        log.info("Aktualizacja kampanii ID: {} dla użytkownika: {}", campaignId, userId);
        
        Campaign campaign = campaignRepository.findByIdAndUserId(campaignId, userId)
                .orElseThrow(() -> new RuntimeException("Kampania nie została znaleziona"));
        
        campaign.setName(request.getName());
        campaign.setSubject(request.getSubject());
        campaign.setContent(request.getContent());
        campaign.setDescription(request.getDescription());
        if (request.getStatus() != null) {
            campaign.setStatus(Campaign.CampaignStatus.valueOf(request.getStatus().toUpperCase()));
        }
        if (request.getScheduledAt() != null) {
            campaign.setScheduledAt(request.getScheduledAt());
        }
        
        if (request.getTemplateId() != null) {
            EmailTemplate template = emailTemplateRepository.findByIdAndUserId(request.getTemplateId(), userId)
                    .orElseThrow(() -> new RuntimeException("Szablon nie został znaleziony"));
            campaign.setTemplate(template);
        }
        
        if (request.getRecipientIds() != null) {
            List<Contact> recipients = contactRepository.findAllById(request.getRecipientIds());
            campaign.setRecipients(recipients);
            campaign.setTotalRecipients(recipients.size());
        }
        
        Campaign updatedCampaign = campaignRepository.save(campaign);
        log.info("Kampania zaktualizowana: {}", updatedCampaign.getId());
        
        return mapToCampaignResponse(updatedCampaign);
    }
    
    @Transactional
    public void deleteCampaign(Long campaignId, Long userId) {
        log.info("Usuwanie kampanii ID: {} dla użytkownika: {}", campaignId, userId);
        
        Campaign campaign = campaignRepository.findByIdAndUserId(campaignId, userId)
                .orElseThrow(() -> new RuntimeException("Kampania nie została znaleziona"));
        
        campaignRepository.delete(campaign);
        log.info("Kampania usunięta: {}", campaignId);
    }
    
    @Transactional
    public CampaignResponse startCampaign(Long campaignId, Long userId) {
        log.info("Uruchamianie kampanii ID: {} dla użytkownika: {}", campaignId, userId);
        
        Campaign campaign = campaignRepository.findByIdAndUserId(campaignId, userId)
                .orElseThrow(() -> new RuntimeException("Kampania nie została znaleziona"));
        
        if (campaign.getStatus() != Campaign.CampaignStatus.DRAFT && 
            campaign.getStatus() != Campaign.CampaignStatus.SCHEDULED &&
            campaign.getStatus() != Campaign.CampaignStatus.ACTIVE) {
            throw new RuntimeException("Kampania może być uruchomiona tylko ze statusu DRAFT, SCHEDULED lub ACTIVE");
        }
        
        if (campaign.getRecipients() == null || campaign.getRecipients().isEmpty()) {
            throw new RuntimeException("Kampania musi mieć przypisanych odbiorców");
        }
        
        campaign.setStatus(Campaign.CampaignStatus.ACTIVE);
        campaign.setStartedAt(LocalDateTime.now());
        
        try {
            sendCampaignEmails(campaign, userId);
            campaign.setSentEmails(campaign.getRecipients().size());
        } catch (Exception e) {
            log.error("Błąd podczas wysyłania maili kampanii {}: {}", campaignId, e.getMessage());
            campaign.setStatus(Campaign.CampaignStatus.PAUSED);
            throw new RuntimeException("Błąd podczas wysyłania maili: " + e.getMessage());
        }
        
        Campaign updatedCampaign = campaignRepository.save(campaign);
        log.info("Kampania uruchomiona i maile wysłane: {}", updatedCampaign.getId());
        
        return mapToCampaignResponse(updatedCampaign);
    }
    
    @Transactional
    public CampaignResponse pauseCampaign(Long campaignId, Long userId) {
        log.info("Wstrzymywanie kampanii ID: {} dla użytkownika: {}", campaignId, userId);
        
        Campaign campaign = campaignRepository.findByIdAndUserId(campaignId, userId)
                .orElseThrow(() -> new RuntimeException("Kampania nie została znaleziona"));
        
        if (campaign.getStatus() != Campaign.CampaignStatus.ACTIVE) {
            throw new RuntimeException("Kampania może być wstrzymana tylko ze statusu ACTIVE");
        }
        
        campaign.setStatus(Campaign.CampaignStatus.PAUSED);
        
        Campaign updatedCampaign = campaignRepository.save(campaign);
        log.info("Kampania wstrzymana: {}", updatedCampaign.getId());
        
        return mapToCampaignResponse(updatedCampaign);
    }
    
    @Transactional
    public CampaignResponse completeCampaign(Long campaignId, Long userId) {
        log.info("Kończenie kampanii ID: {} dla użytkownika: {}", campaignId, userId);
        
        Campaign campaign = campaignRepository.findByIdAndUserId(campaignId, userId)
                .orElseThrow(() -> new RuntimeException("Kampania nie została znaleziona"));
        
        campaign.setStatus(Campaign.CampaignStatus.COMPLETED);
        campaign.setCompletedAt(LocalDateTime.now());
        
        Campaign updatedCampaign = campaignRepository.save(campaign);
        log.info("Kampania zakończona: {}", updatedCampaign.getId());
        
        return mapToCampaignResponse(updatedCampaign);
    }
    
    private void sendCampaignEmails(Campaign campaign, Long userId) {
        log.info("Wysyłanie maili kampanii {} do {} odbiorców", campaign.getId(), campaign.getRecipients().size());

        List<String> recipientEmails = campaign.getRecipients().stream()
                .filter(contact -> contact.getStatus() == Contact.ContactStatus.ACTIVE)
                .map(Contact::getEmail)
                .collect(Collectors.toList());

        if (recipientEmails.isEmpty()) {
            throw new RuntimeException("Brak aktywnych odbiorców do wysłania kampanii");
        }

        String emailContent = campaign.getContent();
        String emailSubject = campaign.getSubject();

        if (campaign.getTemplate() != null) {
            emailContent = campaign.getTemplate().getContent();
            emailSubject = campaign.getTemplate().getSubject();
        }

        int successCount = 0;
        int failureCount = 0;

        for (String recipientEmail : recipientEmails) {
            try {
                SendEmailRequest emailRequest = SendEmailRequest.builder()
                        .to(List.of(recipientEmail))
                        .subject(emailSubject)
                        .html(emailContent)
                        .build();

                SendEmailResponse response = resendEmailService.sendEmail(emailRequest, userId);

                if ("success".equals(response.getStatus())) {
                    successCount++;
                    log.debug("Email wysłany pomyślnie do: {}", recipientEmail);
                } else {
                    failureCount++;
                    log.warn("Błąd wysyłania email do {}: {}", recipientEmail, response.getMessage());
                }
            } catch (Exception e) {
                failureCount++;
                log.error("Wyjątek podczas wysyłania email do {}: {}", recipientEmail, e.getMessage());
            }
        }

        if (successCount == 0) {
            throw new RuntimeException("Nie udało się wysłać żadnego emaila");
        }

        if (failureCount > 0) {
            log.warn("Kampania {} - wysłano: {}, błędy: {}", campaign.getId(), successCount, failureCount);
        }

        log.info("Pomyślnie wysłano maile kampanii {} do {}/{} odbiorców", 
                campaign.getId(), successCount, recipientEmails.size());
    }
    
    private CampaignResponse mapToCampaignResponse(Campaign campaign) {
        return CampaignResponse.builder()
                .id(campaign.getId())
                .name(campaign.getName())
                .subject(campaign.getSubject())
                .content(campaign.getContent())
                .description(campaign.getDescription())
                .status(campaign.getStatus().name().toLowerCase())
                .scheduledAt(campaign.getScheduledAt())
                .startedAt(campaign.getStartedAt())
                .completedAt(campaign.getCompletedAt())
                .totalRecipients(campaign.getTotalRecipients())
                .sentEmails(campaign.getSentEmails())
                .openedEmails(campaign.getOpenedEmails())
                .clickedEmails(campaign.getClickedEmails())
                .createdAt(campaign.getCreatedAt())
                .updatedAt(campaign.getUpdatedAt())
                .template(campaign.getTemplate() != null ? 
                    maile.com.example.mailer.dto.EmailTemplateResponse.builder()
                        .id(campaign.getTemplate().getId())
                        .name(campaign.getTemplate().getName())
                        .subject(campaign.getTemplate().getSubject())
                        .content(campaign.getTemplate().getContent())
                        .description(campaign.getTemplate().getDescription())
                        .status(campaign.getTemplate().getStatus().name().toLowerCase())
                        .createdAt(campaign.getTemplate().getCreatedAt())
                        .updatedAt(campaign.getTemplate().getUpdatedAt())
                        .build() : null)
                .recipients(campaign.getRecipients() != null ? 
                    campaign.getRecipients().stream()
                        .map(contact -> maile.com.example.mailer.dto.ContactResponse.builder()
                            .id(contact.getId())
                            .email(contact.getEmail())
                            .firstName(contact.getFirstName())
                            .status(contact.getStatus().name().toLowerCase())
                            .tags(contact.getTags())
                            .createdAt(contact.getCreatedAt())
                            .build())
                        .collect(Collectors.toList()) : null)
                .build();
    }
}