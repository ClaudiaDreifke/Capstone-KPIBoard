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
    @WithMockUser(username = "admin", roles = "ADMIN")
    void addNewUserTest() throws Exception {

        MvcResult result = mockMvc.perform(post("/api/user")
                        .contentType(APPLICATION_JSON)
                        .content("""
                                {
                                "username": "Theo",
                                "password": "Passwort",
                                "emailAddress": "Theo@veryimportant.com",
                                "role": "Leiter Trucking"
                                }
                                """).with(csrf()))
                .andExpect(status().is(201))
                .andReturn();
        String content = result.getResponse().getContentAsString();
        Assertions.assertTrue(content.contains("username"));
        Assertions.assertTrue(content.contains("Theo"));
    }

    @Test
    @WithMockUser(username = "admin", roles = "ADMIN")
    void getAllUserTest() throws Exception {

        mockMvc.perform(get
                        ("/api/user")
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @Test
    @WithMockUser(username = "testUser")
    void loginTest() throws Exception {

        MvcResult result = mockMvc.perform(get("/api/user/login"))
                .andExpect(status().isOk())
                .andReturn();
        String content = result.getResponse().getContentAsString();
        Assertions.assertTrue(content.contains("testUser"));

        mockMvc.perform(get
                        ("/api/user")
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @DirtiesContext
    @Test
    @WithMockUser(username = "testUser")
    void logoutTest() throws Exception {
        mockMvc.perform(get("/api/user/logout"))
                .andExpect(status().isOk());
    }

    @Test
    void expectUnauthorized() throws Exception {
        mockMvc.perform(get("/api/user/me")
        ).andExpect(status().isUnauthorized());
    }
}
