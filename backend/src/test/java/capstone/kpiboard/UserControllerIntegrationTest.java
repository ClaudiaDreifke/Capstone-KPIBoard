package capstone.kpiboard;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerIntegrationTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;

    @DirtiesContext
    @Test
    @WithMockUser(username = "admin", authorities = "ADMIN")
    void addNewUserTest() throws Exception {

        MvcResult result = mockMvc.perform(post("/api/users")
                        .contentType(APPLICATION_JSON)
                        .content("""
                                {
                                "username": "Theo",
                                "password": "Passwort",
                                "emailAddress": "Theo@veryimportant.com",
                                "kpiOwner": "Leiter Trucking",
                                "technicalRole": "USER"
                                }
                                """).with(csrf()))
                .andExpect(status().is(201))
                .andReturn();
        String content = result.getResponse().getContentAsString();
        Assertions.assertTrue(content.contains("Theo"));
        Assertions.assertTrue(content.contains("Theo@veryimportant.com"));
        Assertions.assertTrue(content.contains("Leiter Trucking"));
        Assertions.assertTrue(content.contains("USER"));
    }

    @Test
    @WithMockUser(username = "admin", authorities = "ADMIN")
    void getAllUserTest() throws Exception {

        mockMvc.perform(get
                        ("/api/users")
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Theo", authorities = "ADMIN")
    void loginTest() throws Exception {

        mockMvc.perform(post("/api/users")
                        .contentType(APPLICATION_JSON)
                        .content("""
                                {
                                "username": "Theo",
                                "password": "Passwort",
                                "emailAddress": "Theo@veryimportant.com",
                                "KpiOwner": "Leiter Trucking",
                                "technicalRole": "USER"
                                }
                                """).with(csrf()))
                .andExpect(status().is(201));

        MvcResult result = mockMvc.perform(get("/api/users/login"))
                .andExpect(status().isOk())
                .andReturn();
        String content = result.getResponse().getContentAsString();
        Assertions.assertTrue(content.contains("Theo"));

    }

    @DirtiesContext
    @Test
    @WithMockUser(username = "testUser")
    void logoutTest() throws Exception {
        mockMvc.perform(get("/api/users/logout"))
                .andExpect(status().isOk());
    }

    @Test
    void expectUnauthorized() throws Exception {
        mockMvc.perform(get("/api/kpis")
        ).andExpect(status().isUnauthorized());
    }
}
