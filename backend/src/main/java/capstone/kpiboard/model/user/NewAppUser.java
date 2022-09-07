package capstone.kpiboard.model.user;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;


public record NewAppUser(
        @NotNull
        String username,
        @NotNull
        String password,
        @NotNull
        @Email
        String emailAddress,
        @NotNull
        String userRole
) {
    public AppUser withRandomIdAndPasswordHash() {
        return new AppUser(username(), new BCryptPasswordEncoder().encode(password()), emailAddress(), userRole());
    }
}
