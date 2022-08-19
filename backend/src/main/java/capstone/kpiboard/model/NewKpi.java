package capstone.kpiboard.model;

import org.springframework.data.annotation.Id;

import java.util.ArrayList;

public record NewKpi(@Id String type, Double targetValue, TargetValueOperator targetValueOperator) {
    public Kpi withValueList() {
        return new Kpi(type(), new ArrayList<>(), targetValue(), targetValueOperator());
    }
}
