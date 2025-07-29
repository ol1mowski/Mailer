package maile.com.example.mailer.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import maile.com.example.mailer.entity.Campaign;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Long> {
    
    @Query("SELECT COUNT(c) FROM Campaign c WHERE c.user.id = :userId")
    Long countByUserId(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(c) FROM Campaign c WHERE c.user.id = :userId AND c.status = 'ACTIVE'")
    Long countActiveCampaignsByUserId(@Param("userId") Long userId);
    
    @Query("SELECT c FROM Campaign c WHERE c.user.id = :userId ORDER BY c.createdAt DESC")
    List<Campaign> findAllByUserIdOrderByCreatedAtDesc(@Param("userId") Long userId);
    
    @Query("SELECT c FROM Campaign c WHERE c.id = :campaignId AND c.user.id = :userId")
    Optional<Campaign> findByIdAndUserId(@Param("campaignId") Long campaignId, @Param("userId") Long userId);
}