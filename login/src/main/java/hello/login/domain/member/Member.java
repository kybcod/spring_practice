package hello.login.domain.member;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class Member {

    private Long id;

    @NotEmpty(message = "로그인 아이디 비어 있습니다.")
    private String loginId;

    @NotEmpty
    private String name;

    @NotEmpty
    private String password;
}
