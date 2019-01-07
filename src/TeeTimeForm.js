import React from 'react'

export default function TeeTimeForm(props) {
    const currentDate= new Date()
    const monthString = currentDate.getMonth() + 1 > 9 ? `${currentDate.getMonth() + 1}`: `0${currentDate.getMonth() + 1}`
    const dayString =  currentDate.getDate() > 9 ? `${currentDate.getDate()}` : `0${currentDate.getDate()}`
    const hourString = currentDate.getHours() > 9 ? `${currentDate.getHours()}` : `0${currentDate.getHours()}`
    const minString = currentDate.getMinutes() > 9 ? `${currentDate.getMinutes()}` : `0${currentDate.getMinutes()}`
    const cutOffDayString =  currentDate.getDate() > 9 ? `${currentDate.getDate() + 2}` : `0${currentDate.getDate() + 2}`
    const currentDateString = `${currentDate.getFullYear()}-${monthString}-${dayString}T${hourString}:${minString}`
    const cutOffDateString = `${currentDate.getFullYear()}-${monthString}-${cutOffDayString}T${hourString}:${minString}`
    return (
        <form className="TeeTimeForm" onSubmit={event => {
                event.preventDefault()
                const date = new Date(event.target.teeDate.value)
                const newTeeTime = { date, golfers: [props.data.user] }
                props.addTeeTime(newTeeTime)
            }}>
        <input type="datetime-local" name="teeDate" id="myDate" defaultValue={currentDateString} max={cutOffDateString} min={currentDateString}/>
        <input type="submit" value="Request Tee Time"/>
        </form>
    )
}