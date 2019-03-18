import React, {Component} from 'react';
import axios from 'axios';

class ItemCompany extends Component {
  constructor(props) {
    super();
    this.state = {
      data_company: {},
      loss: 0,
      today: {date: '', hs: ''},
      loaded_data: false
    }
  }

  access_day() {
    const t_Date = new Date().toJSON().slice(0,10);
    const t_Hours = new Date().toLocaleTimeString();
    const today = this.state.today;
    today.date = t_Date;
    today.hs = t_Hours;
    this.setState({
      today: today
    })
  }

  subtract_daily_close(data) {
    const data_first_value = Object.values(data)[0];
    const data_first_key = Object.keys(data)[0];

    //si los datos de hoy fueron cargados
    if (this.state.today.date === data_first_key) {
      //realizar resta
      const close = "4. close";
      const data_yest = Object.values(data)[0];
      const data_today = data_first_value;
      const subtract = data_today[close] - data_yest[close];
      console.log(typeof subtract)
      //datos cargados y perdidas
      this.setState({
        loss: subtract,
        loaded_data: true
      })
    }
    else {
      console.log("Los datos no han sido cargados, se cargan a las 9:30")
      //
    }
  }

  componentDidMount() {
    axios
      .get('/api/company/' + this.props.sygla)
      .then(
        response => {
          //console.log(response.data.data);
          const key = "Time Series (Daily)";
          const daily = response.data.data[key];
          this.setState({
            data_company: daily
          });
          console.log(this.state.data_company);
          this.access_day();
          this.subtract_daily_close(this.state.data_company);
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      )
  }

  render() {
    return(
      <div>
      <h2>sygla de la empresa</h2>
      <h1>{this.props.sygla}</h1>
      </div>
    );
  }
}

export default ItemCompany;
