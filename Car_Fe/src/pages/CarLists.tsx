import { useEffect, useState } from "react"
import type { Car } from "../type"
import { deleteCar, getCars } from "../api/carApis";
import { DataGrid } from "@mui/x-data-grid";
import type { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { IconButton, Snackbar, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCar from "../components/AddCar";
import EditCar from "../components/EditCar";

export default function CarList() {
    const [data,setData] = useState<Car[]>([]);
    const [toastVal,setToastVal] = useState({
        open: false, msg: ''
    })

    const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80},
    { field: 'brand', headerName: '브랜드', width: 120 },
    { field: 'model', headerName: '모델', width: 120 },
    { field: 'color', headerName: '색상', width: 100 },
    { field: 'registrationNumber', headerName: '등록번호', width: 150 },
    { field: 'modelYear', headerName: '연식', width: 100 },
    { field: 'price', headerName: '가격', width: 100 },
    { 
        field: 'edit',
        headerName: '수정',
        width: 90,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params: GridCellParams) => (
                <EditCar carData={params.row} loadCarData={loadCarData}/>
        )
    },
    { 
        field: 'delete',
        headerName: '삭제',
        width: 90,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params: GridCellParams) => (
            <Tooltip title='삭제'>
                <IconButton aria-label="delete" onClick={() => deleteCarData(params.row.id)}>
                  <DeleteIcon />
                </IconButton>
            </Tooltip>
        )
    }
];

    const loadCarData = () => {
        getCars()
        .then(res => setData(res))
        .catch(err => console.log(err))
        ;
    }

    const deleteCarData = (id: number) => {
        if(confirm(`${id}번 데이터를 삭제하시겠습니까?`)){
            deleteCar(id)
            .then(res => {
                loadCarData();
                setToastVal({open: true, msg: `${res}번 데이터가 삭제되었습니다.`})})
            .catch(err => console.log(err));
        }
        
    }

    useEffect(() => {
        loadCarData();
    }, []);

    return(
        <>
            <AddCar loadCarData={
                loadCarData
            }/>
            <DataGrid rows={data} columns={columns} getRowId={row => row.id} disableRowSelectionOnClick={false} showToolbar/>
            <Snackbar open={toastVal.open} onClose = {() => setToastVal({open: false, msg: ''})} message={toastVal.msg} autoHideDuration={2000} /> 
        </>
    )
}