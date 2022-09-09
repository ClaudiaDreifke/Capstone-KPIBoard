package capstone.kpiboard.controller;

import capstone.kpiboard.model.user.AppUser;
import capstone.kpiboard.model.user.NewAppUser;
import capstone.kpiboard.service.user.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;


@RestController
@AllArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final AppUserService appUserService;

    @PostMapping()
    @ResponseStatus(code = HttpStatus.CREATED)
    public AppUser addNewAppUser(@RequestBody NewAppUser newAppUser) {
        return appUserService.addNewUser(newAppUser);
    }

    @GetMapping("/login")
    String login() {
        return getUsername();
    }

    @GetMapping("/me")
    String getUsername() {
        return new ArrayList<>((SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getAuthorities())).get(0).toString();
    }

    @GetMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }

    @GetMapping()
    List<AppUser> getAllUser() {
        return appUserService.getAllUser();
    }
}
