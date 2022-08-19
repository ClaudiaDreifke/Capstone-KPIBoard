package capstone.kpiboard.model;

import org.springframework.data.annotation.Id;

import java.util.List;


public record Kpi(@Id String type, List<Double> values, Double targetValue, TargetValueOperator targetValueOperator) {
}

