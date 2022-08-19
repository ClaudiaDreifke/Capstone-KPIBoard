package capstone.kpiboard.model;

import lombok.Builder;
import org.springframework.data.annotation.Id;

import java.util.List;

@Builder
public class Kpi {
    @Id
    String type;
    List<Double> values;
    Double targetValue;
    String targetGreaterOrLess;
}
