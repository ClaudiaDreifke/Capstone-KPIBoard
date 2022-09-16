package capstone.kpiboard.model.user;

import capstone.kpiboard.model.roles.TechnicalRole;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public record NewAppUser(
        @Id
        @NotNull(message = "Bitte einen Benutzernamen eingeben")
        String username,
        @NotNull(message = "Bitte ein Passwort eingeben")
        @Size(min = 6, message = "Das Passwort ist zu kurz")
        String password,
        @Email(message = "Bitte eine gültige Emailadresse angeben")
        @NotNull(message = "Bitte eine Emailadresse eingeben")
        String emailAddress,
        @NotNull(message = "Bitte eine Verantwortlichkeit eingeben")
        String kpiOwner,
        @NotNull(message = "Bitte eine technische Rolle eingeben")
        TechnicalRole technicalRole
) {
}
