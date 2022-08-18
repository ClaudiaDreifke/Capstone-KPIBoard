package capstone.kpiboard;

import capstone.kpiboard.controller.KpiController;
import capstone.kpiboard.model.Kpi;
import capstone.kpiboard.model.KpiService;
import capstone.kpiboard.model.KpiType;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class KpiControllerTest {
    private final KpiService testKpiService = mock(KpiService.class);
    private final KpiController testKpiController = new KpiController(testKpiService);
    private final List<Kpi> testList = List.of (
            new Kpi("123", 1, 250, KpiType.ANZAHL_TRUCKINGS),
            new Kpi("134", 2, 260, KpiType.ANZAHL_TRUCKINGS),
            new Kpi("156", 3, 270, KpiType.ANZAHL_TRUCKINGS));

    @Test
    void getAllMyKpiTest(){
        //given
        when(testKpiService.getAllMyKpi()).thenReturn(testList);
        //when
        List<Kpi> actual = testKpiController.getAllMyKpi();
        //then
        Assertions.assertArrayEquals(testList.toArray(), actual.toArray());
    }

}
