package hello.typeconverter.formatter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.format.Formatter;

import java.text.NumberFormat;
import java.text.ParseException;
import java.util.Locale;

@Slf4j
public class MyNumberFormatter implements Formatter<Number> {

    // "1,000" 처럼 숫자 중간의 쉼표를 적용하기 위해서는 NumberFormat 사용

    @Override
    public Number parse(String text, Locale locale) throws ParseException {
        log.info("text: {}, locale: {}", text, locale);
        NumberFormat numberFormat = NumberFormat.getNumberInstance(locale);
        return numberFormat.parse(text);
    }

    @Override
    public String print(Number object, Locale locale) {
        log.info("text: {}, locale: {}", object, locale);
        return NumberFormat.getNumberInstance(locale).format(object);
    }
}
