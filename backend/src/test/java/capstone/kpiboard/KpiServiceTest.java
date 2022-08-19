package capstone.kpiboard;

import capstone.kpiboard.model.Kpi;
import capstone.kpiboard.model.KpiRepo;
import capstone.kpiboard.model.KpiService;
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
    void addNewKpiTest(){
        //given
        Kpi newTestKpi= Kpi.builder().type("Anzahl Truckings").values(List.of(250.0,260.0,273.0)).targetValue(250.0).targetGreaterOrLess("greater").build();
        Mockito.when(testKpiRepo.save(newTestKpi)).thenReturn(newTestKpi);
        //when
        Kpi actual = testKpiService.addNewKpi(newTestKpi);
        //then
        Assertions.assertEquals(newTestKpi,actual);
    }

}
