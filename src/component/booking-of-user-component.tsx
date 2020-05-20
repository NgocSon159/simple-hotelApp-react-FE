import React from "react";
import axios from "axios";
import {commonUrl} from "../common/config";

export class BookingOfUserComponent extends React.Component<any, any>{
  constructor(props: any) {
    super(props);
  }

  state = {
    booking: []
  }

  initDate() {
    const token = localStorage.getItem("token")

    const result = axios.get(commonUrl + '/booking/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      this.setState({booking: res.data})
    }).catch(reason => {
      alert("Reason: " + reason['response']['data'])
    })
  }

  componentDidMount() {
    this.initDate()
  }

  render() {
    const {booking} = this.state
    console.log('booking', booking)
    const bookingList = booking && booking.length != 0 && booking.map((value, index) => {
      return <tr key={index}>
        <td>{value['hotelId']}</td>
        <td>{value['name']}</td>
        <td>{value['description']}</td>
        <td>{value['startBookingTime']}</td>
        <td>{value['endBookingTime']}</td>
        <td>{value['createBy']}</td>
        <td><img style={{maxWidth: '100px'}} src={value['avatar']}/></td>
        <td>
          <button className="btn btn-success">Approve</button>
        </td>
      </tr>
    })

    return (
      <>
        <p>Booking Dashboard here!!!</p>
        <table className="table">
          <thead>
          <tr>
            <th scope="col">Hotel</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">StartBookingTime</th>
            <th scope="col">EndBookingTime</th>
            <th scope="col">CreateBy</th>
          </tr>
          </thead>
          <tbody>
          {bookingList}
          </tbody>
        </table>
      </>
    )
  }
}
