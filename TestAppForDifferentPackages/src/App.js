import React from 'react';
import Select from 'react-select';
import SomeComponent from "./someComponent";

function App() {

  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' },
  // ];
  return (
    <div className="App">
       {/* <Select
        defaultValue={options[0]}
        placeholder="choose something"
        options={options}
        isClearable={true}
        isMulti={false}
        isDisabled={false}
      /> */}
      <SomeComponent/>
    </div>
  );
}

export default App;
