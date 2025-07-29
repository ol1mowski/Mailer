package maile.com.example.mailer.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import maile.com.example.mailer.entity.Analytics;

@Repository
public interface AnalyticsRepository extends JpaRepository<Analytics, Long> {
    
    @Query("SELECT a FROM Analytics a WHERE a.user.id = :userId AND a.periodStart >= :startDate AND a.periodEnd <= :endDate ORDER BY a.createdAt DESC")
    List<Analytics> findAllByUserIdAndPeriod(@Param("userId") Long userId, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT a FROM Analytics a WHERE a.user.id = :userId ORDER BY a.createdAt DESC")
    List<Analytics> findAllByUserIdOrderByCreatedAtDesc(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(a) FROM Analytics a WHERE a.user.id = :userId")
    Long countByUserId(@Param("userId") Long userId);
}