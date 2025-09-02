import axios from "axios";
import type { Car } from "../type"

const BASE_URL = import.meta.env.VITE_API_URL;

// 자동차 목록 조회
export const getCars = async(): Promise<Car[]> => {
    const response = await axios.get(`${BASE_URL}/cars`);
    return response.data;
}

export const deleteCar = async (id: number): Promise<number> => {
    const response = await axios.delete(`${BASE_URL}/cars/${id}`);
    return response.data;
}

export const addCar = async(car:Car): Promise<Car> => {
    const response = await axios.post(`${BASE_URL}/cars`,car);
    return response.data;
}

export const updateCar = async(car:Car): Promise<Car> => {
    const response = await axios.put(`${BASE_URL}/cars`,car);
    return response.data;
}