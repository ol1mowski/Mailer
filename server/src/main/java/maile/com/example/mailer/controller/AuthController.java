package maile.com.example.mailer.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {
    
    private final AuthService authService;
    
    @Value("${jwt.cookie-name}")
    private String cookieName;
    
    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request,
                                                HttpServletResponse httpResponse) {
        AuthResponse response = authService.register(request);
        
        if (response.isSuccess()) {
            User user = authService.getUserByEmail(request.getEmail());
            String token = authService.generateToken(user);
            setAuthCookie(httpResponse, token);
        }
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request, 
                                            HttpServletResponse httpResponse) {
        AuthResponse response = authService.login(request);
        
        if (response.isSuccess()) {
            User user = authService.getUserByEmail(request.getEmail());
            String token = authService.generateToken(user);
            setAuthCookie(httpResponse, token);
        }
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/logout")
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
    public ResponseEntity<AuthResponse> getCurrentUser() {
        User currentUser = authService.getCurrentUser();
        if (currentUser != null) {
            return ResponseEntity.ok(AuthResponse.success("Użytkownik pobrany", currentUser));
        }
        return ResponseEntity.ok(AuthResponse.error("Nie zalogowano"));
    }
    
    private void setAuthCookie(AuthResponse response, String token) {
        // Ta metoda nie jest potrzebna, ale zachowuję dla kompatybilności
    }
    
    private void setAuthCookie(HttpServletResponse httpResponse, String token) {
        Cookie cookie = new Cookie(cookieName, token);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(false); // true w produkcji z HTTPS
        cookie.setMaxAge(24 * 60 * 60); // 24 godziny
        httpResponse.addCookie(cookie);
    }
} 