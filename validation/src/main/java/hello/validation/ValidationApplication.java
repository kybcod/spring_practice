package hello.validation;

import hello.validation.web.validation.ItemValidator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.validation.Validator;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class ValidationApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(ValidationApplication.class, args);
	}

	// 전체 Validate 적용(컨트롤러에서 @InitBinder 부분 제거)
	@Override
	public Validator getValidator() {
		return new ItemValidator();
	}
}
