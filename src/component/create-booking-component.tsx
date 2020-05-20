import axios from "axios";
import {commonUrl} from "../common/config";
import React from "react";

interface Id {
  id?: any
}

interface History {
  history?: any;
}

export class CreateBookingComponent extends React.Component<Id&History>{
  constructor(props: any) {
    super(props);
  }

  state = {
    hotelId: '',
    hotelName: '',
    name: '',
    description: '',
    startBookingTime: new Date(),
    endBookingTime: new Date(),
  }

  componentDidMount() {
    const props = this.props
    // @ts-ignore
    const id = this.props.match.params.id
    console.log(id)
    const token = localStorage.getItem("token")
    const result = axios.get(commonUrl + '/hotel/' + id, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(value => {
      this.setState({hotelId: id, hotelName: value.data['name']})
    }).catch(reason => {
      alert('Reason: ' + reason['response']['data'])
    })
  }

  handleOnchange = (e: any) => {
    e.preventDefault()
    console.log("handleOnchange")
    const {name, value} = e.target;
    this.setState({[name]: value})
  }

  handleBook = (e: any) => {
    e.preventDefault()
    const {hotelId, name, description, startBookingTime, endBookingTime} = this.state
    debugger
    const booking = {
      hotelId: hotelId,
      name: name,
      description: description,
      startBookingTime: startBookingTime + ':00Z',
      endBookingTime: endBookingTime+ ':00Z'
    }
    console.log(booking)

    const token = localStorage.getItem("token")
    const result = axios.post(commonUrl + '/booking', booking, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(value => {
      alert('Booking Hotel Successful!!')
      const {history} = this.props
      history.push('/booking')
    }).catch(reason => {
      alert('Reason: ' + reason['response']['data'])
    })


  }

  render() {
    const {hotelName} = this.state
    return (
      <>
        <form>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label"></label>
            <label className="col-sm-2 col-form-label">Hotel Name</label>
            <div className="col-sm-3">
              <input type="text" className="form-control" name="hotelName" value={hotelName} onChange={this.handleOnchange}/>
            </div>
            <label className="col-sm-3 col-form-label"></label>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label"></label>
            <label className="col-sm-2 col-form-label">Subject</label>
            <div className="col-sm-3">
              <input type="text" className="form-control" name="name" onChange={this.handleOnchange}/>
            </div>
            <label className="col-sm-3 col-form-label"></label>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label"></label>
            <label className="col-sm-2 col-form-label">Description</label>
            <div className="col-sm-3">
              <input type="text" className="form-control" name="description" onChange={this.handleOnchange}/>
            </div>
            <label className="col-sm-3 col-form-label"></label>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label"></label>
            <label className="col-sm-2 col-form-label">Start Booking Time</label>
            <div className="col-sm-3">
              <input type="datetime-local" className="form-control" name="startBookingTime" onChange={this.handleOnchange}/>
            </div>
            <label className="col-sm-3 col-form-label"></label>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label"></label>
            <label className="col-sm-2 col-form-label">End Booking Time</label>
            <div className="col-sm-3">
              <input type="datetime-local" className="form-control" name="endBookingTime" onChange={this.handleOnchange}/>
            </div>
            <label className="col-sm-3 col-form-label"></label>
          </div>

          <div className="form-group row">
            <label className="col-sm-5 col-form-label"></label>
            <div className="col-sm-4">
              <button onClick={this.handleBook} className="btn btn-primary">Book</button>
            </div>
            <label className="col-sm-3 col-form-label"></label>
          </div>

        </form>

      </>
    )
  }
}
