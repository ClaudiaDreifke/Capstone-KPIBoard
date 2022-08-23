package capstone.kpiboard;

import capstone.kpiboard.exceptions.GlobalExceptionHandler;
import capstone.kpiboard.exceptions.KpiNotDeletedException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.util.Map;


@ControllerAdvice
class GlobalExceptionHandlerTest {

    private final GlobalExceptionHandler handler = new GlobalExceptionHandler();

    @Test
    void handleKpiNotDeletedExceptionTest() {
        KpiNotDeletedException e = new KpiNotDeletedException("http://localhost:8080/api/kpis/no-existing-id");
        ResponseEntity<Map<String, Object>> result = handler.handleKpiNotDeletedException(e);
        Assertions.assertEquals(HttpStatus.NOT_FOUND, result.getStatusCode());
        Assertions.assertTrue(result.toString().contains("Kpi with Id"));
    }
}
