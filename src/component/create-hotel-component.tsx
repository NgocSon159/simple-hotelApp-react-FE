import React from "react";
import {Hotel} from "../model/hotel";
import axios, {AxiosRequestConfig} from "axios";
import {commonUrl} from "../common/config";

export class CreateHotelComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  state = {
    name: '',
    description: '',
    phoneNumber: '',
    avatar: '',
    photos: [],
    avatarInfo: {
      name: '',
      base64: ''
    },
    photosInfo: [],
    photoNames: ''
  }

  handleOnchange = (e: any) => {
    e.preventDefault()
    console.log("handleOnchange")
    const {name, value} = e.target;
    this.setState({[name]: value})
  }

  handleUploadChange = (selectorFiles: FileList) => {
    console.log(selectorFiles);
    if (selectorFiles.length === 1) {
      const avatar = selectorFiles.item(0)
      this.getBase64(selectorFiles.item(0), (result: any) => {
        const base64Image = result.split(',')
        if (avatar) {
          this.setState({
            avatarInfo: {
              name: avatar.name,
              base64: base64Image[1]
            }
          })
        }
        console.log(base64Image[1])
      })
    } else if (selectorFiles.length > 1) {
      let photoNames = ''
      let photosInfo: { name: string; base64: any; }[] = []
      for (let i = 0; i < selectorFiles.length; i++) {
        const photo = selectorFiles.item(i)
        if (photo) {
          photoNames = photo.name + photoNames
          this.getBase64(photo, (result: any) => {
            const base64Image = result.split(',')
            const obj = {
              name: photo.name,
              base64: base64Image[1]
            }
            photosInfo.push(obj)
            this.setState({photoNames: photoNames, photosInfo: photosInfo})
          })
        }
      } //end loop
    }
  }

  getBase64(file: any, cb: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  getLinkImageApi = (base64Image: string): any => {
    const form = new FormData()
    form.set('image', base64Image)
    return axios.post(`https://api.imgbb.com/1/upload?key=b3dd26524ee508b126225794c78fdf06`, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  handleCreate = async (e: any) => {
    e.preventDefault()
    const {name, description, phoneNumber, avatarInfo, photosInfo} = this.state
    const hotel: Hotel = {
      name: name,
      description: description,
      phoneNumber: phoneNumber,
    }

    this.getLinkImageApi(avatarInfo.base64).then(async (value: any) => {
      console.log(value.data['data']['url'])
      hotel.avatar = value.data['data']['url']
      //end getApi for avatar

      debugger
      const arrPromise = []
      for (let i = 0; i < photosInfo.length; i++) {
        // @ts-ignore
        arrPromise.push(this.getLinkImageApi(photosInfo[i]['base64']))
      }

      Promise.all(arrPromise).then(async (value: any) => {
        const photosLink: any[] = []
        console.log(value)
        value.map((result: any) => {
          photosLink.push(result.data['data']['url'])
        })
        hotel.photos = photosLink
        const token = localStorage.getItem("token")
        const result = await axios.post(commonUrl + '/hotel', hotel, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (result.status === 200) {
          alert('Create Hotel Successful!')
          const {history} = this.props
          history.push('/dashboard')
        } else {
          alert('Error: ' + result.data)
        }
      }).catch((reason: any) => {
        console.log(reason)
      })
    })
  }

  render() {
    const {avatarInfo, photoNames, photosInfo} = this.state
    console.log('photosInfo', photosInfo)
    return (
      <>
        <form>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label"></label>
            <label className="col-sm-2 col-form-label">Name</label>
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
            <label className="col-sm-2 col-form-label">PhoneNumber</label>
            <div className="col-sm-3">
              <input type="text" className="form-control" name="phoneNumber" onChange={this.handleOnchange}/>
            </div>
            <label className="col-sm-3 col-form-label"></label>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label"></label>
            <label className="col-sm-2 col-form-label">Avatar</label>
            <div className="custom-file col-sm-3">
              <input type="file" className="custom-file-input"
                     onChange={(e: any) => this.handleUploadChange(e.target.files)}/>
              <label className="custom-file-label">{
                (!avatarInfo.name) ? 'Choose file' : avatarInfo.name
              }</label>

            </div>
            <label className="col-sm-3 col-form-label"></label>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label"></label>
            <label className="col-sm-2 col-form-label">Photos</label>
            <div className="custom-file col-sm-3">
              <input type="file" className="custom-file-input"
                     onChange={(e: any) => this.handleUploadChange(e.target.files)} multiple={true}/>
              <label className="custom-file-label">{
                (!photoNames) ? 'Choose file' : photoNames
              }</label>
            </div>
            <label className="col-sm-3 col-form-label"></label>
          </div>
          <div className="form-group row">
            <label className="col-sm-5 col-form-label"></label>
            <div className="col-sm-4">
              <button onClick={this.handleCreate} className="btn btn-primary">Create</button>
            </div>
            <label className="col-sm-3 col-form-label"></label>
          </div>

        </form>

      </>
    )
  }
}
