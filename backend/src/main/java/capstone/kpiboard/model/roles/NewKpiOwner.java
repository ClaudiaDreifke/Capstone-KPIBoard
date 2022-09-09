package capstone.kpiboard.model.roles;

import org.jetbrains.annotations.NotNull;

import java.util.UUID;

public record NewKpiOwner(
        @NotNull
        String kpiOwnerDescription
) {
    public KpiOwner withRandomId() {
        return new KpiOwner(UUID.randomUUID().toString(), kpiOwnerDescription());
    }

}
