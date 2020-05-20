import React from "react";
import axios from "axios";
import {commonUrl} from "../common/config";
import {User} from "../model/user";
import {Button} from 'react-bootstrap'

interface History {
    history?: any;
}

export class Login extends React.Component<any & History> {
    constructor(props: any) {
        super(props);
    }

    state = {
        userName: '',
        password: ''
    }

    handleOnchange = (e: any) => {
        e.preventDefault()
        const {name, value} = e.target;
        this.setState({[name]: value})
    }

    handleLogin = (e: any) => {
        e.preventDefault()
        const {userName, password} = this.state
        const {history} = this.props
        if(userName == '' || password == '') {
            alert('Please complete all information')
        } else {
            const user: User = {userName: userName, password: password}
            const result = axios.post(commonUrl + '/user/login', user).then(value => {
                if (value.status === 200) {
                    localStorage.clear()
                    localStorage.setItem('token', value.data)
                    alert('Login Successful!!')
                    history.push('/booking')
                }
            }).catch(reason => {
                alert('Reason: '+ reason['response']['data'])
            })

        }

    }

    signUp = () => {
        const {history} = this.props
        history.push('/signUp')
    }

    render() {
        console.log(this.state);
        return (<>
            <form>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label"></label>
                    <label className="col-sm-2 col-form-label">UserName</label>
                    <div className="col-sm-3">
                        <input type="text" className="form-control" name="userName" onChange={this.handleOnchange}/>
                    </div>
                    <label className="col-sm-3 col-form-label"></label>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label"></label>
                    <label className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-3">
                        <input type="password" className="form-control" name="password" onChange={this.handleOnchange}/>
                    </div>
                    <label className="col-sm-3 col-form-label"></label>
                </div>
                <div className="form-group row">
                    <label className="col-sm-5 col-form-label"></label>
                    <div className="col-sm-4">
                        <button onClick={this.handleLogin} className="btn btn-primary">Login</button>
                    </div>
                    <label className="col-sm-3 col-form-label"></label>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label"></label>
                    <span>If you don't have account, click here </span> <button className="btn btn-secondary" onClick={this.signUp}> Sign Up</button>
                </div>

            </form>
            </>
        )
    }
}
