package capstone.kpiboard;

import capstone.kpiboard.model.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.stereotype.Service;

import static org.mockito.Mockito.mock;

@Service
class KpiServiceTest {
    private final KpiRepo testKpiRepo = mock(KpiRepo.class);
    private final KpiService testKpiService = new KpiService(testKpiRepo);

    @Test
    void addNewKpiTest() {
        //given
        NewKpi newTestKpi = new NewKpi("Anzahl Truckings", 250.0, TargetValueOperator.GREATER);
        Kpi testKpi = newTestKpi.withValueList();
        Mockito.when(testKpiRepo.save(testKpi)).thenReturn(testKpi);
        //when
        Kpi actual = testKpiService.addNewKpi(newTestKpi);
        //then
        Assertions.assertEquals(testKpi, actual);
    }

}
