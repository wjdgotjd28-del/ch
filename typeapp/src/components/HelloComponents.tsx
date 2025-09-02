import { useEffect } from "react";
import type { HelloProps } from "../types/HelloComponentTits";

export default function HelloComponents({ name, age, fn }: HelloProps) {
    
    useEffect(() =>{
        fn("hi");
    },[]);

    return(
        <>
            Helo {name}, {age};
        </>
    )
}