package maile.com.example.mailer.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import maile.com.example.mailer.entity.UserSettings;

@Repository
public interface UserSettingsRepository extends JpaRepository<UserSettings, Long> {
    
    @Query("SELECT us FROM UserSettings us WHERE us.user.id = :userId")
    Optional<UserSettings> findByUserId(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(us) FROM UserSettings us WHERE us.user.id = :userId")
    Long countByUserId(@Param("userId") Long userId);
    
    @Query("SELECT us FROM UserSettings us WHERE us.user.email = :email")
    Optional<UserSettings> findByUserEmail(@Param("email") String email);
}