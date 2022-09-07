package capstone.kpiboard.model.user;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.UUID;


public record NewAppUser(
        @NotNull
        String username,
        @NotNull
        String passwordHash,
        @NotNull
        @Email
        String emailAddress,
        @NotNull
        String userRole
) {
    public AppUser withRandomId() {
        return new AppUser(UUID.randomUUID().toString(), username(), passwordHash(), emailAddress(), userRole());
    }

}
