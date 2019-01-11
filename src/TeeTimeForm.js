import React from 'react'

export default function TeeTimeForm(props) {
    const memberCount = props.teeTimeSearch.golfers.length
    const guestMax = props.data.user.userType === 'admin' ? 4 - memberCount : 3 - memberCount
    const monthStrings = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    // props.updateTeeTimeSearch({...props.teeTimeSearch, date: props.selectedTeeTime._id ? props.selectedTeeTime.date : currentDate})
    // const currentDateString = getDateString(currentDate)
    // const cutOffDayString =  currentDate.getDate() > 7 ? `${currentDate.getDate() + 2}` : `0${currentDate.getDate() + 2}`
    // const monthString = currentDate.getMonth() + 1 > 9 ? `${currentDate.getMonth() + 1}`: `0${currentDate.getMonth() + 1}`
    // const cutOffDateString = `${currentDate.getFullYear()}-${monthString}-${cutOffDayString}T16:00`
    // // = getDateString(new Date(props.teeTimeSearch.date))
    const {date} = props.teeTimeSearch
    const teeTimeDateString = `${date.month}-${date.day}-${date.year}, ${date.hours % 12}:${date.minutes} ${date.hours < 12 ? 'AM' : 'PM'}`
    const unavailableTeeDates = props.isSearching ? props.data.userTeeTimes.map(teeTime => teeTime.date) : props.data.allTeeTimes.map(teeTime => teeTime.date) 
    const availableTeeDates = findAvailableTeeDates().filter(teeDate => !unavailableTeeDates.includes(teeDate))
    const availableMonths = []
    const availableDays = []
    const availableHours = []
    const availableMinutes = []
    availableTeeDates.forEach(teeDate => {
        availableMonths.includes(teeDate.getMonth()) || availableMonths.push(teeDate.getMonth())
        availableDays.includes(teeDate.getDate()) || availableDays.push(teeDate.getDate())
        availableHours.includes(teeDate.getHours()) || availableHours.push(teeDate.getHours())
        availableMinutes.includes(teeDate.getMinutes()) || availableMinutes.push(teeDate.getMinutes())
    })
    return (
        <form className={`TeeTimeForm${props.selectedTeeTime._id ? ' selectedTeeTimeForm' : ''}`} 
        onSubmit={event => {
            event.preventDefault()
            // basic user's automatically added to teetime
            const golfer = props.data.user.userType === 'admin' ? null : props.data.user 
            const {date} = props.teeTimeSearch
            const teeDate = [date.year, date.month, date.day, date.hours, date.minutes]
            props.selectedTeeTime._id || props.addTeeTime({...props.teeTimeSearch, date: new Date(...teeDate), golfers: [...props.teeTimeSearch.golfers, golfer]})
        }}
        >
            <input type="radio" name="walkride" value="walk" checked={props.teeTimeSearch.teeType === "walk"} onChange={event => updateForm(event, props)} required/>Walk<br/>
            <input type="radio" name="walkride" value="ride" checked={props.teeTimeSearch.teeType === "ride"} onChange={event => updateForm(event, props)}  required/>Ride<br/>
            {/* <input type="datetime-local" name="teeDate"
                value={teeTimeDateString}
                max={props.data.user.userType === 'admin' ? '' : cutOffDateString} 
                min={currentDateString}
                step={300}
                onChange={event => updateForm(event, props)}
                /> */}
            <label>
                Select a date:
                {props.isAdmin && (
                    <>
                        <label>
                            Year:
                            {props.isAdmin && props.teeTimeSearch.date.year}
                        </label>
                        <label>
                            Month:
                            {!props.isAdmin ? 
                            (props.teeTimeSearch.date.month) : 
                            (<select name='teeMonth' onChange={event => updateForm(event, props)}>
                                {availableMonths.map(teeMonth => <option key={teeMonth || -1} value={teeMonth}>{`${monthStrings[teeMonth]}`}</option>)}
                            </select>)}
                        </label>
                    </>
                )}
                <label>
                    Day:
                    <select name='teeDay' onChange={event => updateForm(event, props)}>
                        {availableDays.map(teeDay => <option key={teeDay || -1} value={teeDay}>{`${teeDay}`}</option>)}
                    </select>
                </label>
                {props.teeTimeSearch.day || (
                    <>
                        <label>
                            Hour:
                            <select name='teeHour' onChange={event => updateForm(event, props)}>
                                {availableHours.map(teeHour => <option key={teeHour || -1} value={teeHour}>{`${teeHour % 12 || 12} ${teeHour < 12 ? 'AM' : 'PM'}`}</option>)}
                            </select>
                        </label>
                        {props.teeTimeSearch.hours || (
                            <label>
                                Minute:
                                <select name='teeMinute' onChange={event => updateForm(event, props)}>
                                     {availableMinutes.map(teeMinute => <option key={teeMinute || -1} value={teeMinute}>{`${teeMinute}`}</option>)}
                                </select>
                            </label>
                        )}
                    </>
                )}
                <h6>{teeTimeDateString}</h6>
            </label>
            <label>
                Select other members:
                <select name="golfers" multiple 
                    onChange={event => {
                        // to pass event to update form it must persist
                        event.persist()
                        updateForm(event, props)
                    }}
                    value={props.teeTimeSearch && props.teeTimeSearch.golfers.map(golfer => golfer._id)}>
                    {props.data.user.userType === 'admin' ? 
                    props.data.allUsers.map(user => <option key={user._id} value={user._id}>{`${user.name}`}</option>) : 
                    props.data.userFriends.map(user => {
                        return (
                            <option key={user._id} 
                            value={user._id}>
                            {`${user.name}`}
                        </option>
                    )}
                    )}
                </select>
            </label>
            <label>
                Number of guests:
                <input type="number" name="guests" 
                min="0" 
                max={`${guestMax}`} 
                value={props.teeTimeSearch.guests} 
                onChange={event => updateForm(event, props)}/>
                {!props.selectedTeeTime._id && <input type="submit" value="Request Tee Time"/>}
            </label>
        </form>
    )
}

function findAvailableTeeDates(isAdmin) {
    const availableTeeDates = []
    const currentDate = new Date()
    currentDate.setMinutes(currentDate.getMinutes() + (10 - (currentDate.getMinutes() % 10)))
    currentDate.setSeconds(0)
    currentDate.setMilliseconds(0)
    console.log(currentDate)
    const cutoffDate = isAdmin ? currentDate.getDate() + 30 : currentDate.getDate() + 3
    console.log(cutoffDate)
    while (currentDate.getDate() < cutoffDate) {
        availableTeeDates.push(currentDate.toISOString())
        currentDate.setMinutes(currentDate.getMinutes() + 10)
        if (currentDate.getHours() > 16) {
            currentDate.setDate(currentDate.getDate() + 1)
            currentDate.setHours(8) 
        } else if (currentDate.getHours() < 8) {
            currentDate.setHours(8)
        }
    } 
    return availableTeeDates.map(teeDate => new Date(teeDate))
}

// const getDateString = (date) => {
//     const monthString = date.getMonth() + 1 > 9 ? `${date.getMonth() + 1}`: `0${date.getMonth() + 1}`
//     const dayString =  date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`
//     const hourString = date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours() < 8 ? date.setHours(8) && date.getHours(): date.getHours()}`
//     const minString = date.getMinutes() > 9 ? `${date.getMinutes()}` : `0${date.getMinutes()}`
//     const dateString = `${date.getFullYear()}-${monthString}-${dayString}T${hourString}:${minString}`
//     return dateString
// }

const updateForm = (event, props) => {
    // const {props} = this
    const teeType = event.target.form.walkride.value
    const year = 2019 //event.target.form.teeYear.value
    const month = event.target.form.teeMonth.value
    const day = event.target.form.teeDay.value
    const hours = event.target.form.teeHour.value
    const minutes = event.target.form.teeMinute.value
    const date = {year, month, day, hours, minutes}
    console.log(date)
    const selectedGolferIDs = []
    for (let selectedGolfer of event.target.form.golfers.selectedOptions) {
        selectedGolferIDs.push(selectedGolfer.value)
    }
    let golfers = props.data.allUsers.filter(user => selectedGolferIDs.includes(user._id))       
    golfers = props.data.user.userType === 'admin' ? golfers : [...golfers, props.data.user]
    const memberCount = golfers.length
    const guestMax = props.data.user.userType === 'admin' ? 4 - memberCount : 3 - memberCount
    const guestCount = parseInt(event.target.form.guests.value)
    const guests = guestCount > guestMax ? guestMax : guestCount
    const newTeeTime = { teeType, date, golfers, guests }
    props.updateTeeTimeSearch(newTeeTime)
    // overwrite date field below to create genuine Date() object
    props.selectedTeeTime._id && props.updateTeeTime({...props.selectedTeeTime, ...newTeeTime, date: new Date(...date)})
} 