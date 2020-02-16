import React from 'react';
import{Form, Button} from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";

export default class Timer extends React.Component{
     state = {
       endDate:new Date(),
       days:0,
       hours:0,
       minutes:0,
       seconds:0,
       errorMessage:""

     };

     componentWillMount(){
       clearTimeout(this.timer);
     }

     onEndDateChange = endDate =>{
       this.setState({endDate});
     };

     getTwoDigitValue = value => {
       if (value <10){
         return "0" + value;
       }
       return "" + value;
     };
  
     calculateCountdown = () => {
       const startDate = new Date();
       const {endDate} = this.state;

       this.setState ({errorMessage: ""});

       const timeRemaining = endDate.getTime() - startDate.getTime();

       if (timeRemaining >0){
         const start_date = new Date (startDate);
         const end_date = new Date (endDate);
         // Getting start date timestamp
         const start_ms = start_date.getTime(); 
         //Getting end date timestamp
         const end_ms = end_date.getTime();

         // convert ms to seconds

         const start_sec = start_ms/1000;
         const current_sec = end_ms/1000;
         
       }

     };