package maile.com.example.mailer.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import maile.com.example.mailer.dto.ContactResponse;
import maile.com.example.mailer.dto.ContactStatsResponse;
import maile.com.example.mailer.entity.Contact;
import maile.com.example.mailer.repository.ContactRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContactService {
    
    private final ContactRepository contactRepository;
    
    public ContactStatsResponse getContactStats(Long userId) {
        log.info("Pobieranie statystyk kontaktów dla użytkownika: {}", userId);
        
        Long total = contactRepository.countByUserId(userId);
        Long active = contactRepository.countActiveContactsByUserId(userId);
        Long inactive = contactRepository.countInactiveContactsByUserId(userId);
        Long vip = contactRepository.countVipContactsByUserId(userId);
        Long withPhone = contactRepository.countContactsWithPhoneByUserId(userId);
        Long withCompany = contactRepository.countContactsWithCompanyByUserId(userId);
        
        return ContactStatsResponse.builder()
                .total(total)
                .active(active)
                .inactive(inactive)
                .vip(vip)
                .withPhone(withPhone)
                .withCompany(withCompany)
                .build();
    }
    
    public List<ContactResponse> getAllContacts(Long userId) {
        log.info("Pobieranie wszystkich kontaktów dla użytkownika: {}", userId);
        
        List<Contact> contacts = contactRepository.findAllByUserIdOrderByCreatedAtDesc(userId);
        
        return contacts.stream()
                .map(this::mapToContactResponse)
                .collect(Collectors.toList());
    }
    
    private ContactResponse mapToContactResponse(Contact contact) {
        return ContactResponse.builder()
                .id(contact.getId())
                .email(contact.getEmail())
                .firstName(contact.getFirstName())
                .lastName(contact.getLastName())
                .phone(contact.getPhone())
                .company(contact.getCompany())
                .status(contact.getStatus().name().toLowerCase())
                .tags(contact.getTags() != null ? contact.getTags() : List.of())
                .createdAt(contact.getCreatedAt())
                .build();
    }
} 