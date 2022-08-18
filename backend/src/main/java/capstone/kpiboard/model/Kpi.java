package capstone.kpiboard.model;

import org.springframework.data.annotation.Id;

import java.util.List;

public record Kpi(@Id KpiType kpiType, List<KpiValue> kpiValues) {
}
