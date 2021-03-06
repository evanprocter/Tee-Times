import React from 'react'
import {getTeeTimeDate} from './store'

export default function TeeTimeForm(props){        
    // this determines the number of golfers allowed
    const memberCount = (props.teeTimeSearch.golfers && props.teeTimeSearch.golfers.length) || 0
    const guestMax = props.isAdmin ? 4 - memberCount : 3 - memberCount

    const monthStrings = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const dayStrings = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const {date} = props.teeTimeSearch
    const teeTimeDateString = (props.selectedTeeTime._id || !props.isSearching) && 
    `${dayStrings[date.dayOfTheWeek]}, ${date.month + 1}-${date.day}-${date.year}, ${date.hours % 12 || 12}:${date.minutes > 9 ? date.minutes : `0${date.minutes}`} ${date.hours < 12 ? 'AM' : 'PM'}`
    
    // find the taken dates
    const unavailableTeeDates = props.data.allTeeTimes.map(teeTime => new Date(teeTime.date))
    // If searching, show tee times that are already taken
    const availableTeeDates = props.isSearching ? unavailableTeeDates : 
        getPossibleTeeDates(props).filter(teeDate => {
            // unavailableTeeDates doesn't include 
            return !unavailableTeeDates.find(unavailableDate => unavailableDate.getTime() === teeDate.getTime()) 
        })
    const {availableMonths, availableDays, availableHours, availableMinutes} = 
        getAvailableOptions(availableTeeDates, date)
    return (
        <form 
        className={`TeeTimeForm
            ${props.selectedTeeTime._id ? ' selectedTeeTimeForm' : ''}
            ${props.isSearching ? ' searchingTeeTimes' : ''}`} 
            onSubmit={event => {
                event.preventDefault()
                // basic user's automatically added to teetime
                const {date} = props.teeTimeSearch
                const teeDate = [date.year, date.month, date.day, date.hours, date.minutes]
                props.selectedTeeTime._id || props.addTeeTime({
                    ...props.teeTimeSearch, 
                    date: new Date(...teeDate), 
                    golfers: [...props.teeTimeSearch.golfers]})
            }}
        >
            <div className='teeWalkRide'>
                <label>
                    Walk<input type="checkbox" name="walkride" value="walk" 
                    checked={props.teeTimeSearch.teeType === "walk"} 
                    onChange={event => updateForm(event, props)} />
                </label>
                <label>
                    Ride<input type="checkbox" name="walkride" value="ride" 
                    checked={props.teeTimeSearch.teeType === "ride"} 
                    onChange={event => updateForm(event, props)} />
                </label>
            </div>
            <div className='teeDate'>
                <h4>Select a date:</h4>
                {props.isAdmin && (
                <>    
                    <label>
                        Year:
                        {props.teeTimeSearch.date.year}
                    </label>
                    <label>
                        Month:
                        {<select name='teeMonth' onChange={event => updateForm(event, props)}>
                            {availableMonths.map(teeMonth => <option key={teeMonth} value={teeMonth}>{`${monthStrings[teeMonth]}`}</option>)}
                        </select>}
                    </label>
                </>    
                )}
                <label>
                    Day:
                    <select name='teeDay' value={`${props.teeTimeSearch.date.day}`} onChange={event => updateForm(event, props)}>
                        {props.isSearching && <option value='false'> - </option>}
                        {availableDays.map(teeDay => <option key={teeDay} value={teeDay}>{`${teeDay}`}</option>)}
                    </select>
                </label>
                <>
                    <label>
                        Hour:
                        <select name='teeHour' value={`${props.teeTimeSearch.date.hours}`} onChange={event => updateForm(event, props)}>
                            {props.isSearching && <option value='false'> - </option>}
                            {availableHours.map(teeHour => <option key={teeHour} value={teeHour}>{`${teeHour % 12 || 12} ${teeHour < 12 ? 'AM' : 'PM'}`}</option>)}
                        </select>
                    </label>
                        <label>
                            Minute:
                            <select name='teeMinute' value={`${props.teeTimeSearch.date.minutes}`} onChange={event => updateForm(event, props)}>
                                {props.isSearching && <option value='false'> - </option>}
                                {availableMinutes.map(teeMinute => <option key={teeMinute} value={teeMinute}>{`${teeMinute.toString().length > 1 ? teeMinute : `0${teeMinute}`}`}</option>)}
                            </select>
                        </label>
                </>
                <h4>{!(props.selectedTeeTime._id || props.isSearching) && teeTimeDateString}</h4>
            </div>
            <div className='teeGolfers'>
                <label>
                    Select other members:
                    <select name="golfers" multiple 
                        onChange={event => {
                            // to pass event to update form it must persist
                            // persist will allow it to propogate
                            // event.persist()
                            updateForm(event, props)
                        }}
                        value={props.teeTimeSearch.golfers}
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
                    max={guestMax + 1} 
                    value={props.teeTimeSearch.guests || 0} 
                    onChange={event => updateForm(event, props)}/>
                </label>
            </div>
            <div className='teeFormButtons'>
                {!props.selectedTeeTime._id && <div className={`teeSearchButton`}>
                    <input type="button" value={`${props.isSearching ? 'Disable ' : 'Enable '}Tee Time Search`} onClick={props.searchTeeTimes}/>
                </div>}
                {!(props.selectedTeeTime._id || 
                    props.isSearching) && 
                    <input 
                    type="submit" 
                    value="Request Tee Time" 
                    onClick={event => updateForm(event, props)}
                    />
                }
            </div>
        </form>
    )
}

// gets all possible tee times from now until 2 days from now
const getPossibleTeeDates = (props) => {
    const {isAdmin} = props
    // this function filters all tee dates for those that match teetimesearch
    // create new array to hold available tee times
    let possibleTeeDates = []
    const currentDate = new Date()
    // this is where we could grant admin privileges to add tee times a year in advance
    const cutoffDate = isAdmin ? new Date().getDate() + 7 : new Date().getDate() + 2
    while (currentDate.getDate() <= cutoffDate) {
        possibleTeeDates.push(new Date(currentDate))
        currentDate.setMinutes(currentDate.getMinutes() + 10)
    } 
    // maps possible dates to course hours
    possibleTeeDates = possibleTeeDates.map(teeDate => {
        const {year, month, day, hours, minutes} = getTeeTimeDate(props.isAdmin, teeDate)
        return new Date(year, month, day, hours, minutes)
    })
    return possibleTeeDates
}

const getAvailableOptions = (availableTeeDates, date) => {
    let teeDates = availableTeeDates.map(teeDate => teeDate)
    // create arrays to store available options
    const availableMonths = []
    const availableDays = []
    const availableHours = []
    const availableMinutes = []
    // add available options to arrays if they do not already contain them)
    teeDates = teeDates.filter(teeDate => !date.year || teeDate.getFullYear() === date.year)
    teeDates.forEach(teeDate => {
        availableMonths.includes(teeDate.getMonth()) || availableMonths.push(teeDate.getMonth())
    })
    teeDates = teeDates.filter(teeDate => !date.month || teeDate.getMonth() === date.month)
    teeDates.forEach(teeDate => {
        availableDays.includes(teeDate.getDate()) || availableDays.push(teeDate.getDate())
    })
    teeDates = teeDates.filter(teeDate => !date.day || teeDate.getDate() === date.day)
    teeDates.forEach(teeDate => {
        availableHours.includes(teeDate.getHours()) || availableHours.push(teeDate.getHours())
    })
    teeDates = teeDates.filter(teeDate => !date.hours || teeDate.getHours() === date.hours)
    teeDates.forEach(teeDate => {
        availableMinutes.includes(teeDate.getMinutes()) || availableMinutes.push(teeDate.getMinutes())
    })
    
    availableMonths.sort((monthA, monthB) => monthA - monthB)
    availableDays.sort((dayA, dayB) => dayA - dayB)
    availableHours.sort((hourA, hourB) => hourA - hourB)
    availableMinutes.sort((minuteA, minuteB) => minuteA - minuteB)
    return {availableMonths, availableDays, availableHours, availableMinutes}
}
    
const updateForm = (event, props) => {
    // TeeType
    // if this checkbox was checked, apply the value, otherwise apply the old value, unless searching
    const teeType = (event.target.checked && event.target.value) || 
        (props.isSearching ? '' : props.teeTimeSearch.teeType)
    
    // Date
    const currentDate = new Date()
    const year = currentDate.getFullYear() //event.target.form.teeYear.value
    const month = props.isAdmin ? parseInt(event.target.form.teeMonth.value) : currentDate.getMonth()
    const day = parseInt(event.target.form.teeDay.value)
    currentDate.setDate(day)
    const dayOfTheWeek = currentDate.getDay()
    const hours = parseInt(event.target.form.teeHour.value)
    const minutes = parseInt(event.target.form.teeMinute.value)
    const date = {year, month, day, dayOfTheWeek, hours, minutes}
    // Golfers
    let golfers = []
    for (let selectedGolfer of event.target.form.golfers.selectedOptions) {
        golfers.push(selectedGolfer.value)
    }

    // let golfers = props.data.allUsers.filter(user => selectedGolferIDs.includes(user._id))       
    golfers = props.isAdmin || props.isSearching ? golfers : [...golfers, props.data.user._id]

    // Guests
    const memberCount = golfers.length
    // max guest allowed
    const guestMax = props.isAdmin ? 5 - memberCount : 4 - memberCount
    const guestCount = parseInt(event.target.form.guests.value)
    const guests = guestCount > guestMax ? guestMax : guestCount

    // New Tee Time
    const newTeeTime = { teeType, date, golfers, guests }

    // Update the teeTimeSearch control in store
    props.updateTeeTimeSearch(newTeeTime)

    // update the users tee time if one was selected
    // overwrite date field below to create genuine Date() object
    props.selectedTeeTime._id && 
    props.updateTeeTime({...props.selectedTeeTime, ...newTeeTime, date: new Date(year, month, day, hours, minutes)}
    )
}
