package capstone.kpiboard.model.role;

import org.jetbrains.annotations.NotNull;

import java.util.UUID;

public record NewUserRole(
        @NotNull
        String roleName
) {
    public UserRole withRandomId() {
        return new UserRole(UUID.randomUUID().toString(), roleName());
    }

}
