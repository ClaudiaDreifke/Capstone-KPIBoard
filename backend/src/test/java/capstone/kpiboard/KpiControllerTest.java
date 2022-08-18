package capstone.kpiboard;

import capstone.kpiboard.controller.KpiController;
import capstone.kpiboard.model.Kpi;
import capstone.kpiboard.model.KpiService;
import capstone.kpiboard.model.KpiType;
import capstone.kpiboard.model.KpiValue;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class KpiControllerTest {
    private final KpiService testKpiService = mock(KpiService.class);
    private final KpiController testKpiController = new KpiController(testKpiService);
    private final Kpi numberOfTruckings = new Kpi (KpiType.ANZAHL_TRUCKINGS, List.of( new KpiValue("1-22", 250.0), new KpiValue("2-22", 260.0)));

    @Test
    void getKpiByTypeTest(){
        //given
        when(testKpiService.getKpiByType(numberOfTruckings.kpiType())).thenReturn(numberOfTruckings);
        //when
        Kpi actual = testKpiController.getKpiByType(numberOfTruckings.kpiType());
        //then
        Assertions.assertEquals(numberOfTruckings, actual);
    }

}
