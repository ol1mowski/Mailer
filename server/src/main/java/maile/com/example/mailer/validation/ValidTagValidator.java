package maile.com.example.mailer.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import maile.com.example.mailer.entity.Contact;

public class ValidTagValidator implements ConstraintValidator<ValidTag, String> {
    
    @Override
    public boolean isValid(String tag, ConstraintValidatorContext context) {
        if (tag == null || tag.trim().isEmpty()) {
            return true;
        }
        return Contact.ContactTag.isValidTag(tag.trim());
    }
} 