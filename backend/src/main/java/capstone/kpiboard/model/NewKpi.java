package capstone.kpiboard.model;

import org.jetbrains.annotations.NotNull;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;

public record NewKpi(
        @Id
        @NotNull
        String name,
        @NotNull
        TargetForKpi targetForKpi) {
    public Kpi withValueList() {
        return new Kpi(name(), new ArrayList<>(), targetForKpi());
    }
}
