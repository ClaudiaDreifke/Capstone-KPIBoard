package capstone.kpiboard;

import capstone.kpiboard.model.*;
import capstone.kpiboard.service.KpiRepo;
import capstone.kpiboard.service.KpiService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;

@Service
class KpiServiceTest {
    private final KpiRepo testKpiRepo = mock(KpiRepo.class);
    private final KpiService testKpiService = new KpiService(testKpiRepo);

    @Test
    void addNewKpiTest() {
        //given
        NewKpi newTestKpi = new NewKpi("Anzahl Truckings", new TargetForKpi(TargetValueOperator.GREATER, 250.0, TargetValueUnit.ANZAHL));
        Kpi testKpi = new Kpi("122345", "Anzahl Truckings", List.of(250.0, 260.0), new TargetForKpi(TargetValueOperator.GREATER, 250.0, TargetValueUnit.ANZAHL));
        Mockito.when(testKpiRepo.save(any(Kpi.class))).thenReturn(testKpi);
        //when
        Kpi actual = testKpiService.addNewKpi(newTestKpi);
        //then
        Assertions.assertEquals(testKpi, actual);
    }

    @Test
    void getAllKpisTest() {
        //given
        List<Kpi> testList = List.of(
                new Kpi("1234", "Anzahl Truckings", List.of(250.0, 260.0), new TargetForKpi(TargetValueOperator.GREATER, 250.0, TargetValueUnit.ANZAHL)),
                new Kpi("12345", "Verspätungsquote", List.of(260.0, 270.0), new TargetForKpi(TargetValueOperator.LESS, 10.0, TargetValueUnit.PROZENT)));
        Mockito.when(testKpiRepo.findAll()).thenReturn(testList);
        //when
        List<Kpi> actual = testKpiService.getAllKpis();
        //then
        Assertions.assertEquals(testList, actual);
    }

//    @Test
//    void updateKpiById() {
//        //given
//        Kpi testKpi = new Kpi("1234", "Anzahl Truckings", List.of(250.0, 270.0), new TargetForKpi(TargetValueOperator.GREATER, 250.0, TargetValueUnit.ANZAHL));
//        Kpi testUpdatedKpi = new Kpi("1234", "Anzahl Truckings", List.of(250.0, 260.0), new TargetForKpi(TargetValueOperator.GREATER, 250.0, TargetValueUnit.ANZAHL));
//        //when
//        when(kpi)
//        //then
//    }
}
