package capstone.kpiboard.model;

import org.springframework.data.annotation.Id;

public record Kpi(
        @Id String id,
        int month,
        double value,
        KpiType kpiType
) {
}
