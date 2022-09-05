package capstone.kpiboard.model.role;

import org.springframework.data.annotation.Id;

public record Role(
        @Id
        String id,
        String roleName
) {
}
