import Myform from "./components/Myform";
import './App.css'
import HelloComponents from "./components/HelloComponents";
import WeatherInfo from "./components/WeatherInfo";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Container } from "@mui/material";
import ShoppingList from "./components/ShoppingList";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import RestGithub from "./components/RestGithub";
import MyDatePicker from "./components/MyDatePicker";

ModuleRegistry.registerModules([ AllCommunityModule])

function App() {
  let hello: string;
  hello = '뷁';
  console.log(typeof hello);

  const number: number[]= [1,2,3,4,5];
  console.log(number);

  return (
    <>
      <BrowserRouter>
        <Container>
          <nav>
            <Link to={"/"}>Home</Link><br></br>
            <Link to={"/restgithub"}>restgithub</Link><br></br>
            <Link to={"/mydatepicker"}>mydatepicker</Link><br/>
            <Link to={"/shoppinglist"}>shoppinglist</Link>
          </nav>
          <Routes>
            <Route path="/" element={<WeatherInfo/>}/>
            <Route path="/restgithub" element={<RestGithub/>}/>
            <Route path="/mydatepicker" element={<MyDatePicker/>}/>
            <Route path="/shoppinglist" element={<ShoppingList/>}/>
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  )
}

export default App
