import useStore from "./Store";

export default function GrandChild() {
const { theme, toggleTheme} =useStore(); 
return(
    <div style={{
        border: "1px solid gray",
        margin: "1rem", 
        padding: "1rem", 
        backgroundColor: theme === "light"? " #ddd" : "#111",
        color: theme === "light" ? "black" : "white",

    }}>
    <p>GrandChild 컴포넌트 테마 상태 사용 중</p> 
    <button onClick={toggleTheme} >테마 전환 (GrandChild)</button> 
    </div>
) }