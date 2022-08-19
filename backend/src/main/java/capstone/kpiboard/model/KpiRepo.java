package capstone.kpiboard.model;


import org.springframework.data.mongodb.repository.MongoRepository;

public interface KpiRepo extends MongoRepository <Kpi, String>{
}