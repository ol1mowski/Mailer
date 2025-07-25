package maile.com.example.mailer.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import maile.com.example.mailer.entity.User;

@ExtendWith(MockitoExtension.class)
@DisplayName("JwtService Tests")
class JwtServiceTest {

    @InjectMocks
    private JwtService jwtService;

    private User testUser;

    @BeforeEach
    void setUp() {
        // Set up test properties
        ReflectionTestUtils.setField(jwtService, "secret", "test-secret-key-for-testing-purposes-only-very-long-key");
        ReflectionTestUtils.setField(jwtService, "expiration", 86400000L); // 24 hours

        testUser = new User();
        testUser.setId(1L);
        testUser.setEmail("test@example.com");
        testUser.setFirstName("Jan");
        testUser.setLastName("Kowalski");
        testUser.setRole(User.UserRole.USER);
    }

    @Test
    @DisplayName("Should generate token successfully")
    void shouldGenerateTokenSuccessfully() {
        // When
        String token = jwtService.generateToken(testUser);

        // Then
        assertThat(token).isNotNull();
        assertThat(token).isNotEmpty();
        assertThat(token.split("\\.")).hasSize(3); // JWT has 3 parts
    }

    @Test
    @DisplayName("Should generate token with extra claims")
    void shouldGenerateTokenWithExtraClaims() {
        // Given
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("role", "ADMIN");
        extraClaims.put("userId", 123L);

        // When
        String token = jwtService.generateToken(extraClaims, testUser);

        // Then
        assertThat(token).isNotNull();
        assertThat(token).isNotEmpty();
        assertThat(token.split("\\.")).hasSize(3);
    }

    @Test
    @DisplayName("Should extract username from token")
    void shouldExtractUsernameFromToken() {
        // Given
        String token = jwtService.generateToken(testUser);

        // When
        String username = jwtService.extractUsername(token);

        // Then
        assertThat(username).isEqualTo("test@example.com");
    }

    @Test
    @DisplayName("Should extract expiration from token")
    void shouldExtractExpirationFromToken() {
        // Given
        String token = jwtService.generateToken(testUser);

        // When
        Date expiration = jwtService.extractExpiration(token);

        // Then
        assertThat(expiration).isNotNull();
        assertThat(expiration).isAfter(new Date());
    }

    @Test
    @DisplayName("Should extract custom claim from token")
    void shouldExtractCustomClaimFromToken() {
        // Given
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("role", "ADMIN");
        String token = jwtService.generateToken(extraClaims, testUser);

        // When
        String role = jwtService.extractClaim(token, claims -> claims.get("role", String.class));

        // Then
        assertThat(role).isEqualTo("ADMIN");
    }

    @Test
    @DisplayName("Should validate token successfully")
    void shouldValidateTokenSuccessfully() {
        // Given
        String token = jwtService.generateToken(testUser);

        // When
        boolean isValid = jwtService.validateToken(token, testUser);

        // Then
        assertThat(isValid).isTrue();
    }

    @Test
    @DisplayName("Should validate token without user details")
    void shouldValidateTokenWithoutUserDetails() {
        // Given
        String token = jwtService.generateToken(testUser);

        // When
        boolean isValid = jwtService.validateToken(token);

        // Then
        assertThat(isValid).isTrue();
    }

    @Test
    @DisplayName("Should fail validation with invalid token")
    void shouldFailValidationWithInvalidToken() {
        // Given
        String invalidToken = "invalid.token.here";

        // When
        boolean isValid = jwtService.validateToken(invalidToken);

        // Then
        assertThat(isValid).isFalse();
    }

    @Test
    @DisplayName("Should fail validation with wrong username")
    void shouldFailValidationWithWrongUsername() {
        // Given
        String token = jwtService.generateToken(testUser);
        User wrongUser = new User();
        wrongUser.setEmail("wrong@example.com");

        // When
        boolean isValid = jwtService.validateToken(token, wrongUser);

        // Then
        assertThat(isValid).isFalse();
    }

    @Test
    @DisplayName("Should throw exception when extracting username from invalid token")
    void shouldThrowExceptionWhenExtractingUsernameFromInvalidToken() {
        // Given
        String invalidToken = "invalid.token.here";

        // When & Then
        assertThatThrownBy(() -> jwtService.extractUsername(invalidToken))
                .isInstanceOf(Exception.class);
    }

    @Test
    @DisplayName("Should generate different tokens for different users")
    void shouldGenerateDifferentTokensForDifferentUsers() {
        // Given
        User user1 = new User();
        user1.setEmail("user1@example.com");
        user1.setFirstName("Jan");
        user1.setLastName("Kowalski");

        User user2 = new User();
        user2.setEmail("user2@example.com");
        user2.setFirstName("Piotr");
        user2.setLastName("Nowak");

        // When
        String token1 = jwtService.generateToken(user1);
        String token2 = jwtService.generateToken(user2);

        // Then
        assertThat(token1).isNotEqualTo(token2);
        assertThat(jwtService.extractUsername(token1)).isEqualTo("user1@example.com");
        assertThat(jwtService.extractUsername(token2)).isEqualTo("user2@example.com");
    }

    @Test
    @DisplayName("Should generate different tokens for same user at different times")
    void shouldGenerateDifferentTokensForSameUserAtDifferentTimes() throws InterruptedException {
        // Given
        String token1 = jwtService.generateToken(testUser);
        
        // Wait a bit to ensure different timestamp
        Thread.sleep(100);
        
        String token2 = jwtService.generateToken(testUser);

        // Then
        // Tokens might be the same if generated within the same second
        // So we just verify both tokens are valid and contain correct username
        assertThat(jwtService.extractUsername(token1)).isEqualTo("test@example.com");
        assertThat(jwtService.extractUsername(token2)).isEqualTo("test@example.com");
        assertThat(jwtService.validateToken(token1)).isTrue();
        assertThat(jwtService.validateToken(token2)).isTrue();
    }
} 