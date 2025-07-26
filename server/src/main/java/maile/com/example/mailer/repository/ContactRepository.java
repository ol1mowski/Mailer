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
    
    @Query("SELECT COUNT(c) FROM Contact c WHERE c.user.id = :userId AND c.phone IS NOT NULL AND c.phone != ''")
    Long countContactsWithPhoneByUserId(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(c) FROM Contact c WHERE c.user.id = :userId AND c.company IS NOT NULL AND c.company != ''")
    Long countContactsWithCompanyByUserId(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(c) FROM Contact c WHERE c.user.id = :userId AND 'VIP' MEMBER OF c.tags")
    Long countVipContactsByUserId(@Param("userId") Long userId);
    
    @Query("SELECT c FROM Contact c WHERE c.user.id = :userId ORDER BY c.createdAt DESC")
    List<Contact> findAllByUserIdOrderByCreatedAtDesc(@Param("userId") Long userId);
} 