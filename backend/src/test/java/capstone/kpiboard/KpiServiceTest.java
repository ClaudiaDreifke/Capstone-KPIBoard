package capstone.kpiboard;

import capstone.kpiboard.model.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;


class KpiServiceTest {

    private final KpiRepo testKpiRepo = mock(KpiRepo.class);
    private final KpiService testKpiService = new KpiService(testKpiRepo);

    private final Kpi numberOfTruckings = new Kpi (KpiType.ANZAHL_TRUCKINGS, List.of( new KpiValue("1-22", 250.0), new KpiValue("2-22", 260.0)));


    @Test
    void getKpiByTypeTestWithKpiExists(){
        //given
        when(testKpiRepo.existsById(numberOfTruckings.kpiType())).thenReturn(true);
        when(testKpiRepo.findById(numberOfTruckings.kpiType())).thenReturn(Optional.of(numberOfTruckings));
        //when
        Kpi actual = testKpiService.getKpiByType(numberOfTruckings.kpiType());
        //then
        Assertions.assertEquals(numberOfTruckings, actual);
    }

    @Test
    void getKpiByTypeTestWithKpiDoesntExists(){
        //given
        when(testKpiRepo.existsById(numberOfTruckings.kpiType())).thenReturn(false);
        //then
        verify(testKpiRepo, times(0)).findById(numberOfTruckings.kpiType());
    }
}
