package capstone.kpiboard;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class KpiControllerIntegrationTest {

    @Autowired
    MockMvc mockMvc;

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

}
