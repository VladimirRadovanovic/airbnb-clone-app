import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Component } from 'react';
import {useState} from 'react'


import { DateRange } from 'react-date-range';

// class MyComponent extends Component {
//   handleSelect(ranges){
//     console.log(ranges);
//     // {
//     //   selection: {
//     //     startDate: [native Date Object],
//     //     endDate: [native Date Object],
//     //   }
//     // }
//   }
//   render(){
//     const selectionRange = {
//       startDate: new Date(),
//       endDate: new Date(),
//       key: 'selection',
//     }
//     return (
//       <DateRangePicker
//         ranges={[selectionRange]}
//         onChange={this.handleSelect}
//         showSelectionPreview={true}
//         minDate={new Date()}
//         rangeColors={['red']}
//       />
//     )
//   }
// }

// export default MyComponent;

function MyCalendar() {
    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
      ]);
      console.log(state)
      return (
        <DateRange
        editableDateInputs={true}
        onChange={item => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
         minDate={new Date()}
         rangeColors={['red']}
      />
      )

}

export default MyCalendar;
