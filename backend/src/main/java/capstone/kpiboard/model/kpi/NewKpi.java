package capstone.kpiboard.model.kpi;

import org.jetbrains.annotations.NotNull;

import java.util.ArrayList;
import java.util.UUID;

public record NewKpi(
        @NotNull
        String name,
        String responsibleRole,
        @NotNull
        TargetForKpi targetForKpi) {
    public Kpi withValueListAndId() {
        return new Kpi(UUID.randomUUID().toString(), name(), responsibleRole(), new ArrayList<>(), targetForKpi(), 0);
    }
}
