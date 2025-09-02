import React, { useState } from "react"

// type UserInfo = {
//     firstName: string;
//     lastName: string;
//     email: string;
// }
interface UserInfo<T>{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: T;
}

interface Board{
    title: string;
    content: string;
    replies: Reply[];
}

interface Toto extends Board{
    totourl: string;
}

interface Reply{
    names: string;
    content: string;
}

interface SplitPaneProps{
    left: React.FC;
    right: React.FC;
}

export default function myform() {
    const [count, setCount] = useState <number>(0);
    const [user, setUser] = useState<UserInfo <string>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: 0,
    });

    //타입 지정 안하면 any
    // function add(a: number,b:number):number {
    //     if (a+b <0) {
    //         return -1;
    //     }
    //     return a+b;
    // }
    const add = (a: number, b:number): number => {
        return a+b;
    }
    const result: number = add(3,-5);
    console.log(result);
    console.log(add(3,5));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({...user, [name]: value});
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(`Hello ${user.firstName}, ${user.lastName}`);
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>First name</label>
            <input type="text" name="firstName" value={user.firstName} onChange={handleChange}/>
            <br></br>
            <label>Last name</label>
            <input type="text" name="lastName" value={user.lastName} onChange={handleChange}/>
            <br></br>
            <label>Email</label>
            <input type="email" name="email" value={user.email} onChange={handleChange}/>
            <br></br>
            <button>제출</button>
        </form>
    )
}