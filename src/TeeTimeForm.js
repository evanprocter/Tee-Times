import React from 'react'

export default function TeeTimeForm(props) {
    const currentDate= new Date()
    const monthString = currentDate.getMonth() + 1 > 9 ? `${currentDate.getMonth() + 1}`: `0${currentDate.getMonth() + 1}`
    const dayString =  currentDate.getDate() > 9 ? `${currentDate.getDate()}` : `0${currentDate.getDate()}`
    const currentDateString = `${currentDate.getFullYear()}-${monthString}-${dayString}T${currentDate.getHours()}:${currentDate.getMinutes()}`
    // const cutOffDateString = `${currentDate.getFullYear()}-0${currentDate.getMonth()+1}-0${currentDate.getDate() + 2}T${currentDate.getHours()}:${currentDate.getMinutes()}`
    return (
        <form className="TeeTimeForm" onSubmit={event => {
            const teeDate = event.target.teeDate.value
                const newTeeTime = new Date(teeDate)
                props.addTeeTime(newTeeTime)
            }}>
        <input type="datetime-local" name="teeDate" id="myDate" defaultValue={currentDateString}/>
        </form>
    )
}