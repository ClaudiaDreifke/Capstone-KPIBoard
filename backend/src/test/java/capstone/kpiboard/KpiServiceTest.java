package capstone.kpiboard;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import capstone.kpiboard.model.Kpi;
import capstone.kpiboard.model.KpiRepo;
import capstone.kpiboard.model.KpiService;
import capstone.kpiboard.model.KpiType;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;

class KpiServiceTest {

    private final KpiRepo testKpiRepo = mock(KpiRepo.class);
    private final KpiService testKpiService = new KpiService(testKpiRepo);
    private final List<Kpi> testList = List.of (
            new Kpi("123", 1, 250, KpiType.ANZAHL_TRUCKINGS),
            new Kpi("134", 2, 260, KpiType.ANZAHL_TRUCKINGS),
            new Kpi("156", 3, 270, KpiType.ANZAHL_TRUCKINGS));

    @Test
    void getAllMyKpiTest(){
        //given
        when(testKpiRepo.findAll()).thenReturn(testList);
        //when
        List<Kpi> actual = testKpiService.getAllMyKpi();
        //then
        Assertions.assertArrayEquals(testList.toArray(), actual.toArray());
    }
}
