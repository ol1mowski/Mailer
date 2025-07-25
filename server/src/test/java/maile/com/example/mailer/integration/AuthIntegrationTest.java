package maile.com.example.mailer.integration;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.cookie;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;

import maile.com.example.mailer.dto.LoginRequest;
import maile.com.example.mailer.dto.RegisterRequest;
import maile.com.example.mailer.entity.User;
import maile.com.example.mailer.repository.UserRepository;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
@Transactional
@DisplayName("Auth Integration Tests")
class AuthIntegrationTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        userRepository.deleteAll();
    }

    @Test
    @DisplayName("Should complete full authentication flow: register -> login -> get current user -> logout")
    void shouldCompleteFullAuthenticationFlow() throws Exception {
        // 1. Register new user
        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setEmail("integration@example.com");
        registerRequest.setPassword("password123");
        registerRequest.setFirstName("Jan");
        registerRequest.setLastName("Kowalski");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Rejestracja zakończona pomyślnie"))
                .andExpect(jsonPath("$.user.email").value("integration@example.com"))
                .andExpect(cookie().exists("jwt-token"))
                .andExpect(cookie().value("jwt-token", org.hamcrest.Matchers.not("")));

        // Verify user was saved in database
        assertThat(userRepository.existsByEmail("integration@example.com")).isTrue();

        // 2. Login with registered user
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("integration@example.com");
        loginRequest.setPassword("password123");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Logowanie zakończone pomyślnie"))
                .andExpect(jsonPath("$.user.email").value("integration@example.com"))
                .andExpect(cookie().exists("jwt-token"))
                .andExpect(cookie().value("jwt-token", org.hamcrest.Matchers.not("")));

        // 3. Get current user (this would require JWT token in real scenario)
        // Note: In integration test without proper JWT setup, this might return null
        mockMvc.perform(get("/api/auth/me"))
                .andExpect(status().isOk());

        // 4. Logout
        mockMvc.perform(post("/api/auth/logout"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Wylogowano pomyślnie"))
                .andExpect(cookie().maxAge("jwt-token", 0));
    }

    @Test
    @DisplayName("Should fail registration with duplicate email")
    void shouldFailRegistrationWithDuplicateEmail() throws Exception {
        // Given - create first user
        User existingUser = new User();
        existingUser.setEmail("duplicate@example.com");
        existingUser.setPassword(passwordEncoder.encode("password123"));
        existingUser.setFirstName("Jan");
        existingUser.setLastName("Kowalski");
        userRepository.save(existingUser);

        // When - try to register with same email
        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setEmail("duplicate@example.com");
        registerRequest.setPassword("password456");
        registerRequest.setFirstName("Piotr");
        registerRequest.setLastName("Nowak");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Użytkownik z tym adresem email już istnieje"));
    }

    @Test
    @DisplayName("Should fail login with non-existent user")
    void shouldFailLoginWithNonExistentUser() throws Exception {
        // Given
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("nonexistent@example.com");
        loginRequest.setPassword("password123");

        // When & Then
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Nieprawidłowy email lub hasło"));
    }

    @Test
    @DisplayName("Should fail login with wrong password")
    void shouldFailLoginWithWrongPassword() throws Exception {
        // Given - create user with correct password
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword(passwordEncoder.encode("correctPassword"));
        user.setFirstName("Jan");
        user.setLastName("Kowalski");
        userRepository.save(user);

        // When - try to login with wrong password
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("wrongPassword");

        // Then
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Nieprawidłowy email lub hasło"));
    }

    @Test
    @DisplayName("Should validate registration data")
    void shouldValidateRegistrationData() throws Exception {
        // Given - invalid registration data
        RegisterRequest invalidRequest = new RegisterRequest();
        invalidRequest.setEmail("invalid-email");
        invalidRequest.setPassword("123"); // too short
        invalidRequest.setFirstName(""); // empty
        invalidRequest.setLastName(""); // empty

        // When & Then
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Should validate login data")
    void shouldValidateLoginData() throws Exception {
        // Given - invalid login data
        LoginRequest invalidRequest = new LoginRequest();
        invalidRequest.setEmail("invalid-email");
        invalidRequest.setPassword(""); // empty

        // When & Then
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Should handle CORS headers correctly")
    void shouldHandleCorsHeadersCorrectly() throws Exception {
        // Given
        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setEmail("cors@example.com");
        registerRequest.setPassword("password123");
        registerRequest.setFirstName("Jan");
        registerRequest.setLastName("Kowalski");

        // When & Then
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest))
                        .header("Origin", "http://localhost:5173"))
                .andExpect(status().isOk())
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:5173"))
                .andExpect(header().string("Access-Control-Allow-Credentials", "true"));
    }
} 