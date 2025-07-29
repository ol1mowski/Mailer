package maile.com.example.mailer.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import maile.com.example.mailer.dto.*;
import maile.com.example.mailer.entity.Campaign;
import maile.com.example.mailer.entity.User;
import maile.com.example.mailer.repository.CampaignRepository;
import maile.com.example.mailer.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnalyticsService {
    
    private final CampaignRepository campaignRepository;
    private final UserRepository userRepository;
    
    public AnalyticsResponse getAnalytics(Long userId, String period) {
        log.info("Pobieranie analityki dla użytkownika: {} i okresu: {}", userId, period);
        
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = calculateStartDate(period);
        
        List<Campaign> campaigns = campaignRepository.findAllByUserIdOrderByCreatedAtDesc(userId);
        
        // Filtruj kampanie według okresu
        List<Campaign> filteredCampaigns = campaigns.stream()
                .filter(campaign -> campaign.getCreatedAt().isAfter(startDate) && campaign.getCreatedAt().isBefore(endDate))
                .collect(Collectors.toList());
        
        int totalEmails = filteredCampaigns.size();
        int totalRecipients = filteredCampaigns.stream().mapToInt(Campaign::getTotalRecipients).sum();
        int totalOpens = filteredCampaigns.stream().mapToInt(Campaign::getOpenedEmails).sum();
        int totalClicks = filteredCampaigns.stream().mapToInt(Campaign::getClickedEmails).sum();
        
        double averageOpenRate = totalRecipients > 0 ? (double) totalOpens / totalRecipients * 100 : 0;
        double averageClickRate = totalRecipients > 0 ? (double) totalClicks / totalRecipients * 100 : 0;
        double bounceRate = 2.5; // Przykładowe dane
        double unsubscribeRate = 0.8; // Przykładowe dane
        
        return AnalyticsResponse.builder()
                .totalEmails(totalEmails)
                .totalRecipients(totalRecipients)
                .totalOpens(totalOpens)
                .totalClicks(totalClicks)
                .averageOpenRate(Math.round(averageOpenRate * 100.0) / 100.0)
                .averageClickRate(Math.round(averageClickRate * 100.0) / 100.0)
                .bounceRate(bounceRate)
                .unsubscribeRate(unsubscribeRate)
                .build();
    }
    
    public List<CampaignPerformanceResponse> getCampaignPerformance(Long userId, String period) {
        log.info("Pobieranie wydajności kampanii dla użytkownika: {} i okresu: {}", userId, period);
        
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = calculateStartDate(period);
        
        List<Campaign> campaigns = campaignRepository.findAllByUserIdOrderByCreatedAtDesc(userId);
        
        return campaigns.stream()
                .filter(campaign -> campaign.getCreatedAt().isAfter(startDate) && campaign.getCreatedAt().isBefore(endDate))
                .map(this::mapToCampaignPerformance)
                .collect(Collectors.toList());
    }
    
    public List<MonthlyDataResponse> getMonthlyData(Long userId, String period) {
        log.info("Pobieranie danych miesięcznych dla użytkownika: {} i okresu: {}", userId, period);
        
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = calculateStartDate(period);
        
        List<Campaign> campaigns = campaignRepository.findAllByUserIdOrderByCreatedAtDesc(userId);
        
        // Grupuj kampanie według miesięcy
        return campaigns.stream()
                .filter(campaign -> campaign.getCreatedAt().isAfter(startDate) && campaign.getCreatedAt().isBefore(endDate))
                .collect(Collectors.groupingBy(
                        campaign -> campaign.getCreatedAt().getMonth().getDisplayName(TextStyle.SHORT, new Locale("pl")),
                        Collectors.collectingAndThen(
                                Collectors.toList(),
                                campaignList -> {
                                    int emails = campaignList.size();
                                    int opens = campaignList.stream().mapToInt(Campaign::getOpenedEmails).sum();
                                    int clicks = campaignList.stream().mapToInt(Campaign::getClickedEmails).sum();
                                    return MonthlyDataResponse.builder()
                                            .emails(emails)
                                            .opens(opens)
                                            .clicks(clicks)
                                            .build();
                                }
                        )
                ))
                .entrySet().stream()
                .map(entry -> {
                    MonthlyDataResponse data = entry.getValue();
                    data.setMonth(entry.getKey());
                    return data;
                })
                .collect(Collectors.toList());
    }
    
    public List<BestHoursResponse> getBestHours(Long userId) {
        log.info("Pobieranie najlepszych godzin dla użytkownika: {}", userId);
        
        // Przykładowe dane - w rzeczywistej implementacji byłyby pobierane z bazy
        return List.of(
                BestHoursResponse.builder().timeRange("9:00 - 11:00").percentage(32.0).build(),
                BestHoursResponse.builder().timeRange("14:00 - 16:00").percentage(28.0).build(),
                BestHoursResponse.builder().timeRange("18:00 - 20:00").percentage(24.0).build(),
                BestHoursResponse.builder().timeRange("Inne").percentage(16.0).build()
        );
    }
    
    public List<TrendDataResponse> getTrends(Long userId, String period) {
        log.info("Pobieranie trendów dla użytkownika: {} i okresu: {}", userId, period);
        
        // Przykładowe dane - w rzeczywistej implementacji byłyby obliczane na podstawie historycznych danych
        return List.of(
                TrendDataResponse.builder().metric("Otwarcia").change(12.0).isPositive(true).build(),
                TrendDataResponse.builder().metric("Kliknięcia").change(8.0).isPositive(true).build(),
                TrendDataResponse.builder().metric("Odrzucenia").change(-5.0).isPositive(false).build(),
                TrendDataResponse.builder().metric("Wypisania").change(-2.0).isPositive(false).build()
        );
    }
    
    public String exportData(Long userId, String period, String format) {
        log.info("Eksport danych dla użytkownika: {}, okresu: {} i formatu: {}", userId, period, format);
        
        // W rzeczywistej implementacji tutaj byłaby logika generowania pliku
        // Na razie zwracamy przykładowy komunikat
        return "Dane zostały wyeksportowane w formacie " + format + " dla okresu " + period;
    }
    
    private LocalDateTime calculateStartDate(String period) {
        LocalDateTime now = LocalDateTime.now();
        return switch (period) {
            case "7d" -> now.minusDays(7);
            case "30d" -> now.minusDays(30);
            case "90d" -> now.minusDays(90);
            case "1y" -> now.minusYears(1);
            default -> now.minusDays(30);
        };
    }
    
    private CampaignPerformanceResponse mapToCampaignPerformance(Campaign campaign) {
        int sent = campaign.getSentEmails();
        int opened = campaign.getOpenedEmails();
        int clicked = campaign.getClickedEmails();
        
        double openRate = sent > 0 ? (double) opened / sent * 100 : 0;
        double clickRate = sent > 0 ? (double) clicked / sent * 100 : 0;
        
        return CampaignPerformanceResponse.builder()
                .name(campaign.getName())
                .sent(sent)
                .opened(opened)
                .clicked(clicked)
                .openRate(Math.round(openRate * 100.0) / 100.0)
                .clickRate(Math.round(clickRate * 100.0) / 100.0)
                .build();
    }
}