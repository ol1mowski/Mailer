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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Kampanie", description = "Zarządzanie kampaniami emailowymi")
@SecurityRequirement(name = "JWT")
public class CampaignController extends BaseController {
    
    private final CampaignService campaignService;
    
    @GetMapping
    @Operation(summary = "Pobierz wszystkie kampanie", 
               description = "Zwraca listę wszystkich kampanii aktualnego użytkownika")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Kampanie pobrane pomyślnie"),
        @ApiResponse(responseCode = "500", description = "Błąd serwera")
    })
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
    @Operation(summary = "Utwórz nową kampanię", 
               description = "Tworzy nową kampanię emailową")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Kampania utworzona pomyślnie",
                    content = @Content(mediaType = "application/json", 
                                     schema = @Schema(implementation = CampaignResponse.class))),
        @ApiResponse(responseCode = "400", description = "Nieprawidłowe dane wejściowe")
    })
    public ResponseEntity<CampaignResponse> createCampaign(
            @Parameter(description = "Dane nowej kampanii", required = true)
            @Valid @RequestBody CreateCampaignRequest request) {
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
    @Operation(summary = "Zaktualizuj kampanię", 
               description = "Aktualizuje istniejącą kampanię")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Kampania zaktualizowana pomyślnie",
                    content = @Content(mediaType = "application/json", 
                                     schema = @Schema(implementation = CampaignResponse.class))),
        @ApiResponse(responseCode = "400", description = "Nieprawidłowe dane lub kampania nie istnieje")
    })
    public ResponseEntity<CampaignResponse> updateCampaign(
            @Parameter(description = "ID kampanii do aktualizacji", required = true)
            @PathVariable Long campaignId,
            @Parameter(description = "Nowe dane kampanii", required = true)
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
    @Operation(summary = "Usuń kampanię", 
               description = "Usuwa kampanię o podanym ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Kampania usunięta pomyślnie"),
        @ApiResponse(responseCode = "400", description = "Kampania nie istnieje lub błąd podczas usuwania")
    })
    public ResponseEntity<Void> deleteCampaign(
            @Parameter(description = "ID kampanii do usunięcia", required = true)
            @PathVariable Long campaignId) {
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
    @Operation(summary = "Uruchom kampanię", 
               description = "Uruchamia kampanię i rozpoczyna wysyłanie emailów")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Kampania uruchomiona pomyślnie",
                    content = @Content(mediaType = "application/json", 
                                     schema = @Schema(implementation = CampaignResponse.class))),
        @ApiResponse(responseCode = "400", description = "Nie można uruchomić kampanii")
    })
    public ResponseEntity<CampaignResponse> startCampaign(
            @Parameter(description = "ID kampanii do uruchomienia", required = true)
            @PathVariable Long campaignId) {
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
    @Operation(summary = "Wstrzymaj kampanię", 
               description = "Wstrzymuje aktywną kampanię")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Kampania wstrzymana pomyślnie",
                    content = @Content(mediaType = "application/json", 
                                     schema = @Schema(implementation = CampaignResponse.class))),
        @ApiResponse(responseCode = "400", description = "Nie można wstrzymać kampanii")
    })
    public ResponseEntity<CampaignResponse> pauseCampaign(
            @Parameter(description = "ID kampanii do wstrzymania", required = true)
            @PathVariable Long campaignId) {
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
    @Operation(summary = "Zakończ kampanię", 
               description = "Oznacza kampanię jako zakończoną")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Kampania zakończona pomyślnie",
                    content = @Content(mediaType = "application/json", 
                                     schema = @Schema(implementation = CampaignResponse.class))),
        @ApiResponse(responseCode = "400", description = "Nie można zakończyć kampanii")
    })
    public ResponseEntity<CampaignResponse> completeCampaign(
            @Parameter(description = "ID kampanii do zakończenia", required = true)
            @PathVariable Long campaignId) {
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