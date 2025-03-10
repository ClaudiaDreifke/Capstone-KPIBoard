package capstone.kpiboard;

import capstone.kpiboard.exceptions.KpiNotFoundException;
import capstone.kpiboard.model.kpi.*;
import capstone.kpiboard.service.kpi.KpiRepo;
import capstone.kpiboard.service.kpi.KpiService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@Slf4j
@Service
class KpiServiceTest {

    private final KpiRepo testKpiRepo = mock(KpiRepo.class);
    private final KpiService testKpiService = new KpiService(testKpiRepo);

    ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    Validator validator = factory.getValidator();

    @Test
    void addNewKpiTest() {
        //given
        NewKpi newTestKpi = new NewKpi(
                "Anzahl Truckings",
                "Leiter Truckings",
                new TargetForKpi(TargetValueOperator.GREATER, 250.0, TargetValueUnit.AMOUNT));
        Kpi testKpi = new Kpi(
                "122345",
                "Anzahl Truckings",
                "Leiter Truckings",
                List.of(new MonthValuePair(1, 260.0), new MonthValuePair(2, 250.0)),
                new TargetForKpi(TargetValueOperator.GREATER, 250.0, TargetValueUnit.AMOUNT),
                255);
        when(testKpiRepo.save(any(Kpi.class))).thenReturn(testKpi);
        //when
        Kpi actual = testKpiService.addNewKpi(newTestKpi);
        //then
        Assertions.assertEquals(testKpi, actual);
    }

    @Test
    void addNewKpiFailsWhenValidationFails() {
        //given
        NewKpi newFailKpi = new NewKpi(
                null,
                null,
                new TargetForKpi(null, null, null));

        //when
        Set<ConstraintViolation<NewKpi>> violations = validator.validate(newFailKpi);
        log.info(violations.stream().map(v -> v.getPropertyPath() + ": " + v.getInvalidValue() + ": " + v.getMessage())
                .collect(Collectors.joining("\n")));
        //then
        assertFalse(violations.isEmpty());
    }

    @Test
    void getAllKpisTest() {
        //given
        List<Kpi> testList = List.of(
                new Kpi(
                        "1234",
                        "Anzahl Truckings",
                        "Leiter Truckings",
                        List.of(new MonthValuePair(1, 260.0), new MonthValuePair(2, 250.0)),
                        new TargetForKpi(TargetValueOperator.GREATER, 250.0, TargetValueUnit.AMOUNT),
                        255),
                new Kpi(
                        "12345",
                        "Verspätungsquote",
                        "Leiter Truckings",
                        List.of(new MonthValuePair(1, 260.0), new MonthValuePair(2, 250.0)),
                        new TargetForKpi(TargetValueOperator.LESS, 10.0, TargetValueUnit.PERCENTAGE),
                        255));
        when(testKpiRepo.findAll()).thenReturn(testList);
        //when
        List<Kpi> actual = testKpiService.getAllKpis();
        //then
        Assertions.assertEquals(testList, actual);
    }

    @Test
    void deleteKpiTestKpiExists() {
        //given
        when(testKpiRepo.existsById("1234")).thenReturn(true);
        doNothing().when(testKpiRepo).deleteById("1234");
        //when
        testKpiService.deleteKpiById("1234");
        //then
        verify(testKpiRepo).deleteById("1234");
    }

    @Test
    void deleteKpiTestKpiDoesntExist() {
        //given
        when(testKpiRepo.existsById("123")).thenReturn(false);
        doNothing().when(testKpiRepo).deleteById("123");
        //then
        Assertions.assertThrows(KpiNotFoundException.class, () -> testKpiService.deleteKpiById("123"));
    }

    @Test
    void updateKpiById() {
        //given
        Kpi testUpdatedKpi = new Kpi(
                "1234",
                "Anzahl Truckings",
                "Leiter Truckings",
                List.of(new MonthValuePair(1, 260.0),
                        new MonthValuePair(2, 250.0)),
                new TargetForKpi(TargetValueOperator.GREATER, 250.0, TargetValueUnit.AMOUNT),
                255);
        when(testKpiRepo.existsById("1234")).thenReturn(true);
        when(testKpiRepo.save(testUpdatedKpi)).thenReturn(testUpdatedKpi);
        //when
        Kpi actual = testKpiService.updateKpiById(testUpdatedKpi);
        //then
        Assertions.assertEquals(testUpdatedKpi, actual);
    }

    @Test
    void updateKpiByIdKpiDoesntExist() {
        //given
        Kpi testUpdatedKpi = new Kpi(
                "122345",
                "Anzahl Truckings",
                "Leiter Truckings",
                List.of(new MonthValuePair(1, 260.0),
                        new MonthValuePair(2, 250.0)),
                new TargetForKpi(TargetValueOperator.GREATER, 250.0, TargetValueUnit.AMOUNT),
                255);
        when(testKpiRepo.existsById("1234")).thenReturn(false);
        //then
        Assertions.assertThrows(KpiNotFoundException.class, () -> testKpiService.updateKpiById(testUpdatedKpi));
    }

    @Test
    void calculateCurrentAverageValueTest() {
        //given
        Kpi testUpdatedKpiBeforeAverageCalculation = new Kpi(
                "122345",
                "Anzahl Truckings",
                "Leiter Truckings",
                List.of(new MonthValuePair(1, 260.0),
                        new MonthValuePair(2, 250.0)),
                new TargetForKpi(TargetValueOperator.GREATER, 250.0, TargetValueUnit.AMOUNT),
                0);
        Kpi testUpdatedKpiAfterAverageCalculation = new Kpi(
                "122345",
                "Anzahl Truckings",
                "Leiter Truckings",
                List.of(new MonthValuePair(1, 260.0),
                        new MonthValuePair(2, 250.0)),
                new TargetForKpi(TargetValueOperator.GREATER, 250.0, TargetValueUnit.AMOUNT),
                255);
        //when
        double actual = testKpiService.calculateCurrentAverageValue(testUpdatedKpiBeforeAverageCalculation);
        //then
        Assertions.assertEquals(testUpdatedKpiAfterAverageCalculation.currentAverageValue(), actual);
    }
}

