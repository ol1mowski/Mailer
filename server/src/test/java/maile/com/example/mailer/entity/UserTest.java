package maile.com.example.mailer.entity;

import java.time.LocalDateTime;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

@DisplayName("User Entity Tests")
class UserTest {

    private Validator validator;
    private User user;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();

        user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password123");
        user.setFirstName("Jan");
        user.setLastName("Kowalski");
        user.setRole(User.UserRole.USER);
    }

    @Test
    @DisplayName("Should create valid user")
    void shouldCreateValidUser() {
        // When
        Set<ConstraintViolation<User>> violations = validator.validate(user);

        // Then
        assertThat(violations).isEmpty();
    }

    @Test
    @DisplayName("Should fail validation with invalid email")
    void shouldFailValidationWithInvalidEmail() {
        // Given
        user.setEmail("invalid-email");

        // When
        Set<ConstraintViolation<User>> violations = validator.validate(user);

        // Then
        assertThat(violations).isNotEmpty();
        assertThat(violations).anyMatch(violation -> 
            violation.getPropertyPath().toString().equals("email") &&
            violation.getMessage().contains("Nieprawidłowy format email")
        );
    }

    @Test
    @DisplayName("Should fail validation with empty email")
    void shouldFailValidationWithEmptyEmail() {
        // Given
        user.setEmail("");

        // When
        Set<ConstraintViolation<User>> violations = validator.validate(user);

        // Then
        assertThat(violations).isNotEmpty();
        assertThat(violations).anyMatch(violation -> 
            violation.getPropertyPath().toString().equals("email") &&
            violation.getMessage().contains("jest wymagany")
        );
    }

    @Test
    @DisplayName("Should fail validation with null email")
    void shouldFailValidationWithNullEmail() {
        // Given
        user.setEmail(null);

        // When
        Set<ConstraintViolation<User>> violations = validator.validate(user);

        // Then
        assertThat(violations).isNotEmpty();
        assertThat(violations).anyMatch(violation -> 
            violation.getPropertyPath().toString().equals("email") &&
            violation.getMessage().contains("jest wymagany")
        );
    }

    @Test
    @DisplayName("Should fail validation with short password")
    void shouldFailValidationWithShortPassword() {
        // Given
        user.setPassword("123");

        // When
        Set<ConstraintViolation<User>> violations = validator.validate(user);

        // Then
        assertThat(violations).isNotEmpty();
        assertThat(violations).anyMatch(violation -> 
            violation.getPropertyPath().toString().equals("password") &&
            violation.getMessage().contains("minimum 6 znaków")
        );
    }

    @Test
    @DisplayName("Should fail validation with empty password")
    void shouldFailValidationWithEmptyPassword() {
        // Given
        user.setPassword("");

        // When
        Set<ConstraintViolation<User>> violations = validator.validate(user);

                
        assertThat(violations).isNotEmpty();
        assertThat(violations).anyMatch(violation -> 
            violation.getPropertyPath().toString().equals("password") &&
            violation.getMessage().contains("jest wymagane")
        );
    }

    @Test
    @DisplayName("Should fail validation with empty first name")
    void shouldFailValidationWithEmptyFirstName() {
        // Given
        user.setFirstName("");

        // When
        Set<ConstraintViolation<User>> violations = validator.validate(user);

        // Then
        assertThat(violations).isNotEmpty();
        assertThat(violations).anyMatch(violation -> 
            violation.getPropertyPath().toString().equals("firstName") &&
            violation.getMessage().contains("jest wymagane")
        );
    }

    @Test
    @DisplayName("Should fail validation with empty last name")
    void shouldFailValidationWithEmptyLastName() {
        // Given
        user.setLastName("");

        
        Set<ConstraintViolation<User>> violations = validator.validate(user);

        
        assertThat(violations).isNotEmpty();
        assertThat(violations).anyMatch(violation -> 
            violation.getPropertyPath().toString().equals("lastName") &&
            violation.getMessage().contains("jest wymagane")
        );
    }

    @Test
    @DisplayName("Should implement UserDetails correctly")
    void shouldImplementUserDetailsCorrectly() {
        
        String username = user.getUsername();
        String password = user.getPassword();
        boolean isEnabled = user.isEnabled();
        boolean isAccountNonExpired = user.isAccountNonExpired();
        boolean isAccountNonLocked = user.isAccountNonLocked();
        boolean isCredentialsNonExpired = user.isCredentialsNonExpired();

        
        assertThat(username).isEqualTo("test@example.com");
        assertThat(password).isEqualTo("password123");
        assertThat(isEnabled).isTrue();
        assertThat(isAccountNonExpired).isTrue();
        assertThat(isAccountNonLocked).isTrue();
        assertThat(isCredentialsNonExpired).isTrue();
    }

    @Test
    @DisplayName("Should return correct authorities")
    void shouldReturnCorrectAuthorities() {
        // When
        var authorities = user.getAuthorities();

        
        assertThat(authorities).hasSize(1);
        assertThat(authorities).anyMatch(authority -> 
            authority instanceof SimpleGrantedAuthority &&
            authority.getAuthority().equals("ROLE_USER")
        );
    }

    @Test
    @DisplayName("Should return correct authorities for admin role")
    void shouldReturnCorrectAuthoritiesForAdminRole() {
        // Given
        user.setRole(User.UserRole.ADMIN);

        
        var authorities = user.getAuthorities();

        
        assertThat(authorities).hasSize(1);
        assertThat(authorities).anyMatch(authority -> 
            authority instanceof SimpleGrantedAuthority &&
            authority.getAuthority().equals("ROLE_ADMIN")
        );
    }

    @Test
    @DisplayName("Should set timestamps on persist")
    void shouldSetTimestampsOnPersist() {
        
        LocalDateTime beforePersist = LocalDateTime.now();

        
        user.onCreate();

        assertThat(user.getCreatedAt()).isNotNull();
        assertThat(user.getUpdatedAt()).isNotNull();
        assertThat(user.getCreatedAt()).isAfterOrEqualTo(beforePersist);
        assertThat(user.getUpdatedAt()).isAfterOrEqualTo(beforePersist);
    }

    @Test
    @DisplayName("Should update timestamp on update")
    void shouldUpdateTimestampOnUpdate() {      
        user.onCreate();
        LocalDateTime createdAt = user.getCreatedAt();
        LocalDateTime beforeUpdate = LocalDateTime.now();

        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        user.onUpdate();

        assertThat(user.getCreatedAt()).isEqualTo(createdAt);
        assertThat(user.getUpdatedAt()).isAfter(beforeUpdate);
        assertThat(user.getUpdatedAt()).isAfter(createdAt);
    }

    @Test
    @DisplayName("Should use constructor correctly")
    void shouldUseConstructorCorrectly() {
        User constructedUser = new User("test@example.com", "password123", "Jan", "Kowalski");

        assertThat(constructedUser.getEmail()).isEqualTo("test@example.com");
        assertThat(constructedUser.getPassword()).isEqualTo("password123");
        assertThat(constructedUser.getFirstName()).isEqualTo("Jan");
        assertThat(constructedUser.getLastName()).isEqualTo("Kowalski");
        assertThat(constructedUser.getRole()).isEqualTo(User.UserRole.USER);
    }

    @Test
    @DisplayName("Should handle disabled account")
    void shouldHandleDisabledAccount() {
        user.setEnabled(false);

        boolean isEnabled = user.isEnabled();

        // Then
        assertThat(isEnabled).isFalse();
    }

    @Test
    @DisplayName("Should handle expired account")
    void shouldHandleExpiredAccount() {
        user.setAccountNonExpired(false);

        boolean isAccountNonExpired = user.isAccountNonExpired();

        // Then
        assertThat(isAccountNonExpired).isFalse();
    }

    @Test
    @DisplayName("Should handle locked account")
    void shouldHandleLockedAccount() {
        user.setAccountNonLocked(false);

        boolean isAccountNonLocked = user.isAccountNonLocked();

        // Then
        assertThat(isAccountNonLocked).isFalse();
    }

    @Test
    @DisplayName("Should handle expired credentials")
    void shouldHandleExpiredCredentials() {
        user.setCredentialsNonExpired(false);

        boolean isCredentialsNonExpired = user.isCredentialsNonExpired();

        assertThat(isCredentialsNonExpired).isFalse();
    }
} 