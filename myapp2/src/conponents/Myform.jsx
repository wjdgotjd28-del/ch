import { useState } from "react"

export default function myform() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({...user, [name]: value});
    }

    const handleSubmit = (e) => {
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