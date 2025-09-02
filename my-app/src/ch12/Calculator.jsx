import { useState } from "react";
import TemperatureInput from "./TemperatureInput";

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>물이 끓습니다.</p>;
    }
    return <p>물이 안 끓습니다.</p>
}

function toCelsius(fahrenheit) {
    return ((fahrenheit - 32)*5)/9;
}

function toFahrenheit(celsius) {
    return (celsius * 9)/5 + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    //매개변수 temperatur가 숫자가 아닌 경우에 ==> input == NaN (낫 어 넘버 )
    if(Number.isNaN(input)) {
        return "";
    }
    const output = convert(input);
    const result = Math.round(output*1000)/1000; //원하는 자리수까지 남기고 반올림 하는법
    return result.toString(); //문자열로 최종반환할 거라서 toString해줌
}

export default function Calculator(props) {
    const [temperature, setTemperature] = useState("");
    const [scale,setScale] = useState("c");

    const handleCelsisusChange = (temperature) => {
        setTemperature(temperature);
        setScale("c");
    };

    const handleFahrenheitChange = (temperature) => {
        setTemperature(temperature);
        setScale("f");
    };

    const celsius = scale === "f"? tryConvert(temperature, toCelsius): temperature;
    const fahrenheit = scale === "c"? tryConvert(temperature, toFahrenheit): temperature;

    return(
        <div>
            <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={handleCelsisusChange}/>
            <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={handleFahrenheitChange}/>
            <BoilingVerdict celsius={parseFloat(celsius)}/>
        </div>
    );
}