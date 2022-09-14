package capstone.kpiboard.model.user;

import capstone.kpiboard.model.roles.TechnicalRole;

public record UserDetails(

        String username,
        String kpiOwner,
        TechnicalRole technicalRole
) {
}
