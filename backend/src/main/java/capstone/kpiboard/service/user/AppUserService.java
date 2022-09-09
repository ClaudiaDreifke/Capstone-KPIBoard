package capstone.kpiboard.service.user;

import capstone.kpiboard.model.user.AppUser;
import capstone.kpiboard.model.user.NewAppUser;
import lombok.AllArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AppUserService {

    private final AppUserRepo appUserRepo;
    private final PasswordEncoder passwordEncoder;

    public AppUser addNewUser(NewAppUser newAppUser) {
        AppUser appUser = new AppUser(newAppUser.username(), passwordEncoder.encode(newAppUser.password()), newAppUser.emailAddress(), newAppUser.kpiOwner(), newAppUser.technicalRole());
        return appUserRepo.save(appUser);
    }

    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = appUserRepo.findById(username).orElseThrow(() -> new UsernameNotFoundException(username));
        return new User(appUser.username(), appUser.passwordHash(), List.of(new SimpleGrantedAuthority(appUser.technicalRole().toString())));
    }

    public List<AppUser> getAllUser() {
        return appUserRepo.findAll();
    }
}

