import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { DateRange } from 'react-date-range';

import LoginFormModal from '../LoginFormModal';
import { bookAStay } from '../../store/bookings/sessionBookings';
import './DatePicker.css'



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




    const handleBooking = () => {

        if (!sessionUser) return setShowModal(true)
        state[0].listingId = id

        return dispatch(bookAStay(state)).then(() => reset()).then(() => history.push('/api/user/profile/bookings')).catch(
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
            <div className='calendar-button-container'>
            <DateRange
                editableDateInputs={true}
                onChange={item => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
                minDate={new Date()}
                rangeColors={['red']}
            />
            <button className='stay-button' onClick={handleBooking}>Book a stay</button>
            </div>
            {showModal && <LoginFormModal setShowModal={setShowModal}/>}
        </div>
    )

}

export default MyCalendar;
