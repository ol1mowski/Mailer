package maile.com.example.mailer.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import maile.com.example.mailer.dto.DashboardStatsResponse;
import maile.com.example.mailer.dto.RecentActivityResponse;
import maile.com.example.mailer.entity.Activity;
import maile.com.example.mailer.repository.ActivityRepository;
import maile.com.example.mailer.repository.ContactRepository;
import maile.com.example.mailer.repository.EmailRepository;
import maile.com.example.mailer.repository.EmailTemplateRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class DashboardService {
    
    private final EmailRepository emailRepository;
    private final ContactRepository contactRepository;
    private final EmailTemplateRepository emailTemplateRepository;
    private final ActivityRepository activityRepository;
    
    public DashboardStatsResponse getDashboardStats(Long userId) {
        log.info("Pobieranie statystyk dashboard dla użytkownika: {}", userId);
        
        Long sentEmails = emailRepository.countByUserId(userId);
        Long contacts = contactRepository.countByUserId(userId);
        Long templates = emailTemplateRepository.countByUserId(userId);
        
        Long openedEmails = emailRepository.countOpenedEmailsByUserId(userId);
        Double openRate = sentEmails > 0 ? (double) openedEmails / sentEmails * 100 : 0.0;
        
        return DashboardStatsResponse.builder()
                .sentEmails(sentEmails)
                .contacts(contacts)
                .openRate(Math.round(openRate * 100.0) / 100.0) // Zaokrąglenie do 2 miejsc po przecinku
                .templates(templates)
                .build();
    }
    
    public List<RecentActivityResponse> getRecentActivities(Long userId) {
        log.info("Pobieranie ostatnich aktywności dla użytkownika: {}", userId);
        
        List<Activity> activities = activityRepository.findRecentActivitiesByUserId(userId);
        
        return activities.stream()
                .map(this::mapToActivityResponse)
                .collect(Collectors.toList());
    }
    
    private RecentActivityResponse mapToActivityResponse(Activity activity) {
        return RecentActivityResponse.builder()
                .id(activity.getId())
                .type(activity.getType())
                .description(activity.getDescription())
                .status(activity.getStatus().name().toLowerCase())
                .timestamp(activity.getCreatedAt())
                .build();
    }
} 