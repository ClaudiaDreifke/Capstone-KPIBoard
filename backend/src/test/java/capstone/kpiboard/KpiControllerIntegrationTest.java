package capstone.kpiboard;

import capstone.kpiboard.model.kpi.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
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
    @WithMockUser(username = "admin", authorities = "ADMIN")
    void addNewKpiTest() throws Exception {

        MvcResult result = mockMvc.perform(post("/api/kpis")
                        .contentType(APPLICATION_JSON)
                        .content("""
                                {
                                "name": "Anzahl Truckings",
                                "ownedBy":"Leiter Truckings",
                                "targetForKpi":
                                {
                                "targetValueOperator": "GREATER",
                                "targetValue": 250.0,
                                "targetValueUnit": "AMOUNT"
                                }
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().is(201))
                .andReturn();
        String content = result.getResponse().getContentAsString();
        Assertions.assertTrue(content.contains("values"));
        Assertions.assertTrue(content.contains("Anzahl Truckings"));
    }

    @Test
    @WithMockUser(username = "testUser")
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
    @WithMockUser(username = "admin", authorities = "ADMIN")
    void deleteKpiByIdKpiExistsTest() throws Exception {

        String result = mockMvc.perform(post("/api/kpis")
                        .contentType(APPLICATION_JSON)
                        .content("""
                                {
                                "name": "Anzahl Truckings",
                                "ownedBy":"Leiter Truckings",
                                "targetForKpi":
                                {
                                "targetValueOperator": "GREATER",
                                "targetValue": 250.0,
                                "targetValueUnit": "AMOUNT"
                                }
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().is(201))
                .andReturn().getResponse().getContentAsString();

        Kpi resultKpi = objectMapper.readValue(result, Kpi.class);
        String id = resultKpi.id();

        mockMvc.perform(delete("http://localhost:8080/api/kpis/" + id).with(csrf()))
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
    @WithMockUser(username = "admin", authorities = "ADMIN")
    void deleteKpiByIdTestKpiDoesntExist() throws Exception {

        String errorMessage = mockMvc.perform(delete("http://localhost:8080/api/kpis/no-existing-id").with(csrf()))
                .andExpect(status().is(404))
                .andReturn().getResponse().getContentAsString();

        Assertions.assertTrue(errorMessage.contains("timestamp"));
        Assertions.assertTrue(errorMessage.contains("message"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "admin", authorities = "ADMIN")
    void updateKpiById() throws Exception {

        String result = mockMvc.perform(post("/api/kpis")
                        .contentType(APPLICATION_JSON)
                        .content("""
                                {
                                "name": "Anzahl Truckings",
                                "ownedBy":"Leiter Truckings",
                                "targetForKpi":
                                {
                                "targetValueOperator": "GREATER",
                                "targetValue": 250.0,
                                "targetValueUnit": "AMOUNT"
                                }
                                }
                                """).with(csrf()))
                .andExpect(status().is(201))
                .andReturn().getResponse().getContentAsString();

        Kpi resultKpi = objectMapper.readValue(result, Kpi.class);
        String id = resultKpi.id();
        List<MonthValuePair> values = List.of(new MonthValuePair(1, 260.0), new MonthValuePair(2, 250.0));
        Kpi testUpdatedKpi = new Kpi(
                id,
                "Anzahl Truckings",
                "Leiter Truckings",
                values,
                new TargetForKpi(TargetValueOperator.LESS, 280.0, TargetValueUnit.PERCENTAGE),
                255);

        String updatedResult = mockMvc.perform(put("http://localhost:8080/api/kpis/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testUpdatedKpi)).with(csrf()))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        Kpi actualKpi = objectMapper.readValue(updatedResult, Kpi.class);

        Assertions.assertEquals(testUpdatedKpi, actualKpi);
    }
}
