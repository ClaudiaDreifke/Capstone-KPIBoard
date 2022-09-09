package capstone.kpiboard.model.user;

import capstone.kpiboard.model.roles.TechnicalRole;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;


public record NewAppUser(
        @Id
        @NotNull(message = "Username ist ein Pflichtfeld")
        String username,
        @NotNull(message = "Passwort ist ein Pflichtfeld")
        String password,
        @Email(message = "Bitte eine gültige Emailadresse angeben")
        @NotNull(message = "Emailadresse ist ein Pflichtfeld")
        String emailAddress,
        @NotNull(message = "Verantwortlicher ist ein Pflichtfeld")
        String kpiOwner,
        @NotNull(message = "Technische Rolle ist ein Pflichtfeld")
        TechnicalRole technicalRole
) {
}
