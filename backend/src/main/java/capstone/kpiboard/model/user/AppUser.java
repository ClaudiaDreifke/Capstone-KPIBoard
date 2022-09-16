package capstone.kpiboard.model.user;

import capstone.kpiboard.model.roles.TechnicalRole;
import org.springframework.data.annotation.Id;

public record AppUser(
        @Id
        String username,
        String passwordHash,
        String emailAddress,
        String kpiOwner,
        TechnicalRole technicalRole
) {
}
