package capstone.kpiboard;

import capstone.kpiboard.model.role.UserRole;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class RoleControllerIntegrationTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;

    @DirtiesContext
    @Test
    @WithMockUser(username = "admin", roles = "ADMIN")
    void addNewRoleTest() throws Exception {

        MvcResult result = mockMvc.perform(post("/api/roles")
                        .contentType(APPLICATION_JSON)
                        .content("""
                                {
                                "roleName": "Leiter Truckings"
                                }
                                """).with(csrf()))
                .andExpect(status().is(201))
                .andReturn();
        String content = result.getResponse().getContentAsString();
        Assertions.assertTrue(content.contains("roleName"));
        Assertions.assertTrue(content.contains("Leiter Truckings"));
    }

    @Test
    @WithMockUser(username = "admin", roles = "ADMIN")
    void getAllRolesTest() throws Exception {

        mockMvc.perform(get
                        ("/api/roles")
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "admin", roles = "ADMIN")
    void deleteRoleByIdRoleExistsTest() throws Exception {

        String result = mockMvc.perform(post("/api/roles")
                        .contentType(APPLICATION_JSON)
                        .content("""
                                {
                                "roleName": "Leiter Truckings"
                                }
                                """).with(csrf()))
                .andExpect(status().is(201))
                .andReturn().getResponse().getContentAsString();

        UserRole resultRole = objectMapper.readValue(result, UserRole.class);
        String id = resultRole.id();

        mockMvc.perform(delete("http://localhost:8080/api/roles/" + id).with(csrf()))
                .andExpect(status().is(204));

        mockMvc.perform(get
                        ("/api/roles")
                )
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "admin", roles = "ADMIN")
    void deleteRoleByIdTestIfRoleDoesntExist() throws Exception {

        String errorMessage = mockMvc.perform(delete("http://localhost:8080/api/roles/no-existing-id").with(csrf()))
                .andExpect(status().is(404))
                .andReturn().getResponse().getContentAsString();

        Assertions.assertTrue(errorMessage.contains("timestamp"));
        Assertions.assertTrue(errorMessage.contains("message"));
    }
}
