const students = [
    {
        id: 1,
        name: "Inje1"
    },
    {
        id: 2,
        name: "Inje2"
    },
    {
        id: 3,
        name: "Inje3"
    },
    {
        id: 4,
        name: "Inje4"
    },
];

export default function AttdanceBook(props) {
    return(
        <ul>
            {students.map((student) => {
                return <li key={student.id}>{student.name}</li>;
            })}
        </ul>
    )
}