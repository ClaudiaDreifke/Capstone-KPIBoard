package capstone.kpiboard;

import capstone.kpiboard.model.Kpi;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class KpiControllerIntegrationTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;

    @Test
    @DirtiesContext
    void addNewKpiTest() throws Exception {
        MvcResult result = mockMvc.perform(post("/api/kpis")
                        .contentType(APPLICATION_JSON)
                        .content("""
                                {
                                "name": "Anzahl Truckings",
                                "targetForKpi":
                                {
                                "targetValueOperator": "GREATER",
                                "targetValue": 250.0,
                                "targetValueUnit": "ANZAHL"
                                }
                                }
                                """))
                .andExpect(status().is(201))
                .andReturn();
        String content = result.getResponse().getContentAsString();
        Assertions.assertTrue(content.contains("values"));
        Assertions.assertTrue(content.contains("Anzahl Truckings"));
    }

    @Test
    void getAllKpisTest() throws Exception {

        mockMvc.perform(get
                        ("/api/kpis")
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @Test
    @DirtiesContext
    void deleteKpiByIdKpiExistsTest() throws Exception {

        String result = mockMvc.perform(post("/api/kpis")
                        .contentType(APPLICATION_JSON)
                        .content("""
                                {
                                "name": "Anzahl Truckings",
                                "targetForKpi":
                                {
                                "targetValueOperator": "GREATER",
                                "targetValue": 250.0,
                                "targetValueUnit": "ANZAHL"
                                }
                                }
                                """))
                .andExpect(status().is(201))
                .andReturn().getResponse().getContentAsString();

        Kpi resultKpi = objectMapper.readValue(result, Kpi.class);
        String id = resultKpi.id();

        mockMvc.perform(delete("http://localhost:8080/api/kpis/" + id))
                .andExpect(status().is(204));

        mockMvc.perform(get
                        ("/api/kpis")
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }


    @Test
    @DirtiesContext
    void deleteKpiByIdTestKpiDoesntExist() throws Exception {

        String errorMessage = mockMvc.perform(delete("http://localhost:8080/api/kpis/no-existing-id"))
                .andExpect(status().is(404))
                .andReturn().getResponse().getContentAsString();

        Assertions.assertTrue(errorMessage.contains("timestamp"));
        Assertions.assertTrue(errorMessage.contains("message"));
    }
}
