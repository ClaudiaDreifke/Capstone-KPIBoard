package capstone.kpiboard.security;

import capstone.kpiboard.model.roles.TechnicalRole;
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
                .antMatchers("/api/users/login").permitAll()
                .antMatchers("/api/users/logout").permitAll()
                .antMatchers("/api/users/me").authenticated()
                .antMatchers(HttpMethod.GET, "/api/roles").authenticated()
                .antMatchers(HttpMethod.POST, "/api/roles").hasAuthority(TechnicalRole.ADMIN.toString())
                .antMatchers(HttpMethod.DELETE, "/api/roles/*").hasAuthority(TechnicalRole.ADMIN.toString())
                .antMatchers(HttpMethod.POST, "/api/users").hasAuthority(TechnicalRole.ADMIN.toString())
                .antMatchers(HttpMethod.DELETE, "/api/kpis/*").hasAuthority(TechnicalRole.ADMIN.toString())
                .antMatchers(HttpMethod.POST, "/api/kpis").hasAuthority(TechnicalRole.ADMIN.toString())
                .antMatchers("/api/**").authenticated()
                .anyRequest().permitAll()
                .and().httpBasic().authenticationEntryPoint(new CustomAuthenticationEntryPoint())
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
