package capstone.kpiboard;

import capstone.kpiboard.model.*;
import capstone.kpiboard.service.KpiRepo;
import capstone.kpiboard.service.KpiService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.mockito.Mockito.mock;

@Service
class KpiServiceTest {
    private final KpiRepo testKpiRepo = mock(KpiRepo.class);
    private final KpiService testKpiService = new KpiService(testKpiRepo);

    @Test
    void addNewKpiTest() {
        //given
        NewKpi newTestKpi = new NewKpi("Anzahl Truckings", new TargetForKpi(TargetValueOperator.GREATER, 250.0, TargetValueUnit.ANZAHL));
        Kpi testKpi = newTestKpi.withValueList();
        Mockito.when(testKpiRepo.save(testKpi)).thenReturn(testKpi);
        //when
        Kpi actual = testKpiService.addNewKpi(newTestKpi);
        //then
        Assertions.assertEquals(testKpi, actual);
    }

    @Test
    void getAllKpisAdminTest() {
        //given
        List<Kpi> testList = List.of(
                new NewKpi("Anzahl Truckings", new TargetForKpi(TargetValueOperator.GREATER, 250.0, TargetValueUnit.ANZAHL)).withValueList(),
                new NewKpi("Verspätungsquote", new TargetForKpi(TargetValueOperator.LESS, 10.0, TargetValueUnit.PROZENT)).withValueList());
        Mockito.when(testKpiRepo.findAll()).thenReturn(testList);
        //when
        List<Kpi> actual = testKpiService.getAllKpisAdmin();
        //then
        Assertions.assertEquals(testList, actual);
    }

}
