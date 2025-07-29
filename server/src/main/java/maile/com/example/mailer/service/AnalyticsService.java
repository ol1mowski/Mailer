package maile.com.example.mailer.service;

import java.io.StringWriter;
import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import maile.com.example.mailer.dto.AnalyticsResponse;
import maile.com.example.mailer.dto.BestHoursResponse;
import maile.com.example.mailer.dto.CampaignPerformanceResponse;
import maile.com.example.mailer.dto.MonthlyDataResponse;
import maile.com.example.mailer.dto.TrendDataResponse;
import maile.com.example.mailer.entity.Campaign;
import maile.com.example.mailer.repository.CampaignRepository;
import maile.com.example.mailer.repository.UserRepository;

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
        
        if ("xml".equalsIgnoreCase(format)) {
            return generateXmlExport(userId, period);
        }
        
        // Dla innych formatów zwracamy komunikat
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

    private String generateXmlExport(Long userId, String period) {
        try {
            DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
            Document doc = docBuilder.newDocument();
            
            // Root element
            Element rootElement = doc.createElement("analytics");
            rootElement.setAttribute("period", period);
            rootElement.setAttribute("exportDate", LocalDateTime.now().toString());
            doc.appendChild(rootElement);
            
            // Pobierz dane analityczne
            AnalyticsResponse analytics = getAnalytics(userId, period);
            List<CampaignPerformanceResponse> campaignPerformance = getCampaignPerformance(userId, period);
            List<MonthlyDataResponse> monthlyData = getMonthlyData(userId, period);
            List<BestHoursResponse> bestHours = getBestHours(userId);
            List<TrendDataResponse> trends = getTrends(userId, period);
            
            // Dodaj główne statystyki
            Element summaryElement = doc.createElement("summary");
            addElement(doc, summaryElement, "totalEmails", analytics.getTotalEmails().toString());
            addElement(doc, summaryElement, "totalRecipients", analytics.getTotalRecipients().toString());
            addElement(doc, summaryElement, "totalOpens", analytics.getTotalOpens().toString());
            addElement(doc, summaryElement, "totalClicks", analytics.getTotalClicks().toString());
            addElement(doc, summaryElement, "averageOpenRate", analytics.getAverageOpenRate().toString());
            addElement(doc, summaryElement, "averageClickRate", analytics.getAverageClickRate().toString());
            addElement(doc, summaryElement, "bounceRate", analytics.getBounceRate().toString());
            addElement(doc, summaryElement, "unsubscribeRate", analytics.getUnsubscribeRate().toString());
            rootElement.appendChild(summaryElement);
            
            // Dodaj wydajność kampanii
            Element campaignsElement = doc.createElement("campaigns");
            for (CampaignPerformanceResponse campaign : campaignPerformance) {
                Element campaignElement = doc.createElement("campaign");
                addElement(doc, campaignElement, "name", campaign.getName());
                addElement(doc, campaignElement, "sent", campaign.getSent().toString());
                addElement(doc, campaignElement, "opened", campaign.getOpened().toString());
                addElement(doc, campaignElement, "clicked", campaign.getClicked().toString());
                addElement(doc, campaignElement, "openRate", campaign.getOpenRate().toString());
                addElement(doc, campaignElement, "clickRate", campaign.getClickRate().toString());
                campaignsElement.appendChild(campaignElement);
            }
            rootElement.appendChild(campaignsElement);
            
            // Dodaj dane miesięczne
            Element monthlyElement = doc.createElement("monthlyData");
            for (MonthlyDataResponse monthly : monthlyData) {
                Element monthElement = doc.createElement("month");
                addElement(doc, monthElement, "name", monthly.getMonth());
                addElement(doc, monthElement, "emails", monthly.getEmails().toString());
                addElement(doc, monthElement, "opens", monthly.getOpens().toString());
                addElement(doc, monthElement, "clicks", monthly.getClicks().toString());
                monthlyElement.appendChild(monthElement);
            }
            rootElement.appendChild(monthlyElement);
            
            // Dodaj najlepsze godziny
            Element bestHoursElement = doc.createElement("bestHours");
            for (BestHoursResponse hour : bestHours) {
                Element hourElement = doc.createElement("hour");
                addElement(doc, hourElement, "timeRange", hour.getTimeRange());
                addElement(doc, hourElement, "percentage", hour.getPercentage().toString());
                bestHoursElement.appendChild(hourElement);
            }
            rootElement.appendChild(bestHoursElement);
            
            // Dodaj trendy
            Element trendsElement = doc.createElement("trends");
            for (TrendDataResponse trend : trends) {
                Element trendElement = doc.createElement("trend");
                addElement(doc, trendElement, "metric", trend.getMetric());
                addElement(doc, trendElement, "change", trend.getChange().toString());
                addElement(doc, trendElement, "isPositive", trend.getIsPositive().toString());
                trendsElement.appendChild(trendElement);
            }
            rootElement.appendChild(trendsElement);
            
            // Konwertuj do stringa
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            StringWriter writer = new StringWriter();
            transformer.transform(new DOMSource(doc), new StreamResult(writer));
            
            return writer.toString();
            
        } catch (Exception e) {
            log.error("Błąd podczas generowania XML: ", e);
            return "Błąd podczas generowania pliku XML";
        }
    }
    
    private void addElement(Document doc, Element parent, String name, String value) {
        Element element = doc.createElement(name);
        element.appendChild(doc.createTextNode(value));
        parent.appendChild(element);
    }
}