package capstone.kpiboard.model.user;

import capstone.kpiboard.model.roles.TechnicalRole;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

public record NewAppUser(
        @Id
        @NotNull(message = "Bitte einen Benutzernamen eingeben")
        String username,
        @NotNull(message = "Bitte ein Passwort eingeben")
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
