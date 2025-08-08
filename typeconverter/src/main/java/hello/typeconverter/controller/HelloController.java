package hello.typeconverter.controller;

import hello.typeconverter.type.IpPort;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello-v1")
    public String helloV1(HttpServletRequest request) {
        String data = request.getParameter("data");
        Integer intValue = Integer.parseInt(data);
        System.out.println("intValue = " + intValue);
        return "ok";
    }

    // http://localhost:8080/hello-v2?data=10 => 여기서 10은 문자
    @GetMapping("/hello-v2")
    public String helloV2(@RequestParam Integer data) {
        // 문자 10을 Integer 타입으로 숫자로 변환 해줌(중간 타입 변환)
        System.out.println("data = " + data);
        return "ok";
    }

    @GetMapping("/ip-port")
    public String inPort(@RequestParam IpPort ipPort) {
        System.out.println("ipPort IP = " + ipPort.getIp());
        System.out.println("ipPort PORT = " + ipPort.getPort());
        return "ok";
    }

}
