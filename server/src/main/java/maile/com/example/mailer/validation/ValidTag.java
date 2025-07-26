package maile.com.example.mailer.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = ValidTagValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidTag {
    String message() default "Nieprawidłowy tag";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
} 