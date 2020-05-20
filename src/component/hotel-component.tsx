import React from "react";
import axios, {AxiosRequestConfig} from "axios";
import {commonUrl} from "../common/config";

interface History {
  history?: any;
}


export class HotelComponent extends React.Component<any & History> {
  constructor(props: any) {
    super(props);
  }

  state = {
    hotel: []
  }

  initData() {
    const token = localStorage.getItem("token")

    const result = axios.get(commonUrl + '/hotel', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      this.setState({hotel: res.data})
    }).catch(reason => {
      debugger
      alert("Reason: " + reason['response']['data'])
    })
  }

  componentDidMount() {
    this.initData()
  }

  handleDelete = (e: any, id: any) => {
    e.preventDefault()
    const token = localStorage.getItem("token")

    const result = axios.delete(commonUrl + '/hotel/' + id, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(value => {
      if (value.status === 200) {
        alert('Delete Successful!')
        this.initData()
      }
    }).catch(reason => {
      alert('Reason: ' + reason['response']['data'])
    })
  }

  handleCreate = (e: any) => {
    const {history} = this.props
    history.push('/createHotel')
  }

  handleBookingOfUser = (e: any) => {
    const {history} = this.props
    history.push('/booking/user')
  }

  photoOfHotel(photos: []): any {
    if(photos) {
      return photos.map((value, index) => {
        return <img style={{maxWidth: '100px', paddingLeft: '3px'}} src={value}/>
      })
    }
  }
  render() {
    const {hotel} = this.state
    console.log('hotel', hotel)
    const hotelList = hotel && hotel.length != 0 && hotel.map((value, index) => {
      return <tr key={index}>
        <td>{value['name']}</td>
        <td>{value['description']}</td>
        <td>{value['phoneNumber']}</td>
        <td><img style={{maxWidth: '100px'}} src={value['avatar']}/></td>
        <td>{this.photoOfHotel(value['photos'])}</td>
        <td>
          <button className="btn btn-success">Edit</button>
          <button className="btn btn-danger" onClick={(e) => this.handleDelete(e, value['_id'])}>Delete</button>
        </td>
      </tr>
    })

    return (
      <>
        <p>Hotel Dashboard here!!!</p>
        <button className="btn btn-link" onClick={this.handleBookingOfUser}>Go to Booking Dashboard</button><br/>
        <button className="btn btn-primary" onClick={this.handleCreate}>Create</button>
        <table className="table">
          <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">PhoneNumber</th>
            <th scope="col">Avatar</th>
            <th scope="col">Photos</th>
            <th scope="col">Action</th>
          </tr>
          </thead>
          <tbody>
          {hotelList}
          </tbody>
        </table>
      </>
    )
  }
}
