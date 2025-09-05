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
    
    
    private UserSettings createDefaultUserSettings(Long userId) {
        log.info("Tworzenie domyślnych ustawień dla użytkownika: {}", userId);
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Użytkownik nie został znaleziony"));
        
        UserSettings defaultSettings = UserSettings.builder()
                .user(user)
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .timezone("Europe/Warsaw")
                .smtpEncryption("TLS")
                .accountStatus(UserSettings.AccountStatus.ACTIVE)
                .subscriptionPlan("FREE")
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
                .createdAt(userSettings.getCreatedAt())
                .updatedAt(userSettings.getUpdatedAt())
                .build();
    }
}