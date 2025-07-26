package maile.com.example.mailer.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import maile.com.example.mailer.dto.DashboardStatsResponse;
import maile.com.example.mailer.dto.RecentActivityResponse;
import maile.com.example.mailer.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@Slf4j
public class DashboardController {
    
    private final DashboardService dashboardService;
    
    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsResponse> getDashboardStats() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Long userId = authentication != null && authentication.getPrincipal() instanceof org.springframework.security.core.userdetails.UserDetails 
                ? Long.valueOf(((org.springframework.security.core.userdetails.UserDetails) authentication.getPrincipal()).getUsername())
                : 1L; 
            
            DashboardStatsResponse stats = dashboardService.getDashboardStats(userId);
            log.info("Pobrano statystyki dashboard dla użytkownika: {}", userId);
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            log.error("Błąd podczas pobierania statystyk dashboard: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/activities")
    public ResponseEntity<List<RecentActivityResponse>> getRecentActivities() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                Long userId = authentication != null && authentication.getPrincipal() instanceof org.springframework.security.core.userdetails.UserDetails 
                ? Long.valueOf(((org.springframework.security.core.userdetails.UserDetails) authentication.getPrincipal()).getUsername())
                : 1L; 
            
            List<RecentActivityResponse> activities = dashboardService.getRecentActivities(userId);
            log.info("Pobrano aktywności dla użytkownika: {}", userId);
            
            return ResponseEntity.ok(activities);
        } catch (Exception e) {
            log.error("Błąd podczas pobierania aktywności: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }
} 