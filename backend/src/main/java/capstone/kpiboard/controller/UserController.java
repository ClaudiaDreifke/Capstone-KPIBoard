package capstone.kpiboard.controller;

import capstone.kpiboard.model.user.AppUser;
import capstone.kpiboard.model.user.NewAppUser;
import capstone.kpiboard.service.user.AppUserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class UserController {

    private final AppUserService appUserService;

    public UserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @PostMapping("/user")
    @ResponseStatus(code = HttpStatus.CREATED)
    public AppUser addNewAppUser(@RequestBody NewAppUser newAppUser) {
        return appUserService.addNewUser(newAppUser);
    }
}
