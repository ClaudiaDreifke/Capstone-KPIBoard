package capstone.kpiboard;

import capstone.kpiboard.model.user.AppUser;
import capstone.kpiboard.model.user.NewAppUser;
import capstone.kpiboard.service.user.AppUserRepo;
import capstone.kpiboard.service.user.AppUserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@Service
class AppUserServiceTest {

    private final AppUserRepo testAppUserRepo = mock(AppUserRepo.class);
    private final PasswordEncoder testPasswordEncoder = mock(PasswordEncoder.class);
    private final AppUserService testAppUserService = new AppUserService(testAppUserRepo, testPasswordEncoder);

    @Test
    void addNewUserTest() {
        //given
        NewAppUser newTestAppUser = new NewAppUser(
                "Theo",
                "Passwort",
                "Theo@veryImportant.com",
                "Leiter Trucking");
        AppUser testAppUser = new AppUser(
                "Theo",
                "$2a$12$AjFqw/97eTJs.gB5.kp/EuUuStTOUAi3D1tYsSKDA/qNQiHhzy/.y",
                "Theo@veryImportant.com",
                "Leiter Trucking",
                "USER");
        when(testAppUserRepo.save(any(AppUser.class))).thenReturn(testAppUser);
        //when
        AppUser actual = testAppUserService.addNewUser(newTestAppUser);
        //then
        Assertions.assertEquals(testAppUser, actual);
    }

    @Test
    void loadUserByUsernameIfUserExistsTest() {
        //given
        AppUser testAppUser = new AppUser(
                "Theo",
                "$2a$12$AjFqw/97eTJs.gB5.kp/EuUuStTOUAi3D1tYsSKDA/qNQiHhzy/.y",
                "Theo@veryImportant.com",
                "Leiter Trucking", "USER");
        User testUser = new User("Theo", "Passwort", Collections.emptyList());
        when(testAppUserRepo.findById(testAppUser.username())).thenReturn(Optional.of(testAppUser));
        //when
        User actual = testAppUserService.loadUserByUsername(testAppUser.username());
        //then
        Assertions.assertEquals(testUser, actual);
    }

    @Test
    void loadUserByUsernameIfUserDoesntExistTest() {
        //given
        String nonExistingUsername = "Nobody";
        when(testAppUserRepo.findById("Nobody")).thenReturn(Optional.empty());
        //then
        Assertions.assertThrows(UsernameNotFoundException.class, () -> testAppUserService.loadUserByUsername("Nobody"));
    }

    @Test
    void getAllUserTest() {
        //given
        List<AppUser> testList = List.of(
                new AppUser("Theo",
                        "$2a$12$AjFqw/97eTJs.gB5.kp/EuUuStTOUAi3D1tYsSKDA/qNQiHhzy/.y",
                        "Theo@veryImportant.com",
                        "Leiter Trucking",
                        "USER"));
        when(testAppUserRepo.findAll()).thenReturn(testList);
        //when
        List<AppUser> actual = testAppUserService.getAllUser();
        //then
        Assertions.assertEquals(testList, actual);
    }
}
