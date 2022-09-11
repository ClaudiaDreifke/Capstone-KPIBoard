package capstone.kpiboard.controller;

import capstone.kpiboard.model.user.AppUser;
import capstone.kpiboard.model.user.NewAppUser;
import capstone.kpiboard.model.user.UserDetails;
import capstone.kpiboard.service.user.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final AppUserService appUserService;

    @PostMapping()
    @ResponseStatus(code = HttpStatus.CREATED)
    public AppUser addNewAppUser(@RequestBody NewAppUser newAppUser) {
        return appUserService.addNewUser(newAppUser);
    }

    @GetMapping()
    List<AppUser> getAllUser() {
        return appUserService.getAllUser();
    }

    @GetMapping("/login")
    UserDetails login() {
        return getUserDetails();
    }

    @GetMapping("/me")
    UserDetails getUserDetails() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        AppUser userFromDatabase = appUserService.findUserByUsername(username);
        return new UserDetails(username, userFromDatabase.kpiOwner(), userFromDatabase.technicalRole());
    }

    @GetMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }
}
