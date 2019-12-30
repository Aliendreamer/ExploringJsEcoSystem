import React,{useState} from 'react';
const slidesDate = ['Today', 'Last Week', 'Last Month', 'Last Quarter', 'Last Year'];
 
const initialState = 'Today';
const rotationStep = 1;
const BubbleChart =() => {
    const [changeDate, setChangeDate] = useState(initialState);
    
    const handleChange = (isLeft) => {
        let currentIndex = slidesDate.indexOf(changeDate);
        let nextIndex;
        if (isLeft) {
            nextIndex = currentIndex - rotationStep >= 0 ? currentIndex - rotationStep : slidesDate.length-rotationStep;
        } else {
            nextIndex = currentIndex + rotationStep <= slidesDate.length - rotationStep ? currentIndex + rotationStep : 0;
        }
        setChangeDate(slidesDate[nextIndex])
    }
return (
<div className="select-date-buttons">
<button className="caret" onClick={() => handleChange(true)}>&#60;</button>
<button>{changeDate}</button>
<button className="caret" onClick={() => handleChange(false)}>&#62;</button>
<button className="export-button">&#x2b73;</button>
</div>
)
  }
export default BubbleChart 