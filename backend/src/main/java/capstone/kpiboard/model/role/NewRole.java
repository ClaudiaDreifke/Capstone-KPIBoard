package capstone.kpiboard.model.role;

import org.jetbrains.annotations.NotNull;

import java.util.UUID;

public record NewRole(
        @NotNull
        String roleName
) {
    public Role withRandomId() {
        return new Role(UUID.randomUUID().toString(), roleName());
    }

}
