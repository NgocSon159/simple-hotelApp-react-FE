import React from "react";
import axios from 'axios'
import {commonUrl} from '../common/config'
import {User} from "../model/user";

interface History {
    history?: any;
}

export class SignUp extends React.Component<any&History> {
    constructor(props: any) {
        super(props);
    }

    state = {
        userName: '',
        password: '',
        confirmPassword: ''
    }

    handleOnChange = (e: any) => {
        e.preventDefault()
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    signUp = async (e: any) => {
        e.preventDefault()
        const user: User = {}
        const {userName, password, confirmPassword} = this.state
        const {history} = this.props
        if(password !== confirmPassword) {
            alert('Password & Confirm Password not correct!')
        } else if(userName == '' || password == '' || confirmPassword == '') {
            alert('Please complete all information')
        } else {
            user.userName = userName
            user.password = password
            const result = await axios.post(commonUrl + '/user/signUp', user)
            if (result.status === 200) {
                alert('Sign Up Successful!!')
                history.push('/login')
            } else {
                alert(result.data)
            }
        }
    }

    render() {
        return (
            <>
                <form style={{marginLeft: '200px'}}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">UserName</label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control" name="userName" onChange={this.handleOnChange}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-4">
                            <input type="password" className="form-control" name="password" onChange={this.handleOnChange}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Confirm Password</label>
                        <div className="col-sm-4">
                            <input type="password" className="form-control" name="confirmPassword" onChange={this.handleOnChange}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-4">
                            <button onClick={this.signUp} className="btn btn-primary">Sign Up</button>
                        </div>
                    </div>
                </form>
            </>
        )
    }
}
