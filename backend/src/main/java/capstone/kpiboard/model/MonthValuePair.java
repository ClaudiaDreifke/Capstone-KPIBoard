package capstone.kpiboard.model;

import org.jetbrains.annotations.NotNull;

public record MonthValuePair(
        @NotNull
        Integer month,
        double value
) {
}
