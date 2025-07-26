package maile.com.example.mailer.repository;

import maile.com.example.mailer.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    
    @Query("SELECT COUNT(c) FROM Contact c WHERE c.user.id = :userId")
    Long countByUserId(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(c) FROM Contact c WHERE c.user.id = :userId AND c.status = 'ACTIVE'")
    Long countActiveContactsByUserId(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(c) FROM Contact c WHERE c.user.id = :userId AND c.status = 'INACTIVE'")
    Long countInactiveContactsByUserId(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(c) FROM Contact c WHERE c.user.id = :userId AND 'VIP' MEMBER OF c.tags")
    Long countVipContactsByUserId(@Param("userId") Long userId);
    
    @Query("SELECT c FROM Contact c WHERE c.user.id = :userId ORDER BY c.createdAt DESC")
    List<Contact> findAllByUserIdOrderByCreatedAtDesc(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(c) > 0 FROM Contact c WHERE c.email = :email AND c.user.id = :userId")
    boolean existsByEmailAndUserId(@Param("email") String email, @Param("userId") Long userId);
    
    @Query("SELECT c FROM Contact c WHERE c.id = :contactId AND c.user.id = :userId")
    java.util.Optional<Contact> findByIdAndUserId(@Param("contactId") Long contactId, @Param("userId") Long userId);
} 