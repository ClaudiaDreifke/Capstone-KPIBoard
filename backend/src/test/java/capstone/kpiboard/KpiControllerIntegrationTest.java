package capstone.kpiboard;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class KpiControllerIntegrationTest {
    @Autowired
    MockMvc mockMvc;

    @Test
    void getKpiByTypeTest() throws Exception {
        mockMvc.perform(get("/api/my-kpi/ANZAHL_TRUCKINGS"))
                .andExpect(status().is(404));
    }
}