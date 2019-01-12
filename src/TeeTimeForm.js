import React from 'react'

export default function TeeTimeForm(props) {
    const memberCount = (props.teeTimeSearch.golfers && props.teeTimeSearch.golfers.length) || 0
    const guestMax = props.data.user.userType === 'admin' ? 4 - memberCount : 3 - memberCount
    const monthStrings = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const {date} = props.teeTimeSearch
    const teeTimeDateString = (props.selectedTeeTime._id || !props.isSearching) && 
    `${date.month + 1}-${date.day}-${date.year}, ${date.hours % 12}:${date.minutes.toString().length > 1 ? date.minutes : `0${date.minutes}`} ${date.hours < 12 ? 'AM' : 'PM'}`
    
    // find the taken dates
    const unavailableTeeDates = props.data.allTeeTimes.map(teeTime => new Date(teeTime.date))
    // find remaining dates, these are strings and can be compared directly
    const availableTeeDates = props.isSearching ? unavailableTeeDates : findAvailableTeeDates().filter(teeDate => !unavailableTeeDates.includes(teeDate))
    // create arrays to store available options
    const availableMonths = []
    const availableDays = []
    const availableHours = []
    const availableMinutes = []
    // add available options to arrays if they do not already contain them
    availableTeeDates.forEach(teeDate => {
        availableMonths.includes(teeDate.getMonth()) || availableMonths.push(teeDate.getMonth())
        availableDays.includes(teeDate.getDate()) || availableDays.push(teeDate.getDate())
        availableHours.includes(teeDate.getHours()) || availableHours.push(teeDate.getHours())
        availableMinutes.includes(teeDate.getMinutes()) || availableMinutes.push(teeDate.getMinutes())
    })
    availableMonths.sort((monthA, monthB) => monthA - monthB)
    availableDays.sort((dayA, dayB) => dayA - dayB)
    availableHours.sort((hourA, hourB) => hourA - hourB)
    availableMinutes.sort((minuteA, minuteB) => minuteA - minuteB)
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
                                {availableMonths.map(teeMonth => <option key={teeMonth} value={teeMonth}>{`${monthStrings[teeMonth]}`}</option>)}
                            </select>)}
                        </label>
                    </>
                )}
                <label>
                    Day:
                    <select name='teeDay' value={props.teeTimeSearch.date.day} onChange={event => updateForm(event, props)}>
                        {props.isSearching && <option value='0'> - </option>}
                        {availableDays.map(teeDay => <option key={teeDay} value={teeDay}>{`${teeDay}`}</option>)}
                    </select>
                </label>
                {props.teeTimeSearch.day || (
                    <>
                        <label>
                            Hour:
                            <select name='teeHour' value={props.teeTimeSearch.date.hours} onChange={event => updateForm(event, props)}>
                                {props.isSearching && <option value='0'> - </option>}
                                {availableHours.map(teeHour => <option key={teeHour} value={teeHour}>{`${teeHour % 12 || 12} ${teeHour < 12 ? 'AM' : 'PM'}`}</option>)}
                            </select>
                        </label>
                        {props.teeTimeSearch.hours || (
                            <label>
                                Minute:
                                <select name='teeMinute' value={props.teeTimeSearch.date.minutes} onChange={event => updateForm(event, props)}>
                                    {props.isSearching && <option value='0'> - </option>}
                                    {availableMinutes.map(teeMinute => <option key={teeMinute} value={teeMinute}>{`${teeMinute.toString().length > 1 ? teeMinute : `0${teeMinute}`}`}</option>)}
                                </select>
                            </label>
                        )}
                    </>
                )}
                <h6>{!(props.selectedTeeTime._id || props.isSearching) && teeTimeDateString}</h6>
            </label>
            <label>
                Select other members:
                <select name="golfers" multiple 
                    onChange={event => {
                        // to pass event to update form it must persist
                        // persist will allow it to propogate
                        // event.persist()
                        updateForm(event, props)
                    }}
                    value={props.teeTimeSearch.golfers && props.teeTimeSearch.golfers.map(golfer => golfer._id)}
                >
                    {props.isAdmin || props.isSearching ? 
                    props.data.allUsers.map(user => <option key={user._id} value={user._id}>{`${user.name}`}</option>) : 
                    props.data.userFriends.map(user => <option key={user._id} value={user._id}>{`${user.name}`}</option>)}
                </select>
            </label>
            <label>
                Number of guests:
                <input type="number" name="guests" 
                min="0" 
                max={`${guestMax}`} 
                value={props.teeTimeSearch.guests || 0} 
                onChange={event => updateForm(event, props)}/>
                {!(props.selectedTeeTime._id || props.isSearching)&& <input type="submit" value="Request Tee Time" onClick={event => updateForm(event, props)}/>}
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
    // this is where we could grant admin privileges to add tee times a year in advance
    const cutoffDate = isAdmin ? currentDate.getDate() + 30 : currentDate.getDate() + 3
    while (currentDate.getDate() < cutoffDate) {
        availableTeeDates.push(currentDate.toISOString())
        currentDate.setMinutes(currentDate.getMinutes() + 10)
        if (currentDate.getHours() > 16) {
            currentDate.setDate(currentDate.getDate() + 1)
            currentDate.setHours(8) 
        }
    } 
    return availableTeeDates.map(teeDate => new Date(teeDate))
}

const updateForm = (event, props) => {
    // const {props} = this
    const currentDate = new Date()
    const teeType = event.target.form.walkride.value
    const year = currentDate.getFullYear() //event.target.form.teeYear.value
    const month = props.isAdmin ? parseInt(event.target.form.teeMonth.value) : currentDate.getMonth()
    const day = parseInt(event.target.form.teeDay.value)
    const hours = parseInt(event.target.form.teeHour.value)
    const minutes = parseInt(event.target.form.teeMinute.value)
    const date = {year, month, day, hours, minutes}
    const selectedGolferIDs = []
    for (let selectedGolfer of event.target.form.golfers.selectedOptions) {
        selectedGolferIDs.push(selectedGolfer.value)
    }
    let golfers = props.data.allUsers.filter(user => selectedGolferIDs.includes(user._id))       
    golfers = props.isAdmin || props.isSearching ? golfers : [...golfers, props.data.user]

    const memberCount = golfers.length
    const guestMax = props.data.user.userType === 'admin' ? 4 - memberCount : 3 - memberCount
    const guestCount = parseInt(event.target.form.guests.value)
    const guests = guestCount > guestMax ? guestMax : guestCount
    const newTeeTime = { teeType, date, golfers, guests }
    props.updateTeeTimeSearch(newTeeTime)
    // overwrite date field below to create genuine Date() object
    props.selectedTeeTime._id && props.updateTeeTime({...props.selectedTeeTime, ...newTeeTime, date: new Date(...date)})
} 