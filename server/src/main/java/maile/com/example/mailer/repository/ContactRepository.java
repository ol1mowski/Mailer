package maile.com.example.mailer.repository;

import maile.com.example.mailer.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    
    @Query("SELECT COUNT(c) FROM Contact c WHERE c.user.id = :userId")
    Long countByUserId(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(c) FROM Contact c WHERE c.user.id = :userId AND c.status = 'ACTIVE'")
    Long countActiveContactsByUserId(@Param("userId") Long userId);
} 