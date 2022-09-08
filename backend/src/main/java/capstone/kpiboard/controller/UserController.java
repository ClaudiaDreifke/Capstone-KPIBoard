package capstone.kpiboard.controller;

import capstone.kpiboard.model.user.AppUser;
import capstone.kpiboard.model.user.NewAppUser;
import capstone.kpiboard.service.user.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final AppUserService appUserService;

    @PostMapping("/user")
    @ResponseStatus(code = HttpStatus.CREATED)
    public AppUser addNewAppUser(@RequestBody NewAppUser newAppUser) {
        return appUserService.addNewUser(newAppUser);
    }
}
