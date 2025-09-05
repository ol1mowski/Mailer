package maile.com.example.mailer.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import maile.com.example.mailer.dto.UpdateUserSettingsRequest;
import maile.com.example.mailer.dto.UserSettingsResponse;
import maile.com.example.mailer.entity.User;
import maile.com.example.mailer.entity.UserSettings;
import maile.com.example.mailer.repository.UserRepository;
import maile.com.example.mailer.repository.UserSettingsRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserSettingsService {
    
    private final UserSettingsRepository userSettingsRepository;
    private final UserRepository userRepository;
    
    public UserSettingsResponse getUserSettings(Long userId) {
        log.info("Pobieranie ustawień dla użytkownika: {}", userId);
        
        UserSettings userSettings = userSettingsRepository.findByUserId(userId)
                .orElseGet(() -> createDefaultUserSettings(userId));
        
        return mapToUserSettingsResponse(userSettings);
    }
    
    @Transactional
    public UserSettingsResponse updateUserSettings(Long userId, UpdateUserSettingsRequest request) {
        log.info("Aktualizacja ustawień dla użytkownika: {}", userId);
        
        UserSettings userSettings = userSettingsRepository.findByUserId(userId)
                .orElseGet(() -> createDefaultUserSettings(userId));
        
        userSettings.setFirstName(request.getFirstName());
        userSettings.setLastName(request.getLastName());
        userSettings.setTimezone(request.getTimezone());
        
        if (request.getEmailNotifications() != null) {
            userSettings.setEmailNotifications(request.getEmailNotifications());
        }
        if (request.getSmsNotifications() != null) {
            userSettings.setSmsNotifications(request.getSmsNotifications());
        }
        if (request.getCampaignNotifications() != null) {
            userSettings.setCampaignNotifications(request.getCampaignNotifications());
        }
        if (request.getWeeklyReports() != null) {
            userSettings.setWeeklyReports(request.getWeeklyReports());
        }
        if (request.getMonthlyReports() != null) {
            userSettings.setMonthlyReports(request.getMonthlyReports());
        }
        
        if (request.getLoginNotifications() != null) {
            userSettings.setLoginNotifications(request.getLoginNotifications());
        }
        if (request.getPasswordChangeReminder() != null) {
            userSettings.setPasswordChangeReminder(request.getPasswordChangeReminder());
        }
                
        userSettings.setSmtpHost(request.getSmtpHost());
        userSettings.setSmtpPort(request.getSmtpPort());
        userSettings.setSmtpUsername(request.getSmtpUsername());
        if (request.getSmtpPassword() != null && !request.getSmtpPassword().isEmpty()) {
            userSettings.setSmtpPassword(request.getSmtpPassword());
        }
        userSettings.setSmtpEncryption(request.getSmtpEncryption());
        userSettings.setFromEmail(request.getFromEmail());
        userSettings.setFromName(request.getFromName());
        userSettings.setReplyToEmail(request.getReplyToEmail());
        
        UserSettings savedSettings = userSettingsRepository.save(userSettings);
        log.info("Ustawienia zaktualizowane dla użytkownika: {}", userId);
        
        return mapToUserSettingsResponse(savedSettings);
    }
    
    @Transactional
    public UserSettingsResponse toggleNotification(Long userId, String notificationType) {
        log.info("Przełączanie powiadomienia {} dla użytkownika: {}", notificationType, userId);
        
        UserSettings userSettings = userSettingsRepository.findByUserId(userId)
                .orElseGet(() -> createDefaultUserSettings(userId));
        
        switch (notificationType.toLowerCase()) {
            case "email":
                userSettings.setEmailNotifications(!userSettings.getEmailNotifications());
                break;
            case "sms":
                userSettings.setSmsNotifications(!userSettings.getSmsNotifications());
                break;
            case "campaign":
                userSettings.setCampaignNotifications(!userSettings.getCampaignNotifications());
                break;
            case "weekly":
                userSettings.setWeeklyReports(!userSettings.getWeeklyReports());
                break;
            case "monthly":
                userSettings.setMonthlyReports(!userSettings.getMonthlyReports());
                break;
            case "login":
                userSettings.setLoginNotifications(!userSettings.getLoginNotifications());
                break;
            case "password":
                userSettings.setPasswordChangeReminder(!userSettings.getPasswordChangeReminder());
                break;
            default:
                throw new IllegalArgumentException("Nieznany typ powiadomienia: " + notificationType);
        }
        
        UserSettings savedSettings = userSettingsRepository.save(userSettings);
        log.info("Powiadomienie {} przełączone dla użytkownika: {}", notificationType, userId);
        
        return mapToUserSettingsResponse(savedSettings);
    }
    
    private UserSettings createDefaultUserSettings(Long userId) {
        log.info("Tworzenie domyślnych ustawień dla użytkownika: {}", userId);
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Użytkownik nie został znaleziony"));
        
        UserSettings defaultSettings = UserSettings.builder()
                .user(user)
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .timezone("Europe/Warsaw")
                .emailNotifications(true)
                .smsNotifications(false)
                .campaignNotifications(true)
                .weeklyReports(true)
                .monthlyReports(true)
                .loginNotifications(true)
                .passwordChangeReminder(true)
                .smtpEncryption("TLS")
                .accountStatus(UserSettings.AccountStatus.ACTIVE)
                .subscriptionPlan("FREE")
                .storageUsed(0L)
                .storageLimit(1000000000L) // 1GB
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        
        return userSettingsRepository.save(defaultSettings);
    }
    
    private UserSettingsResponse mapToUserSettingsResponse(UserSettings userSettings) {
        return UserSettingsResponse.builder()
                .firstName(userSettings.getFirstName())
                .lastName(userSettings.getLastName())
                .timezone(userSettings.getTimezone())
                .emailNotifications(userSettings.getEmailNotifications())
                .smsNotifications(userSettings.getSmsNotifications())
                .campaignNotifications(userSettings.getCampaignNotifications())
                .weeklyReports(userSettings.getWeeklyReports())
                .monthlyReports(userSettings.getMonthlyReports())
                .loginNotifications(userSettings.getLoginNotifications())
                .passwordChangeReminder(userSettings.getPasswordChangeReminder())
                .smtpHost(userSettings.getSmtpHost())
                .smtpPort(userSettings.getSmtpPort())
                .smtpUsername(userSettings.getSmtpUsername())
                .smtpEncryption(userSettings.getSmtpEncryption())
                .fromEmail(userSettings.getFromEmail())
                .fromName(userSettings.getFromName())
                .replyToEmail(userSettings.getReplyToEmail())
                .accountStatus(userSettings.getAccountStatus())
                .subscriptionPlan(userSettings.getSubscriptionPlan())
                .subscriptionExpires(userSettings.getSubscriptionExpires())
                .storageUsed(userSettings.getStorageUsed())
                .storageLimit(userSettings.getStorageLimit())
                .createdAt(userSettings.getCreatedAt())
                .updatedAt(userSettings.getUpdatedAt())
                .build();
    }
}