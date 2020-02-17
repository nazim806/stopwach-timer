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
         
         //Get remaining seconds

         let seconds = current_sec -start_sec;


         let days = Math.floor(seconds/(24*60*60));
         seconds -= days*24*60*60;

         let hours = Math.floor(seconds/(60*60));
         seconds -= hours*60*60;

         let minutes = Math.floor(seconds/60);
         seconds -= minutes*60;

         days = Math.abs(days);
         hours = Math.abs(hours);
         minutes = Math.abs(minutes);
         seconds = Math.floor(Math.abs(seconds));

         this.setState(
           () => ({
             days,
             hours,
             minutes,
             seconds
           }),
           ()=> {
             this.timer = setTimeout(this.calculateCountdown, 1000);
           }
         );
        
       }else{
         this.setState({errorMessage: "Times Up!"});
         clearTimeout(this.timer);
       }
      };

      render(){
        const { days, hours, minutes, seconds, errorMessage} = this.state;
        const convertedDays = this.getTwoDigitValue(days);
        const convertedHours = this.getTwoDigitValue(hours);
        const convertedMinutes = this.getTwoDigitValue(minutes);
        const convertedSeconds = this.getTwoDigitValue(seconds);

        return(
          <div>
            <div className = "date-time-form">
              {<h1>Countdown Timer App</h1>}
              {errorMessage && <p className = "error-message">{errorMessage}</p>}
              
              <Form>
                 <Form.Group controlID = "end-date" >
                   <Form.Label>End Date</Form.Label>
                   <DateTimePicker
                      format = "MM/dd/y h:mm:ss a"
                      onChange = {this.onEndDateChange}
                      value = {this.state.endDate}  
                   />
                    
                 </Form.Group>

                 <Button
                  variant = "primary"
                  type = "button"
                  onClick = {this.calculateCountdown}
                  > Start Countdown

                 </Button>

              </Form>

            </div>

            <div className = "counter">

              <div className = "time">
                <div className = "time-value"> {convertedDays}</div>
                <div className = "time-label">Days</div>
              </div>
              <div className = "time">
                <div className = "time-value"> {convertedHours}</div>
                <div className = "time-label">Hours</div>
              </div>
              <div className = "time">
                <div className = "time-value"> {convertedMinutes}</div>
                <div className = "time-label">Minutes</div>
              </div>
              <div className = "time">
                <div className = "time-value"> {convertedSeconds}</div>
                <div className = "time-label">Seconds</div>
              </div>

            </div>
          </div>

    );
  }

};






