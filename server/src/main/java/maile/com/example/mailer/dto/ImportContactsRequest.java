package maile.com.example.mailer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImportContactsRequest {
    
    @NotEmpty(message = "Lista kontaktów nie może być pusta")
    @Size(max = 1000, message = "Maksymalnie 1000 kontaktów na raz")
    @Valid
    private List<CreateContactRequest> contacts;
} 