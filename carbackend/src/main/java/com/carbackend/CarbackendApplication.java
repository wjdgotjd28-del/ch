package com.carbackend;

import com.carbackend.domain.Car;
import com.carbackend.domain.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Slf4j
@SpringBootApplication
@RequiredArgsConstructor
public class CarbackendApplication implements CommandLineRunner {

    private final CarRepository carRepository;

    public static void main(String[] args) {
        SpringApplication.run(CarbackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        //애플리케이션 로딩 후 실행하고 싶은 코두ㅜ
        carRepository.save(Car.builder()
                .brand("BMW")
                .model("M3")
                .color("red")
                .registrationNumber("123456789")
                .modelYear(2020)
                .price(100000)
                .build());
        carRepository.save(Car.builder()
                .brand("Hyundai")
                .model("Avante")
                .color("white")
                .registrationNumber("HYU-1001")
                .modelYear(2022)
                .price(21000)
                .build());

        carRepository.save(Car.builder()
                .brand("Kia")
                .model("Sorento")
                .color("black")
                .registrationNumber("KIA-2002")
                .modelYear(2023)
                .price(32000)
                .build());

        carRepository.save(Car.builder()
                .brand("BMW")
                .model("X5")
                .color("blue")
                .registrationNumber("BMW-3003")
                .modelYear(2021)
                .price(58000)
                .build());

        carRepository.save(Car.builder()
                .brand("Mercedes")
                .model("C-Class")
                .color("silver")
                .registrationNumber("BEN-4004")
                .modelYear(2020)
                .price(47000)
                .build());

        carRepository.save(Car.builder()
                .brand("Tesla")
                .model("Model 3")
                .color("red")
                .registrationNumber("TES-5005")
                .modelYear(2023)
                .price(53000)
                .build());

        carRepository.save(Car.builder()
                .brand("Ford")
                .model("Explorer")
                .color("gray")
                .registrationNumber("FOR-6006")
                .modelYear(2022)
                .price(39000)
                .build());

        carRepository.save(Car.builder()
                .brand("Chevrolet")
                .model("Malibu")
                .color("white")
                .registrationNumber("CHE-7007")
                .modelYear(2021)
                .price(25000)
                .build());

        carRepository.save(Car.builder()
                .brand("Audi")
                .model("A4")
                .color("black")
                .registrationNumber("AUD-8008")
                .modelYear(2023)
                .price(49000)
                .build());

        carRepository.save(Car.builder()
                .brand("Toyota")
                .model("Camry")
                .color("blue")
                .registrationNumber("TOY-9009")
                .modelYear(2022)
                .price(27000)
                .build());

        carRepository.save(Car.builder()
                .brand("Honda")
                .model("Civic")
                .color("red")
                .registrationNumber("HON-1010")
                .modelYear(2020)
                .price(22000)
                .build());

        for (Car car : carRepository.findAll()) {
            log.info("brand: {}, model{}", car.getBrand(), car.getModel());
        }
    }
}
