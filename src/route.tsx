import {Route, Switch, Redirect} from 'react-router-dom';
import * as React from "react";
import {Login} from '../src/component/login'
import {HotelComponent} from './component/hotel-component'
import {SignUp} from '../src/component/signup'
import {CreateHotelComponent} from './component/create-hotel-component'
import {BookingComponent} from './component/booking-component'
import {CreateBookingComponent} from './component/create-booking-component'
import {BookingOfUserComponent} from './component/booking-of-user-component'


export const HotelRoutes: React.FunctionComponent = (props: any) => (
  <Switch>
    <Route exact path='/login' component={Login}></Route>
    <Route exact path='/hotel' component={HotelComponent}></Route>
    <Route exact path='/signUp' component={SignUp}></Route>
    <Route exact path='/createHotel' component={CreateHotelComponent}></Route>
    <Route exact path='/booking' component={BookingComponent}></Route>
    <Route exact path='/booking/user' component={BookingOfUserComponent}></Route>
      <Route exact path='/booking/:id' component={CreateBookingComponent}></Route>
    <Redirect from='/' to='login'></Redirect>
  </Switch>
)
