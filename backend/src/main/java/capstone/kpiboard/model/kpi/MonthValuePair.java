package capstone.kpiboard.model.kpi;

import org.jetbrains.annotations.NotNull;

public record MonthValuePair(
        @NotNull
        Integer month,
        double value
) {
}
