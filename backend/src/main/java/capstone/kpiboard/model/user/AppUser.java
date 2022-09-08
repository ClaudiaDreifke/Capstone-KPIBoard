package capstone.kpiboard.model.user;

import org.springframework.data.annotation.Id;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

public record AppUser(
        @Id
        @NotNull
        String username,
        @NotNull
        String passwordHash,
        @Email
        String emailAddress,
        @NotNull
        String userRole
) {
}
