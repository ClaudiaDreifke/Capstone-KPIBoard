package capstone.kpiboard.model.kpi;

import org.jetbrains.annotations.NotNull;
import org.springframework.data.annotation.Id;

import java.util.List;

public record Kpi(
        @Id
        String id,
        @NotNull
        String name,
        @NotNull
        String ownedBy,
        List<MonthValuePair> values,
        @NotNull
        TargetForKpi targetForKpi,
        double currentAverageValue
) {
}
