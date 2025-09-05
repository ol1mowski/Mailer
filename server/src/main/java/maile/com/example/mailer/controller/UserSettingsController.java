package maile.com.example.mailer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import maile.com.example.mailer.dto.UpdateUserSettingsRequest;
import maile.com.example.mailer.dto.UserSettingsResponse;
import maile.com.example.mailer.entity.User;
import maile.com.example.mailer.repository.UserRepository;
import maile.com.example.mailer.service.UserSettingsService;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
@Slf4j
public class UserSettingsController {
    
    private final UserSettingsService userSettingsService;
    private final UserRepository userRepository;
    
    @GetMapping
    public ResponseEntity<UserSettingsResponse> getUserSettings() {
        try {
            Long userId = getCurrentUserId();
            UserSettingsResponse settings = userSettingsService.getUserSettings(userId);
            return ResponseEntity.ok(settings);
        } catch (Exception e) {
            log.error("Błąd podczas pobierania ustawień: ", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping
    public ResponseEntity<UserSettingsResponse> updateUserSettings(@Valid @RequestBody UpdateUserSettingsRequest request) {
        try {
            Long userId = getCurrentUserId();
            UserSettingsResponse settings = userSettingsService.updateUserSettings(userId, request);
            return ResponseEntity.ok(settings);
        } catch (Exception e) {
            log.error("Błąd podczas aktualizacji ustawień: ", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    
    private Long getCurrentUserId() {
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
        
        return userId;
    }
}