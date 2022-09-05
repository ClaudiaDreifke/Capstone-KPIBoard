package capstone.kpiboard.model.kpi;

import org.springframework.data.annotation.Id;

import java.util.List;

public record Kpi(
        @Id
        String id,
        String name,
        String responsibleRole,
        List<MonthValuePair> values,
        TargetForKpi targetForKpi,
        double currentAverageValue
) {
}
