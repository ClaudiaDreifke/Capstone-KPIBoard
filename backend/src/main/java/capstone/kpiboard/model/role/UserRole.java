package capstone.kpiboard.model.role;

import org.springframework.data.annotation.Id;

public record UserRole(
        @Id
        String id,
        String roleName
) {
}
