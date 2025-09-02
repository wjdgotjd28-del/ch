
import type { Car } from "../type";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { addCar } from "../api/carApis";
import CarDialogcontent from "./CarDialogContents";
import { useState } from "react";

type AddCarProps = {
    loadCarData: () => void;
}
export default function AddCar({loadCarData} : AddCarProps) {
    const [open,setOpen] = useState(false);
    const [car,setCar] = useState<Car>({ 
        brand: '', model: '', color: '', registrationNumber: '', modelYear: 0, price:  0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        setCar({...car, [name]: value});
    }

    const handleSave = async() => {
        // console.log("보내는 데이터:");
        await addCar(car);
        // Car List Reload
        loadCarData();
        setCar({brand: '', model: '', color: '', registrationNumber: '', modelYear: 0, price:  0});
        handleClose();
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <>
            <Button onClick={handleOpen}>New Car</Button>
            <Dialog open={open} >
                <DialogTitle>New Car</DialogTitle>
                <DialogContent>
                    <CarDialogcontent
                        car={car}
                        handleChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>저장</Button>
                    <Button onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}