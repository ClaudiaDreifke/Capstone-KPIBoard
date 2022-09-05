package capstone.kpiboard;

import capstone.kpiboard.model.role.NewRole;
import capstone.kpiboard.model.role.Role;
import capstone.kpiboard.service.role.RoleRepo;
import capstone.kpiboard.service.role.RoleService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@Service
class RoleServiceTest {

    private final RoleRepo testRoleRepo = mock(RoleRepo.class);
    private final RoleService testRoleService = new RoleService(testRoleRepo);

    @Test
    void addNewRoleTest() {
        //given
        NewRole newTestRole = new NewRole("Leiter Truckings");
        Role testRole = new Role("12345", "Leiter Truckings");
        when(testRoleRepo.save(any(Role.class))).thenReturn(testRole);
        //when
        Role actual = testRoleService.addNewRole(newTestRole);
        //then
        Assertions.assertEquals(testRole, actual);
    }

    @Test
    void getAllRolesTest() {
        //given
        List<Role> testList = List.of(
                new Role("12345", "Leiter Truckings"),
                new Role("12367", "Leiter Personal"));
        when(testRoleRepo.findAll()).thenReturn(testList);
        //when
        List<Role> actual = testRoleService.getAllRoles();
        //then
        Assertions.assertEquals(testList, actual);
    }
}
