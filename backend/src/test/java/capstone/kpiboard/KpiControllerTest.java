package capstone.kpiboard;

import capstone.kpiboard.controller.KpiController;
import capstone.kpiboard.model.Kpi;
import capstone.kpiboard.model.KpiRepo;
import capstone.kpiboard.model.KpiService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

import static org.mockito.Mockito.mock;

class KpiControllerTest {
    private final KpiService testKpiService = mock(KpiService.class);
    private final KpiController testKpiController = new KpiController(testKpiService);

    @Test
    void addNewKpiTest(){
        //given
        Kpi newTestKpi= Kpi.builder().type("Anzahl Truckings").values(List.of(250.0,260.0,273.0)).targetValue(250.0).targetGreaterOrLess("greater").build();
        Mockito.when(testKpiService.addNewKpi(newTestKpi)).thenReturn(newTestKpi);
        //when
        Kpi actual = testKpiController.addNewKpi(newTestKpi);
        //then
        Assertions.assertEquals(newTestKpi,actual);
    }
}
