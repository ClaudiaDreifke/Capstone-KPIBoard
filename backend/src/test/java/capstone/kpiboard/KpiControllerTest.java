package capstone.kpiboard;

import capstone.kpiboard.controller.KpiController;
import capstone.kpiboard.model.*;
import capstone.kpiboard.service.KpiService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

import static org.mockito.Mockito.mock;

class KpiControllerTest {
    private final KpiService testKpiService = mock(KpiService.class);
    private final KpiController testKpiController = new KpiController(testKpiService);

    @Test
    void addNewKpiTest() {
        //given
        NewKpi newTestKpi = new NewKpi("Anzahl Truckings", new TargetForKpi(TargetValueOperator.GREATER, 250.0, TargetValueUnit.ANZAHL));
        Kpi testKpi = newTestKpi.withValueList();
        Mockito.when(testKpiService.addNewKpi(newTestKpi)).thenReturn(testKpi);
        //when
        Kpi actual = testKpiController.addNewKpi(newTestKpi);
        //then
        Assertions.assertEquals(testKpi, actual);
    }

    @Test
    void getAllKpiAdminTest() {
        //given
        List<Kpi> testList = List.of(
                new NewKpi("Anzahl Truckings", new TargetForKpi(TargetValueOperator.GREATER, 250.0, TargetValueUnit.ANZAHL)).withValueList(),
                new NewKpi("Verspätungsquote", new TargetForKpi(TargetValueOperator.LESS, 10.0, TargetValueUnit.PROZENT)).withValueList());
        Mockito.when(testKpiService.getAllKpiAdmin()).thenReturn(testList);
        //when
        List<Kpi> actual = testKpiController.getAllKpiAdmin();
        //then
        Assertions.assertEquals(testList, actual);
    }
}
