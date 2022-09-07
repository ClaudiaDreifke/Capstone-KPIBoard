package capstone.kpiboard.model.user;

import org.springframework.data.annotation.Id;

public record AppUser(
        @Id
        String id,
        String username,
        String password,
        String emailAddress,
        String role
) {
}
