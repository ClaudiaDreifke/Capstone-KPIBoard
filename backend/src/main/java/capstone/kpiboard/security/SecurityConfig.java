package capstone.kpiboard.security;

import capstone.kpiboard.service.user.AppUserService;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@EnableWebSecurity
public class SecurityConfig {
    private final AppUserService appUserService;

    public SecurityConfig(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and()
                .authorizeRequests()
                .antMatchers("/api/user/login").permitAll()
                .antMatchers("/api/user/logout").permitAll()
                .antMatchers("/api/user/me").permitAll()
                .antMatchers("/api/user").authenticated()
                .antMatchers(HttpMethod.PUT, "api/kpis/*").authenticated() //nicht gesperrt!!
                .antMatchers(HttpMethod.GET, "api/roles").authenticated() //funktioniert
                .antMatchers("/api/roles").hasRole("ADMIN") //gesperrt ja, aber Admin nein
                .antMatchers(HttpMethod.POST, "/api/user").hasRole("ADMIN") //gesperrt ja, aber Admin nein
                .antMatchers(HttpMethod.DELETE, "/api/kpis/*").hasRole("ADMIN") //gesperrt ja, aber Admin nein
                .antMatchers(HttpMethod.POST, "/api/kpis").hasRole("ADMIN") //gesperrt ja, aber Admin nein
                .and().httpBasic()
                .and().build();
    }

    @Bean
    public UserDetailsManager userDetailsService() {
        return new UserDetailsManager() {
            @Override
            public void createUser(UserDetails user) {
                throw new UnsupportedOperationException();
            }

            @Override
            public void updateUser(UserDetails user) {
                throw new UnsupportedOperationException();
            }

            @Override
            public void deleteUser(String username) {
                throw new UnsupportedOperationException();
            }

            @Override
            public void changePassword(String oldPassword, String newPassword) {
                throw new UnsupportedOperationException();
            }

            @Override
            public boolean userExists(String username) {
                throw new UnsupportedOperationException();
            }

            @Override
            public User loadUserByUsername(String username) {
                return appUserService.loadUserByUsername(username);
            }
        };
    }
}
