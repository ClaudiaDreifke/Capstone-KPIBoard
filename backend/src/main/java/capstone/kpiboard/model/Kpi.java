package capstone.kpiboard.model;

import org.springframework.data.annotation.Id;

import java.util.Map;

public record Kpi(
        @Id
        String id,
        String name,
        Map<MonthAsValueKey, Double> values,
        TargetForKpi targetForKpi) {
}
