package capstone.kpiboard.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class KpiNotDeletedException extends IllegalArgumentException {

    public KpiNotDeletedException(String id) {
        super("Kpi with Id " + id + " not found", null);
    }
}
