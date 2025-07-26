package maile.com.example.mailer.repository;

import maile.com.example.mailer.entity.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmailRepository extends JpaRepository<Email, Long> {
    
    @Query("SELECT COUNT(e) FROM Email e WHERE e.user.id = :userId")
    Long countByUserId(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(e) FROM Email e WHERE e.user.id = :userId AND e.status = 'OPENED'")
    Long countOpenedEmailsByUserId(@Param("userId") Long userId);
    
    @Query("SELECT e FROM Email e WHERE e.user.id = :userId ORDER BY e.createdAt DESC LIMIT 10")
    List<Email> findRecentEmailsByUserId(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(e) FROM Email e WHERE e.user.id = :userId AND e.createdAt >= :startDate")
    Long countEmailsByUserIdAndDateAfter(@Param("userId") Long userId, @Param("startDate") java.time.LocalDateTime startDate);
} 