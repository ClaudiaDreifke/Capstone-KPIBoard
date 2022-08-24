package capstone.kpiboard.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = KpiNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleKpiNotFoundException(KpiNotFoundException exception) {
        Map<String, Object> responseBody = new LinkedHashMap<>();

        responseBody.put("timestamp", LocalDateTime.now());
        responseBody.put("message:", exception.getMessage());

        return new ResponseEntity<>(responseBody, HttpStatus.NOT_FOUND);
    }
}

