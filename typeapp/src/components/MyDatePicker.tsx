import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const MyDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="날짜를 선택하세요"
      />
      {selectedDate &&(
        <div>
            {format(selectedDate, "yyyy년 MM월 dd일")}
        </div>
      )}
    </div>
  );
};

export default MyDatePicker;