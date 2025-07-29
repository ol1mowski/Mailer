package maile.com.example.mailer.controller;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import maile.com.example.mailer.dto.AnalyticsResponse;
import maile.com.example.mailer.dto.BestHoursResponse;
import maile.com.example.mailer.dto.CampaignPerformanceResponse;
import maile.com.example.mailer.dto.ExportDataRequest;
import maile.com.example.mailer.dto.MonthlyDataResponse;
import maile.com.example.mailer.dto.TrendDataResponse;
import maile.com.example.mailer.entity.User;
import maile.com.example.mailer.repository.UserRepository;
import maile.com.example.mailer.service.AnalyticsService;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
@Slf4j
public class AnalyticsController {
    
    private final AnalyticsService analyticsService;
    private final UserRepository userRepository;
    
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
    
    @GetMapping
    public ResponseEntity<AnalyticsResponse> getAnalytics(
            @RequestParam(defaultValue = "30d") String period) {
        
        try {
            Long userId = getCurrentUserId();
            AnalyticsResponse analytics = analyticsService.getAnalytics(userId, period);
            return ResponseEntity.ok(analytics);
        } catch (Exception e) {
            log.error("Błąd podczas pobierania analityki: ", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/campaign-performance")
    public ResponseEntity<List<CampaignPerformanceResponse>> getCampaignPerformance(
            @RequestParam(defaultValue = "30d") String period) {
        
        try {
            Long userId = getCurrentUserId();
            List<CampaignPerformanceResponse> performance = analyticsService.getCampaignPerformance(userId, period);
            return ResponseEntity.ok(performance);
        } catch (Exception e) {
            log.error("Błąd podczas pobierania wydajności kampanii: ", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/monthly-data")
    public ResponseEntity<List<MonthlyDataResponse>> getMonthlyData(
            @RequestParam(defaultValue = "30d") String period) {
        
        try {
            Long userId = getCurrentUserId();
            List<MonthlyDataResponse> monthlyData = analyticsService.getMonthlyData(userId, period);
            return ResponseEntity.ok(monthlyData);
        } catch (Exception e) {
            log.error("Błąd podczas pobierania danych miesięcznych: ", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/best-hours")
    public ResponseEntity<List<BestHoursResponse>> getBestHours() {
        
        try {
            Long userId = getCurrentUserId();
            List<BestHoursResponse> bestHours = analyticsService.getBestHours(userId);
            return ResponseEntity.ok(bestHours);
        } catch (Exception e) {
            log.error("Błąd podczas pobierania najlepszych godzin: ", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/trends")
    public ResponseEntity<List<TrendDataResponse>> getTrends(
            @RequestParam(defaultValue = "30d") String period) {
        
        try {
            Long userId = getCurrentUserId();
            List<TrendDataResponse> trends = analyticsService.getTrends(userId, period);
            return ResponseEntity.ok(trends);
        } catch (Exception e) {
            log.error("Błąd podczas pobierania trendów: ", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/export")
    public ResponseEntity<String> exportData(@Valid @RequestBody ExportDataRequest request) {
        
        try {
            Long userId = getCurrentUserId();
            String result = analyticsService.exportData(userId, request.getPeriod(), request.getFormat());
            
            if ("xml".equalsIgnoreCase(request.getFormat())) {
                // Zwróć XML jako plik do pobrania
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_XML);
                headers.setContentDispositionFormData("attachment", "analytics_" + request.getPeriod() + ".xml");
                
                return ResponseEntity.ok()
                    .headers(headers)
                    .body(result);
            }
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("Błąd podczas eksportu danych: ", e);
            return ResponseEntity.badRequest().build();
        }
    }
}