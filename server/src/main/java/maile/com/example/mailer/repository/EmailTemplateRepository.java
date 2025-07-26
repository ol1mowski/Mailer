package maile.com.example.mailer.repository;

import maile.com.example.mailer.entity.EmailTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailTemplateRepository extends JpaRepository<EmailTemplate, Long> {
    
    @Query("SELECT COUNT(t) FROM EmailTemplate t WHERE t.user.id = :userId")
    Long countByUserId(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(t) FROM EmailTemplate t WHERE t.user.id = :userId AND t.status = 'ACTIVE'")
    Long countActiveTemplatesByUserId(@Param("userId") Long userId);
} 