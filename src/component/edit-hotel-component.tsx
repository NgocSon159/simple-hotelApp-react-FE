import React from "react";
import axios from "axios";
import {commonUrl} from "../common/config";

export class EditHotelComponent extends React.Component<any, any>{
    constructor(props: any) {
        super(props);

    }

    state = {
        Id: '',
        name: '',
        description: '',
        phoneNumber: '',
        avatar: '',
        photos: []
    }

    componentDidMount() {
        const result = axios.get(commonUrl + '/hotel/').then((res) => {
            this.setState({hotel: res.data})
        })
    }

    render() {
        return undefined
    }

}
