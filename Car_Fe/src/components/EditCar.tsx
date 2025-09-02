import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from "@mui/material";
import { useState } from "react";
import CarDialogcontent from "./CarDialogContents";
import type { Car } from "../type";
import { updateCar } from "../api/carApis";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

type EditCarProps = {
    carData: Car;
    loadCarData: () => void;
}

export default function EditCar({carData, loadCarData}: EditCarProps) {
    const [open,setOpen] = useState(false);
    const [car,setCar] = useState<Car>({
        id: 0, brand: '', model: '', color: '', registrationNumber: '', modelYear: 0, price:  0
    })

    const handleOpen = () => {
        setCar({
            id: carData.id, 
            brand: carData.brand, 
            model: carData.model, 
            color: carData.color, 
            registrationNumber: carData.registrationNumber, 
            modelYear: carData.modelYear, 
            price: carData.price
        });
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const handleSave = async() => {
        await updateCar(car);
        loadCarData();
        setCar({id: 0, brand: '', model: '', color: '', registrationNumber: '', modelYear: 0, price:  0});
        handleClose();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        setCar({...car, [name]: value});
    }

    return(
        <>
            <Tooltip title='수정'>
                <IconButton onClick={handleOpen} size="small">
                    <EditIcon/>
                </IconButton>
            </Tooltip>
            <Dialog open={open} >
                <DialogTitle>Edit Car</DialogTitle>
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