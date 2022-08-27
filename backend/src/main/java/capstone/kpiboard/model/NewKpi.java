package capstone.kpiboard.model;

import org.jetbrains.annotations.NotNull;

import java.util.HashMap;
import java.util.UUID;

public record NewKpi(
        @NotNull
        String name,
        @NotNull
        TargetForKpi targetForKpi) {
    public Kpi withValueListAndId() {
        return new Kpi(UUID.randomUUID().toString(), name(), new HashMap<>(), targetForKpi());
    }
}
