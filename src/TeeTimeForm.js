import React from 'react'
import {getCorrectDate} from './store'

export default function TeeTimeForm(props) {
    // this determines the number of golfers allowed
    const memberCount = (props.teeTimeSearch.golfers && props.teeTimeSearch.golfers.length) || 0
    const guestMax = props.data.user.userType === 'admin' ? 4 - memberCount : 3 - memberCount
    
    const monthStrings = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const {date} = props.teeTimeSearch
    // for (let dateField in date) {date[dateField] = date[dateField].toString()}
    const teeTimeDateString = (props.selectedTeeTime._id || !props.isSearching) && 
    // convert string out of military time
    `${date.month + 1}-${date.day}-${date.year}, ${date.hours % 12 || 12}:${date.minutes.length > 1 ? date.minutes : `0${date.minutes}`} ${date.hours < 12 ? 'AM' : 'PM'}`
    
    // find the taken dates
    const unavailableTeeDates = props.data.allTeeTimes.map(teeTime => new Date(teeTime.date))
    // find remaining dates, these are strings and can be compared directly
    const availableTeeDates = props.isSearching ? 
                            unavailableTeeDates : 
                            findAvailableTeeDates(props).filter(teeDate => !unavailableTeeDates.includes(teeDate))
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
            <input type="checkbox" name="walkride" value="walk" 
                checked={props.teeTimeSearch.teeType === "walk"} 
                onChange={event => updateForm(event, props)} />Walk<br/>
            <input type="checkbox" name="walkride" value="ride" 
                checked={props.teeTimeSearch.teeType === "ride"} 
                onChange={event => updateForm(event, props)} />Ride<br/>
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
                                {props.isSearching && <option value='-1'> - </option>}
                                {availableMinutes.map(teeMinute => <option key={teeMinute} value={teeMinute}>{`${teeMinute.toString().length > 1 ? teeMinute : `0${teeMinute}`}`}</option>)}
                            </select>
                        </label>
                    )}
                </>
            )}
            <h6>{!(props.selectedTeeTime._id || props.isSearching) && teeTimeDateString}</h6>
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
                {!(props.selectedTeeTime._id || 
                    props.isSearching) && 
                    <input 
                        type="submit" 
                        value="Request Tee Time" 
                        onClick={event => updateForm(event, props)}
                    />
                }
            </label>
        </form>
    )
}

function findAvailableTeeDates(props) {
    const {teeTimeSearch, isAdmin} = props
    // this function filters all tee dates for those that match teetimesearch
    const availableTeeDates = []
    const {year, month, day, hours, minutes} = getCorrectDate(isAdmin).date
    const currentDate = new Date(year, month, day, hours, minutes)
    const {date} = teeTimeSearch
    // this is where we could grant admin privileges to add tee times a year in advance
    const cutoffDate = isAdmin ? new Date().getDate() + 30 : new Date().getDate() + 3
    while (currentDate.day < cutoffDate) {
        availableTeeDates.push(currentDate)
        currentDate.setMinutes(currentDate.getMinutes() + 10)
    } 
    return availableTeeDates.filter(teeDate => {
                                        for (let dateField in date) {
                                            switch (dateField) {
                                                case 'year':
                                                if (teeDate.getFullYear() !== date[dateField]) {return false}
                                                break
                                                case 'month':
                                                if (teeDate.getMonth() !== date[dateField]) {return false }
                                                break
                                                case 'day':
                                                if (teeDate.getDate() !== date[dateField]) {return false}
                                                break
                                                case 'hours':
                                                if (teeDate.getHours() !== date[dateField]) {return false}
                                                break
                                                case 'minutes':
                                                if (teeDate.getMinutes() !== date[dateField]) {return false}
                                                break
                                                default:
                                                return true
                                            }
                                        }
                                        return true
                                    })
}

const updateForm = (event, props) => {
    // const {props} = this
    const currentDate = new Date()
    // if this checkbox was checked, apply the value, otherwise apply the old value, unless searching
    const teeType = (event.target.checked && event.target.value) || (props.isSearching ? '' : props.teeTimeSearch.teeType)
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
    const guestMax = props.isAdmin ? 4 - memberCount : 3 - memberCount
    const guestCount = parseInt(event.target.form.guests.value)
    const guests = guestCount > guestMax ? guestMax : guestCount
    const newTeeTime = { teeType, date, golfers, guests }
    props.updateTeeTimeSearch(newTeeTime)
    // overwrite date field below to create genuine Date() object
    props.selectedTeeTime._id && 
    props.updateTeeTime({...props.selectedTeeTime, ...newTeeTime, date: new Date(year, month, day, hours, minutes)}
    )
}
