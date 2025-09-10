package maile.com.example.mailer.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import maile.com.example.mailer.dto.AuthResponse;
import maile.com.example.mailer.dto.LoginRequest;
import maile.com.example.mailer.dto.RegisterRequest;
import maile.com.example.mailer.entity.User;
import maile.com.example.mailer.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Autentykacja", description = "Endpointy do zarządzania autentykacją użytkowników")
public class AuthController {
    
    private final AuthService authService;
    
    @Value("${jwt.cookie-name}")
    private String cookieName;
    
    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    
    @PostMapping("/register")
    @Operation(summary = "Rejestracja nowego użytkownika", 
               description = "Tworzy nowe konto użytkownika i automatycznie loguje go")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Rejestracja zakończona pomyślnie",
                    content = @Content(mediaType = "application/json", 
                                     schema = @Schema(implementation = AuthResponse.class))),
        @ApiResponse(responseCode = "400", description = "Nieprawidłowe dane wejściowe",
                    content = @Content(mediaType = "application/json", 
                                     schema = @Schema(implementation = AuthResponse.class)))
    })
    public ResponseEntity<AuthResponse> register(
            @Parameter(description = "Dane rejestracyjne użytkownika", required = true)
            @Valid @RequestBody RegisterRequest request,
            HttpServletResponse httpResponse) {
        AuthResponse response = authService.register(request);
        
        if (response.isSuccess()) {
            User user = authService.getUserByEmail(request.getEmail());
            String token = authService.generateToken(user);
            setAuthCookie(httpResponse, token);
            
            return ResponseEntity.ok(AuthResponse.success("Rejestracja zakończona pomyślnie", user, token));
        }
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/login")
    @Operation(summary = "Logowanie użytkownika", 
               description = "Uwierzytelnia użytkownika i ustawia JWT token w HTTP-only cookie")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Logowanie zakończone pomyślnie",
                    content = @Content(mediaType = "application/json", 
                                     schema = @Schema(implementation = AuthResponse.class))),
        @ApiResponse(responseCode = "401", description = "Nieprawidłowe dane logowania",
                    content = @Content(mediaType = "application/json", 
                                     schema = @Schema(implementation = AuthResponse.class)))
    })
    public ResponseEntity<AuthResponse> login(
            @Parameter(description = "Dane logowania użytkownika", required = true)
            @Valid @RequestBody LoginRequest request, 
            HttpServletResponse httpResponse) {
        AuthResponse response = authService.login(request);
        
        if (response.isSuccess()) {
            User user = authService.getUserByEmail(request.getEmail());
            String token = authService.generateToken(user);
            setAuthCookie(httpResponse, token);
            
            return ResponseEntity.ok(AuthResponse.success("Logowanie zakończone pomyślnie", user, token));
        }
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/logout")
    @Operation(summary = "Wylogowanie użytkownika", 
               description = "Usuwa JWT token z HTTP-only cookie")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Wylogowanie zakończone pomyślnie",
                    content = @Content(mediaType = "application/json", 
                                     schema = @Schema(implementation = AuthResponse.class)))
    })
    public ResponseEntity<AuthResponse> logout(HttpServletResponse httpResponse) {
        Cookie cookie = new Cookie(cookieName, null);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // true w produkcji z HTTPS
        cookie.setMaxAge(0);
        httpResponse.addCookie(cookie);
        
        return ResponseEntity.ok(AuthResponse.success("Wylogowano pomyślnie"));
    }
    
    @GetMapping("/me")
    @Operation(summary = "Pobierz dane aktualnego użytkownika", 
               description = "Zwraca informacje o aktualnie zalogowanym użytkowniku")
    @SecurityRequirement(name = "JWT")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Dane użytkownika pobrane pomyślnie",
                    content = @Content(mediaType = "application/json", 
                                     schema = @Schema(implementation = AuthResponse.class))),
        @ApiResponse(responseCode = "401", description = "Użytkownik nie jest zalogowany",
                    content = @Content(mediaType = "application/json", 
                                     schema = @Schema(implementation = AuthResponse.class)))
    })
    public ResponseEntity<AuthResponse> getCurrentUser() {
        User currentUser = authService.getCurrentUser();
        if (currentUser != null) {
            return ResponseEntity.ok(AuthResponse.success("Użytkownik pobrany", currentUser));
        }
        return ResponseEntity.ok(AuthResponse.error("Nie zalogowano"));
    }
    
    private void setAuthCookie(HttpServletResponse httpResponse, String token) {
        Cookie cookie = new Cookie(cookieName, token);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setMaxAge(24 * 60 * 60);
        httpResponse.addCookie(cookie);
    }
} 