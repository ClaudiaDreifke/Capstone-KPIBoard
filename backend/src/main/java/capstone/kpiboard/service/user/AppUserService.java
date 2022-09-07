package capstone.kpiboard.service.user;

import capstone.kpiboard.model.user.AppUser;
import capstone.kpiboard.model.user.NewAppUser;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@AllArgsConstructor
public class AppUserService {

    private final AppUserRepo appUserRepo;

    public AppUser addNewUser(NewAppUser newAppUser) {
        return appUserRepo.save(newAppUser.withRandomIdAndPasswordHash());
    }

    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = appUserRepo.findById(username)
                .orElse(null);
        if (appUser == null) {
            return null;
        }
        return new User(appUser.username(), appUser.password(), Collections.emptyList());
    }
}

