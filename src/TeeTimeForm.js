import React, {Component} from 'react'

export default class TeeTimeForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            members: props.selectedTeeTime._id ? props.selectedTeeTime.golfers.length : 0,
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
        const date = new Date(event.target.form.teeDate.value)
        const selectedGolferIDs = []
        for (let selectedGolfer of event.target.form.golfers.selectedOptions) {
            selectedGolferIDs.push(selectedGolfer.value)
        }
        let golfers = props.data.allUsers.filter(user => selectedGolferIDs.includes(user._id))       
        golfers = props.data.user.userType === 'admin' ? golfers : [...golfers, props.data.user]
        const guests = parseInt(event.target.form.guests.value)
        const newTeeTime = { teeType,date, golfers, guests }
        props.updateTeeTimeSearch(newTeeTime) 
        props.selectedTeeTime._id && props.updateTeeTime({...props.selectedTeeTime, ...newTeeTime})
    } 

    _getDateString = (date) => {
        const monthString = date.getMonth() + 1 > 9 ? `${date.getMonth() + 1}`: `0${date.getMonth() + 1}`
        const dayString =  date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`
        const hourString = date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours() < 8 ? date.setHours(8) && date.getHours(): date.getHours()}`
        const minString = date.getMinutes() > 9 ? `${date.getMinutes()}` : `0${date.getMinutes()}`
        const dateString = `${date.getFullYear()}-${monthString}-${dayString}T${hourString}:${minString}`
        return dateString
    }
    
    render() {
        const {props} = this
        const currentDate = new Date()
        currentDate.setMinutes(currentDate.getMinutes() - (currentDate.getMinutes() % 5))
        const currentDateString = this._getDateString(currentDate)
        const cutOffDayString =  currentDate.getDate() > 7 ? `${currentDate.getDate() + 2}` : `0${currentDate.getDate() + 2}`
        const monthString = currentDate.getMonth() + 1 > 9 ? `${currentDate.getMonth() + 1}`: `0${currentDate.getMonth() + 1}`
        const cutOffDateString = `${currentDate.getFullYear()}-${monthString}-${cutOffDayString}T16:00`
        const teeTimeDateString = this._getDateString(new Date(props.teeTimeSearch.date))
        return (
            <form className={`TeeTimeForm${props.selectedTeeTime._id ? ' selectedTeeTimeForm' : ''}`} 
                onSubmit={event => {
                   event.preventDefault()
                   // basic user's automatically added to teetime
                   const golfer = props.data.user.userType === 'admin' ? null : props.data.user 
                   props.selectedTeeTime._id || props.addTeeTime({...props.teeTimeSearch, golfers: [...props.teeTimeSearch.golfers, golfer]})
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
                            const selectedGolferIDs = []
                            for (let selectedGolfer of event.target.form.golfers.selectedOptions) {
                                selectedGolferIDs.push(selectedGolfer.value)
                            }
                            console.log(this)
                            console.log(selectedGolferIDs.length)
                            this.setState({members: selectedGolferIDs.length}, 
                                () => {

                                    console.log(this)
                                })
                            this._updateForm(event)
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
                    <input type="number" name="guests" min="0" max={`${props.data.user.userType === 'admin' ? 4 - this.state.members : 3 - this.state.members}`} value={props.teeTimeSearch.guests || 0} onChange={this._updateForm}/>
                    {!props.selectedTeeTime._id && <input type="submit" value="Request Tee Time"/>}
                </label>
            </form>
        )
    }
}