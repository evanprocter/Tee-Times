import React, {Component} from 'react'

export default class TeeTimeForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            members: 0,
            currentDateString: '',
            cutOffDateString: ''
        }
    }
    componentDidMount() {
        const {props} = this
        const currentDate = new Date()
        currentDate.setMinutes(currentDate.getMinutes() - (currentDate.getMinutes() % 5))
        props.updateTeeTimeSearch({...props.teeTimeSearch, date: props.selectedTeeTime._id ? props.selectedTeeTime.date : currentDate})
    }

    _updateForm = (event) => {
        const {props} = this
        const teeType = event.target.form.walkride.value
        const date = event.target.form.teeDate.value
        const selectedGolferIDs = []
        for (let selectedGolfer of event.target.form.golfers.selectedOptions) {
            selectedGolferIDs.push(selectedGolfer.value)
        }
        const golfers = props.data.allUsers.filter(user => selectedGolferIDs.includes(user._id))
        const guests = event.target.form.guests.value
        const newTeeTime = { teeType,date, golfers, guests }
        props.updateTeeTimeSearch(newTeeTime) 
        }

    _getDateString = (date) => {
        const monthString = date.getMonth() + 1 > 9 ? `${date.getMonth() + 1}`: `0${date.getMonth() + 1}`
        const dayString =  date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`
        // =================================================
        // could cause future bugs(date.setHours(8))
        // =================================================
        const hourString = date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours() < 8 ? date.setHours(8) && date.getHours(): date.getHours()}`
        const minString = date.getMinutes() > 9 ? `${date.getMinutes()}` : `0${date.getMinutes()}`
        const dateString = `${date.getFullYear()}-${monthString}-${dayString}T${hourString}:${minString}`
        return dateString
    }
    
    
    render() {
        const {props} = this
        const currentDate = new Date()
        const currentDateString = this._getDateString(currentDate)
        const cutOffDayString =  currentDate.getDate() > 7 ? `${currentDate.getDate() + 2}` : `0${currentDate.getDate() + 2}`
        const monthString = currentDate.getMonth() + 1 > 9 ? `${currentDate.getMonth() + 1}`: `0${currentDate.getMonth() + 1}`
        const cutOffDateString = `${currentDate.getFullYear()}-${monthString}-${cutOffDayString}T16:00`
        const teeTimeDateString = this._getDateString(new Date(props.teeTimeSearch.date))
        console.log(currentDateString)
        console.log(cutOffDateString)
    
        // const selectedTeeTimeDate = props.selectedTeeTime._id ? new Date(props.selectedTeeTime.date) : new Date()
        // selectedTeeTimeDate.setMinutes(selectedTeeTimeDate.getMinutes() - (selectedTeeTimeDate.getMinutes() % 5))
        // const selectedTeeTimeMonthString = selectedTeeTimeDate.getMonth() + 1 > 9 ? `${selectedTeeTimeDate.getMonth() + 1}`: `0${selectedTeeTimeDate.getMonth() + 1}`
        // const selectedTeeTimeDayString =  selectedTeeTimeDate.getDate() > 9 ? `${selectedTeeTimeDate.getDate()}` : `0${selectedTeeTimeDate.getDate()}`
        // const selectedTeeTimeHourString = selectedTeeTimeDate.getHours() > 9 ? `${selectedTeeTimeDate.getHours()}` : `0${selectedTeeTimeDate.getHours()}`
        // const selectedTeeTimeMinString = selectedTeeTimeDate.getMinutes() > 9 ? `${selectedTeeTimeDate.getMinutes()}` : `0${selectedTeeTimeDate.getMinutes()}`
        // const selectedTeeTimeDateString = `${selectedTeeTimeDate.getFullYear()}-${selectedTeeTimeMonthString}-${selectedTeeTimeDayString}T${selectedTeeTimeHourString}:${selectedTeeTimeMinString}`
        return (
            <form className={`TeeTimeForm${props.selectedTeeTime._id ? ' selectedTeeTimeForm' : ''}`} 
                onSubmit={event => {
                   event.preventDefault()
                   // basic user's automatically added to teetime
                   const golfer = props.data.user.userType === 'admin' ? null : props.data.user 
                   props.selectedTeeTime._id || props.addTeeTime({...props.teeTimeSearch, golfers: [...props.teeTimeSearch.golfers, golfer]})
                }}
                onChange={event => {
                    props.selectedTeeTime._id && props.updateTeeTime(props.teeTimeSearch)
                }}
            >
                <input type="radio" name="walkride" value="walk" checked={props.teeTimeSearch.teeType === "walk"} onChange={this._updateForm} required/>Walk<br/>
                <input type="radio" name="walkride" value="ride" checked={props.teeTimeSearch.teeType === "ride"} onChange={this._updateForm}  required/>Ride<br/>
                <input type="datetime-local" name="teeDate"
                    value={teeTimeDateString}
                    max={props.data.user.userType === 'admin' ? '' : cutOffDateString} 
                    min={currentDateString}
                    step={300}
                    onChange={this._updateForm}
                 />
                <label>
                    Select other members:
                    <select name="golfers" multiple 
                        onChange={event => {
                            event.persist()
                            this.setState({members: event.target.selectedOptions.length}, () => this._updateForm(event))
                        }}
                        value={props.searchTeeTime && props.searchTeeTime.golfers.map(golfer => golfer._id)}>
                        {props.data.user.userType === 'admin' ? 
                        props.data.allUsers.map(user => <option key={user._id} value={user._id}>{`${user.name}`}</option>) : 
                        props.data.userFriends.map(user => <option key={user._id} value={user._id}>{`${user.name}`}</option>)}
                    </select>
                </label>
                <label>
                    Number of guest:
                    <input type="number" name="guests" min="0" max={`${3 - this.state.members}`} value={props.teeTimeSearch.guests || 0} onChange={this._updateForm}/>
                    <input type="submit" value="Request Tee Time"/>
                </label>
            </form>
        )
    }
    }