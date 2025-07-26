package maile.com.example.mailer.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import maile.com.example.mailer.dto.ContactResponse;
import maile.com.example.mailer.dto.ContactStatsResponse;
import maile.com.example.mailer.dto.CreateContactRequest;
import maile.com.example.mailer.dto.UpdateContactRequest;
import maile.com.example.mailer.dto.ImportContactsRequest;
import maile.com.example.mailer.entity.Contact;
import maile.com.example.mailer.entity.User;
import maile.com.example.mailer.repository.ContactRepository;
import maile.com.example.mailer.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContactService {
    
    private final ContactRepository contactRepository;
    private final UserRepository userRepository;
    
    public ContactStatsResponse getContactStats(Long userId) {
        log.info("Pobieranie statystyk kontaktów dla użytkownika: {}", userId);
        
        Long total = contactRepository.countByUserId(userId);
        Long active = contactRepository.countActiveContactsByUserId(userId);
        Long inactive = contactRepository.countInactiveContactsByUserId(userId);
        Long vip = contactRepository.countVipContactsByUserId(userId);
        
        return ContactStatsResponse.builder()
                .total(total)
                .active(active)
                .inactive(inactive)
                .vip(vip)
                .build();
    }
    
    public List<ContactResponse> getAllContacts(Long userId) {
        log.info("Pobieranie wszystkich kontaktów dla użytkownika: {}", userId);
        
        List<Contact> contacts = contactRepository.findAllByUserIdOrderByCreatedAtDesc(userId);
        
        return contacts.stream()
                .map(this::mapToContactResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public ContactResponse createContact(CreateContactRequest request, Long userId) {
        log.info("Tworzenie nowego kontaktu dla użytkownika: {}", userId);
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Użytkownik nie został znaleziony"));
        
        if (contactRepository.existsByEmailAndUserId(request.getEmail(), userId)) {
            throw new RuntimeException("Kontakt z tym adresem email już istnieje");
        }
        
    
        if (request.getTags() != null) {
            for (String tag : request.getTags()) {
                if (!Contact.ContactTag.isValidTag(tag)) {
                    throw new RuntimeException("Nieprawidłowy tag: " + tag);
                }
            }
        }
        
        Contact contact = Contact.builder()
                .email(request.getEmail())
                .firstName(request.getFirstName())
                .tags(request.getTags() != null ? request.getTags() : List.of())
                .status(Contact.ContactStatus.valueOf(request.getStatus().toUpperCase()))
                .user(user)
                .build();
        
        Contact savedContact = contactRepository.save(contact);
        log.info("Kontakt utworzony z ID: {}", savedContact.getId());
        
        return mapToContactResponse(savedContact);
    }
    
    @Transactional
    public ContactResponse updateContact(Long contactId, UpdateContactRequest request, Long userId) {
        log.info("Aktualizacja kontaktu ID: {} dla użytkownika: {}", contactId, userId);
        
        Contact contact = contactRepository.findByIdAndUserId(contactId, userId)
                .orElseThrow(() -> new RuntimeException("Kontakt nie został znaleziony"));
        
        if (!contact.getEmail().equals(request.getEmail()) && 
            contactRepository.existsByEmailAndUserId(request.getEmail(), userId)) {
            throw new RuntimeException("Kontakt z tym adresem email już istnieje");
        }
        
        if (request.getTags() != null) {
            for (String tag : request.getTags()) {
                if (!Contact.ContactTag.isValidTag(tag)) {
                    throw new RuntimeException("Nieprawidłowy tag: " + tag);
                }
            }
        }
        
        contact.setEmail(request.getEmail());
        contact.setFirstName(request.getFirstName());
        contact.setTags(request.getTags() != null ? request.getTags() : List.of());
        if (request.getStatus() != null) {
            contact.setStatus(Contact.ContactStatus.valueOf(request.getStatus().toUpperCase()));
        }
        
        Contact updatedContact = contactRepository.save(contact);
        log.info("Kontakt zaktualizowany: {}", updatedContact.getId());
        
        return mapToContactResponse(updatedContact);
    }
    
    @Transactional
    public void deleteContact(Long contactId, Long userId) {
        log.info("Usuwanie kontaktu ID: {} dla użytkownika: {}", contactId, userId);
        
        Contact contact = contactRepository.findByIdAndUserId(contactId, userId)
                .orElseThrow(() -> new RuntimeException("Kontakt nie został znaleziony"));
        
        contactRepository.delete(contact);
        log.info("Kontakt usunięty: {}", contactId);
    }
    
    @Transactional
    public List<ContactResponse> importContacts(ImportContactsRequest request, Long userId) {
        log.info("Import {} kontaktów dla użytkownika: {}", request.getContacts().size(), userId);
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Użytkownik nie został znaleziony"));
        
        List<Contact> contacts = request.getContacts().stream()
                .map(contactRequest -> {
                    if (contactRepository.existsByEmailAndUserId(contactRequest.getEmail(), userId)) {
                        log.warn("Kontakt z email {} już istnieje, pomijam", contactRequest.getEmail());
                        return null;
                    }
                    
                    return Contact.builder()
                            .email(contactRequest.getEmail())
                            .firstName(contactRequest.getFirstName())
                            .tags(contactRequest.getTags() != null ? contactRequest.getTags() : List.of())
                            .status(Contact.ContactStatus.valueOf(contactRequest.getStatus().toUpperCase()))
                            .user(user)
                            .build();
                })
                .filter(contact -> contact != null)
                .collect(Collectors.toList());
        
        List<Contact> savedContacts = contactRepository.saveAll(contacts);
        log.info("Zaimportowano {} nowych kontaktów", savedContacts.size());
        
        return savedContacts.stream()
                .map(this::mapToContactResponse)
                .collect(Collectors.toList());
    }
    
    private ContactResponse mapToContactResponse(Contact contact) {
        return ContactResponse.builder()
                .id(contact.getId())
                .email(contact.getEmail())
                .firstName(contact.getFirstName())
                .status(contact.getStatus().name().toLowerCase())
                .tags(contact.getTags() != null ? contact.getTags() : List.of())
                .createdAt(contact.getCreatedAt())
                .build();
    }
} 