import React from 'react'

export default function TeeTimeForm(props) {
    const currentDate= new Date()
    const monthString = currentDate.getMonth() + 1 > 9 ? `${currentDate.getMonth() + 1}`: `0${currentDate.getMonth() + 1}`
    const dayString =  currentDate.getDate() > 9 ? `${currentDate.getDate()}` : `0${currentDate.getDate()}`
    const cutOffDayString =  currentDate.getDate() > 9 ? `${currentDate.getDate() + 2}` : `0${currentDate.getDate() + 2}`
    const currentDateString = `${currentDate.getFullYear()}-${monthString}-${dayString}T${currentDate.getHours()}:${currentDate.getMinutes()}`
    const cutOffDateString = `${currentDate.getFullYear()}-${monthString}-${cutOffDayString}T${currentDate.getHours()}:${currentDate.getMinutes()}`
    return (
        <form className="TeeTimeForm" onSubmit={event => {
            event.preventDefault()
            const teeDate = event.target.teeDate.value
                const newTeeTime = new Date(teeDate)
                props.addTeeTime(newTeeTime)
            }}>
        <input type="datetime-local" name="teeDate" id="myDate" defaultValue={currentDateString} max={cutOffDateString} min={currentDateString}/>
        <input type="submit" value="Request Tee Time"/>
        </form>
    )
}