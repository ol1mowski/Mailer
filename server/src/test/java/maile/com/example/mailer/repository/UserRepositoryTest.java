package maile.com.example.mailer.repository;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import maile.com.example.mailer.entity.User;

@DataJpaTest
@ActiveProfiles("test")
@DisplayName("UserRepository Tests")
class UserRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setEmail("test@example.com");
        testUser.setPassword("encodedPassword");
        testUser.setFirstName("Jan");
        testUser.setLastName("Kowalski");
        testUser.setRole(User.UserRole.USER);
    }

    @Test
    @DisplayName("Should save user successfully")
    void shouldSaveUserSuccessfully() {
        // When
        User savedUser = userRepository.save(testUser);

        // Then
        assertThat(savedUser.getId()).isNotNull();
        assertThat(savedUser.getEmail()).isEqualTo("test@example.com");
        assertThat(savedUser.getFirstName()).isEqualTo("Jan");
        assertThat(savedUser.getLastName()).isEqualTo("Kowalski");
        assertThat(savedUser.getRole()).isEqualTo(User.UserRole.USER);
        assertThat(savedUser.getCreatedAt()).isNotNull();
        assertThat(savedUser.getUpdatedAt()).isNotNull();
    }

    @Test
    @DisplayName("Should find user by email when exists")
    void shouldFindUserByEmailWhenExists() {
        // Given
        User savedUser = entityManager.persistAndFlush(testUser);

        // When
        Optional<User> foundUser = userRepository.findByEmail("test@example.com");

        // Then
        assertThat(foundUser).isPresent();
        assertThat(foundUser.get().getId()).isEqualTo(savedUser.getId());
        assertThat(foundUser.get().getEmail()).isEqualTo("test@example.com");
    }

    @Test
    @DisplayName("Should return empty when user not found by email")
    void shouldReturnEmptyWhenUserNotFoundByEmail() {
        // When
        Optional<User> foundUser = userRepository.findByEmail("nonexistent@example.com");

        // Then
        assertThat(foundUser).isEmpty();
    }

    @Test
    @DisplayName("Should check if user exists by email when exists")
    void shouldCheckIfUserExistsByEmailWhenExists() {
        // Given
        entityManager.persistAndFlush(testUser);

        // When
        boolean exists = userRepository.existsByEmail("test@example.com");

        // Then
        assertThat(exists).isTrue();
    }

    @Test
    @DisplayName("Should check if user exists by email when not exists")
    void shouldCheckIfUserExistsByEmailWhenNotExists() {
        // When
        boolean exists = userRepository.existsByEmail("nonexistent@example.com");

        // Then
        assertThat(exists).isFalse();
    }

    @Test
    @DisplayName("Should update user successfully")
    void shouldUpdateUserSuccessfully() {
        // Given
        User savedUser = entityManager.persistAndFlush(testUser);
        savedUser.setFirstName("Piotr");
        savedUser.setLastName("Nowak");

        // When
        User updatedUser = userRepository.save(savedUser);

        // Then
        assertThat(updatedUser.getId()).isEqualTo(savedUser.getId());
        assertThat(updatedUser.getFirstName()).isEqualTo("Piotr");
        assertThat(updatedUser.getLastName()).isEqualTo("Nowak");
        assertThat(updatedUser.getUpdatedAt()).isAfterOrEqualTo(savedUser.getCreatedAt());
    }

    @Test
    @DisplayName("Should enforce unique email constraint")
    void shouldEnforceUniqueEmailConstraint() {
        // Given
        User firstUser = new User();
        firstUser.setEmail("duplicate@example.com");
        firstUser.setPassword("password1");
        firstUser.setFirstName("Jan");
        firstUser.setLastName("Kowalski");

        User secondUser = new User();
        secondUser.setEmail("duplicate@example.com");
        secondUser.setPassword("password2");
        secondUser.setFirstName("Piotr");
        secondUser.setLastName("Nowak");

        // When & Then
        entityManager.persistAndFlush(firstUser);
        
        // This should throw an exception due to unique constraint violation
        try {
            entityManager.persistAndFlush(secondUser);
            // If we reach here, the test should fail
            assertThat(false).isTrue();
        } catch (Exception e) {
            // Expected behavior - unique constraint violation
            assertThat(e).isNotNull();
        }
    }

    @Test
    @DisplayName("Should set default values correctly")
    void shouldSetDefaultValuesCorrectly() {
        // Given
        User user = new User();
        user.setEmail("default@example.com");
        user.setPassword("password");
        user.setFirstName("Jan");
        user.setLastName("Kowalski");

        // When
        User savedUser = userRepository.save(user);

        // Then
        assertThat(savedUser.getRole()).isEqualTo(User.UserRole.USER);
        assertThat(savedUser.isEnabled()).isTrue();
        assertThat(savedUser.isAccountNonExpired()).isTrue();
        assertThat(savedUser.isAccountNonLocked()).isTrue();
        assertThat(savedUser.isCredentialsNonExpired()).isTrue();
    }
} 