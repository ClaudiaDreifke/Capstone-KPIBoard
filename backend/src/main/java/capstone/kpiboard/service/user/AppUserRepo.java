package capstone.kpiboard.service.user;

import capstone.kpiboard.model.user.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AppUserRepo extends MongoRepository<AppUser, String> {

}
