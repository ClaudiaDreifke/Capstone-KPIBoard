package capstone.kpiboard.model.roles;

import javax.validation.constraints.NotNull;
import java.util.UUID;

public record NewKpiOwner(
        @NotNull(message = "Bitte einen Namen eingeben")
        String kpiOwnerDescription
) {
    public KpiOwner withRandomId() {
        return new KpiOwner(UUID.randomUUID().toString(), kpiOwnerDescription());
    }

}
