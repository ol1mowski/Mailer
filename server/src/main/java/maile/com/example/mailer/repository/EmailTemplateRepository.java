package maile.com.example.mailer.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import maile.com.example.mailer.entity.EmailTemplate;

@Repository
public interface EmailTemplateRepository extends JpaRepository<EmailTemplate, Long> {
    
    @Query("SELECT COUNT(t) FROM EmailTemplate t WHERE t.user.id = :userId")
    Long countByUserId(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(t) FROM EmailTemplate t WHERE t.user.id = :userId AND t.status = 'ACTIVE'")
    Long countActiveTemplatesByUserId(@Param("userId") Long userId);
    
    @Query("SELECT t FROM EmailTemplate t WHERE t.user.id = :userId ORDER BY t.createdAt DESC")
    List<EmailTemplate> findAllByUserIdOrderByCreatedAtDesc(@Param("userId") Long userId);
    
    @Query("SELECT t FROM EmailTemplate t WHERE t.id = :templateId AND t.user.id = :userId")
    Optional<EmailTemplate> findByIdAndUserId(@Param("templateId") Long templateId, @Param("userId") Long userId);
} 