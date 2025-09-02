package com.carbackend.service;

import com.carbackend.domain.Car;
import com.carbackend.domain.repository.CarRepository;
import com.carbackend.dto.CarDto;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CarService {

    private final CarRepository carRepository;

    public List<CarDto> findAll() {
        List<CarDto> carDtos = new ArrayList<>();
        for (Car car : carRepository.findAll()) {
            CarDto dto = CarDto.builder()
                    .id(car.getId())
                    .brand(car.getBrand())
                    .model(car.getModel())
                    .color(car.getColor())
                    .registrationNumber(car.getRegistrationNumber())
                    .modelYear(car.getModelYear())
                    .price(car.getPrice())
                    .build();
            carDtos.add(dto);
        }
        return carDtos;
    }

    public CarDto addCar(CarDto carDto){
        Car car = Car.builder()
                .brand(carDto.getBrand())
                .model(carDto.getModel())
                .color(carDto.getColor())
                .registrationNumber(carDto.getRegistrationNumber())
                .modelYear(carDto.getModelYear())
                .price(carDto.getPrice())
                .build();
        Car savedCar = carRepository.save(car);
        carDto.setId(savedCar.getId());
        return carDto;
    }

    public CarDto updateCar(CarDto carDto){
        Car car = carRepository.findById(carDto.getId()).orElseThrow(EntityNotFoundException::new);
        car.updateCar(carDto);
        return carDto;
    }

    public Long deleteCar(Long carId){
        carRepository.deleteById(carId);
        return carId;
    }
}
