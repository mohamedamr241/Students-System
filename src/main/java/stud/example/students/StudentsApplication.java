package stud.example.students;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class StudentsApplication {
	public static void main(String[] args) {
		SpringApplication.run(StudentsApplication.class, args);
	}
}
