package capstone.kpiboard;

import capstone.kpiboard.controller.KpiController;
import capstone.kpiboard.model.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

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
}
