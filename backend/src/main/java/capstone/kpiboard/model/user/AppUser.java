package capstone.kpiboard.model.user;

import capstone.kpiboard.model.roles.TechnicalRole;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

public record AppUser(
        @Id
        @NotNull(message = "Bitte einen Benutzernamen eingeben")
        String username,
        @NotNull(message = "Bitte ein Passwort eingeben")
        String passwordHash,
        @NotNull(message = "Bitte eine Emailadresse eingeben")
        @Email(message = "Die Emailadresse ist nicht gültig.")
        String emailAddress,
        @NotNull(message = "Bitte eine Verantwortlichkeit eingeben")
        String kpiOwner,
        @NotNull(message = "Bitte eine technische Rolle eingeben")
        TechnicalRole technicalRole
) {
}
