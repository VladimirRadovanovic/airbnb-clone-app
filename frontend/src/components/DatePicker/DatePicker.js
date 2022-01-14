import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { DateRange } from 'react-date-range';

import LoginFormModal from '../LoginFormModal';
import { bookAStay } from '../../store/bookings/sessionBookings';

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
    const dispatch = useDispatch()
    const history = useHistory()
    const [showModal, setShowModal] = useState(false)
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const { id } = useParams()

    const reset = () => {
        setState(
            [
                {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: 'selection'
                }
            ]
        )
    }



    console.log(state)
    const handleBooking = () => {

        if (!sessionUser) return setShowModal(true)
        state[0].listingId = id
        console.log(state, 'use params id')
        return dispatch(bookAStay(state)).then(() => reset()).then(() => history.push('/api/user/profile')).catch(
            async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            }
        )
    }
    return (
        <div>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <DateRange
                editableDateInputs={true}
                onChange={item => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
                minDate={new Date()}
                rangeColors={['red']}
            />
            <button onClick={handleBooking}>Book a stay</button>
            {showModal && <LoginFormModal setShowModal={setShowModal}/>}
        </div>
    )

}

export default MyCalendar;
