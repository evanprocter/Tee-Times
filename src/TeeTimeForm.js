import React from 'react'

export default function TeeTimeForm(props) {
    const currentDate= new Date()
    currentDate.setMinutes(currentDate.getMinutes() - (currentDate.getMinutes() % 5))
    const monthString = currentDate.getMonth() + 1 > 9 ? `${currentDate.getMonth() + 1}`: `0${currentDate.getMonth() + 1}`
    const dayString =  currentDate.getDate() > 9 ? `${currentDate.getDate()}` : `0${currentDate.getDate()}`
    const hourString = currentDate.getHours() > 9 ? `${currentDate.getHours()}` : `0${currentDate.getHours()}`
    const minString = currentDate.getMinutes() > 9 ? `${currentDate.getMinutes()}` : `0${currentDate.getMinutes()}`
    const cutOffDayString =  currentDate.getDate() > 9 ? `${currentDate.getDate() + 2}` : `0${currentDate.getDate() + 2}`
    const currentDateString = `${currentDate.getFullYear()}-${monthString}-${dayString}T${hourString}:${minString}`
    const cutOffDateString = `${currentDate.getFullYear()}-${monthString}-${cutOffDayString}T${hourString}:${minString}`

    const selectedTeeTimeDate = props.selectedTeeTime._id ? new Date(props.selectedTeeTime.date) : new Date()
    selectedTeeTimeDate.setMinutes(selectedTeeTimeDate.getMinutes() - (selectedTeeTimeDate.getMinutes() % 5))
    const selectedTeeTimeMonthString = selectedTeeTimeDate.getMonth() + 1 > 9 ? `${selectedTeeTimeDate.getMonth() + 1}`: `0${selectedTeeTimeDate.getMonth() + 1}`
    const selectedTeeTimeDayString =  selectedTeeTimeDate.getDate() > 9 ? `${selectedTeeTimeDate.getDate()}` : `0${selectedTeeTimeDate.getDate()}`
    const selectedTeeTimeHourString = selectedTeeTimeDate.getHours() > 9 ? `${selectedTeeTimeDate.getHours()}` : `0${selectedTeeTimeDate.getHours()}`
    const selectedTeeTimeMinString = selectedTeeTimeDate.getMinutes() > 9 ? `${selectedTeeTimeDate.getMinutes()}` : `0${selectedTeeTimeDate.getMinutes()}`
    const selectedTeeTimeDateString = `${selectedTeeTimeDate.getFullYear()}-${selectedTeeTimeMonthString}-${selectedTeeTimeDayString}T${selectedTeeTimeHourString}:${selectedTeeTimeMinString}`
    // const selectedTeeTimeDateString = selectedTeeTimeDate.toISOString().split('').slice(0, selectedTeeTimeDate.toISOString().length - 1).join('')
    return (
        <form className="TeeTimeForm" 
            onSubmit={event => {
                event.preventDefault()
                const date = new Date(event.target.teeDate.value)
                const selectedGolferIDs = []
                for (let selectedGolfer of event.target.golfers.selectedOptions) {
                    selectedGolferIDs.push(selectedGolfer.value)
                }
                const golfers = props.data.allUsers.filter(user => selectedGolferIDs.includes(user._id) && user._id !== props.data.user._id)
                golfers.push(props.data.user)
                const newTeeTime = { date, golfers }
                props.selectedTeeTime._id ? props.updateTeeTime({...props.selectedTeeTime, ...newTeeTime}) : props.addTeeTime(newTeeTime)
            }}
        >
            <input type="datetime-local" name="teeDate" key={props.selectedTeeTime._id}
                defaultValue={props.selectedTeeTime._id ? selectedTeeTimeDateString : currentDateString} 
                max={cutOffDateString} 
                min={currentDateString}
                step={300}/>
            <label>
                Select other golfers:
                {/* give select element a key tied to state to update default values */}
                <select name="golfers" multiple key={props.selectedTeeTime._id} defaultValue={props.selectedTeeTime._id ? props.selectedTeeTime.golfers.filter(golfer => golfer._id !== props.data.user._id).map(golfer => golfer._id) : []}>
                    {props.data.allUsers.filter(user => user._id !== props.data.user._id).map(user => <option key={user._id} value={user._id}>{`${user.name}`}</option>)}
                </select>
            </label>
            <input type="submit" value="Request Tee Time"/>
        </form>
    )
}