package capstone.kpiboard.model.roles;

import org.springframework.data.annotation.Id;

public record KpiOwner(
        @Id
        String id,
        String kpiOwnerDescription
) {
}
