import React, {Component} from 'react';
import axios from 'axios';
import Spinner from 'react-spinner-material';
import DailyTodayData from './DailyTodayData';
import '../App.css';

class ItemCompany extends Component {
  constructor(props) {
    super();
    this.state = {

      loading: false,
      data_company: {},
      price: { difference: 0, percent: 0, number:0},
      today: {date: '', hs: '', data:{}},
      loaded_data: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  percent( close_today, number_subs ) {
    const num_percent = number_subs * 100 / close_today;
    const price = this.state.price;
    price.percent = num_percent;
    this.setState({
      price: price
    });
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

    if (this.state.today.date === data_first_key) {
      //realizar resta
      const close = "4. close";
      const data_yest = Object.values(data)[1];
      const data_today = data_first_value;
      const close_today = parseFloat(data_today[close]);
      const close_yest = parseFloat(data_yest[close]);
      const subtract =  close_today - close_yest;
      this.percent(close_today, subtract);
      const today = this.state.today;
      const price = this.state.price;
      today.data = data_today;
      price.difference = subtract;
      price.number = close_today;
      this.setState({
        today: today,
        price: price,
        loaded_data: true
      })
    }
    else {
      console.log("Date is no Update")
    }
  }

  handleSubmit() {
    this.setState( {loading: true}, () => {
      const sygla = this.props.match.params.sygla
      axios
        .get('/api/company/' + sygla)
        .then(
          response => {
            const key = "Time Series (Daily)";
            const daily = response.data.data[key];
            this.access_day();
            this.subtract_daily_close(daily);
            this.setState({
              data_company: daily
            });
          }
        )
        .catch(
          error => {
            console.log(error);
          }
        )
        .finally(()=> {
          this.setState({loading:false});
        });
    })
  }

  render() {
      return(
        <div>
          <section className="hero">
            <div className="hero-inner">
              <h1>{this.props.match.params.sygla}</h1>
              {this.state.loaded_data ? <DailyTodayData price={this.state.price}/> :
                (<div>
                  <h2>Choice day</h2>
                  { this.state.loading ?
                    <Spinner size={40} spinnerColor={"#fff"} spinnerWidth={3} visible={true} />
                    : (
                    <form onSubmit={this.handleSubmit}>
                      <button class="button button4">Today</button>
                    </form>
                  )}
                </div>)
              }
              <br></br>
              <button class="button button5" onClick={() => this.props.history.push('/')}>
                Back
              </button>
            </div>
          </section>
        </div>
      );
    }
  }

export default ItemCompany;
