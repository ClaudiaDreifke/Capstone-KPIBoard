package capstone.kpiboard.model.kpi;

import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotNull;
import java.util.List;

public record Kpi(
        @Id
        String id,
        @NotNull(message = "Bitte einen Namen eingeben")
        String name,
        @NotNull(message = "Bitte eine Verantwortlichkeit eingeben")
        String ownedBy,
        List<MonthValuePair> values,
        @NotNull(message = "Bitte ein Zielwert eingeben")
        TargetForKpi targetForKpi,
        double currentAverageValue
) {
}
