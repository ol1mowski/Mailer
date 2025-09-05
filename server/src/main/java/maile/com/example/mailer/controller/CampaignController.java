package maile.com.example.mailer.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import maile.com.example.mailer.dto.CampaignResponse;
import maile.com.example.mailer.dto.CreateCampaignRequest;
import maile.com.example.mailer.dto.UpdateCampaignRequest;
import maile.com.example.mailer.entity.User;
import maile.com.example.mailer.service.CampaignService;

@RestController
@RequestMapping("/api/campaigns")
@RequiredArgsConstructor
@Slf4j
public class CampaignController extends BaseController {
    
    private final CampaignService campaignService;
    
    @GetMapping
    public ResponseEntity<List<CampaignResponse>> getAllCampaigns() {
        try {
            Long userId = getCurrentUserId();
            List<CampaignResponse> campaigns = campaignService.getAllCampaigns(userId);
            log.info("Pobrano kampanie dla użytkownika: {}", userId);
            
            return ResponseEntity.ok(campaigns);
        } catch (Exception e) {
            log.error("Błąd podczas pobierania kampanii: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<CampaignResponse> createCampaign(@Valid @RequestBody CreateCampaignRequest request) {
        try {
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
            
            CampaignResponse campaign = campaignService.createCampaign(request, userId);
            log.info("Utworzono kampanię dla użytkownika: {}", userId);
            
            return ResponseEntity.ok(campaign);
        } catch (Exception e) {
            log.error("Błąd podczas tworzenia kampanii: ", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{campaignId}")
    public ResponseEntity<CampaignResponse> updateCampaign(
            @PathVariable Long campaignId,
            @Valid @RequestBody UpdateCampaignRequest request) {
        try {
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
            
            CampaignResponse campaign = campaignService.updateCampaign(campaignId, request, userId);
            log.info("Zaktualizowano kampanię {} dla użytkownika: {}", campaignId, userId);
            
            return ResponseEntity.ok(campaign);
        } catch (Exception e) {
            log.error("Błąd podczas aktualizacji kampanii: ", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{campaignId}")
    public ResponseEntity<Void> deleteCampaign(@PathVariable Long campaignId) {
        try {
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
            
            campaignService.deleteCampaign(campaignId, userId);
            log.info("Usunięto kampanię {} dla użytkownika: {}", campaignId, userId);
            
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Błąd podczas usuwania kampanii: ", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/{campaignId}/start")
    public ResponseEntity<CampaignResponse> startCampaign(@PathVariable Long campaignId) {
        try {
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
            
            CampaignResponse campaign = campaignService.startCampaign(campaignId, userId);
            log.info("Uruchomiono kampanię {} dla użytkownika: {}", campaignId, userId);
            
            return ResponseEntity.ok(campaign);
        } catch (Exception e) {
            log.error("Błąd podczas uruchamiania kampanii: ", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/{campaignId}/pause")
    public ResponseEntity<CampaignResponse> pauseCampaign(@PathVariable Long campaignId) {
        try {
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
            
            CampaignResponse campaign = campaignService.pauseCampaign(campaignId, userId);
            log.info("Wstrzymano kampanię {} dla użytkownika: {}", campaignId, userId);
            
            return ResponseEntity.ok(campaign);
        } catch (Exception e) {
            log.error("Błąd podczas wstrzymywania kampanii: ", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/{campaignId}/complete")
    public ResponseEntity<CampaignResponse> completeCampaign(@PathVariable Long campaignId) {
        try {
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
            
            CampaignResponse campaign = campaignService.completeCampaign(campaignId, userId);
            log.info("Zakończono kampanię {} dla użytkownika: {}", campaignId, userId);
            
            return ResponseEntity.ok(campaign);
        } catch (Exception e) {
            log.error("Błąd podczas kończenia kampanii: ", e);
            return ResponseEntity.badRequest().build();
        }
    }
}