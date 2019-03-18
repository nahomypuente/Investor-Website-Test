import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-spinner-material';
import '../App.css';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: true,
      redirect: false,
      companies: [],
      sygla: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
    .get('/api/companies')
    .then(
      response => {
        console.log(response.data)
        this.setState({
          companies: response.data,
          loading: false
        })
      }
    )
    .catch(
      error => {
        console.log(error);
        this.setState({loading: false})
      }
    )
  }

  handleClick(sygla) {
    this.setState({
      sygla: sygla,
      redirect: true
    })
  }


  handleSubmit() {
    this.setState({loading: true}, () => {
      this.setState({
        redirect: true,
        loading: false });
    })
  }

  render() {
      return (
          <div className="App">
            <section className="hero">
              <div className="hero-inner">
                <h1>Stock exchanges in USA</h1>
                <h2>Consult share prices of companies</h2>
                { this.state.loading ?
                  (<Spinner size={40} spinnerColor={"#fff"} spinnerWidth={3} visible={true} />) :
                  (
                    <div className="aoyue-select animated zoomIn">
                      <form onSubmit={this.handleSubmit}>
                        <span className="placeholder">Choice Company</span>
                        { this.state.companies.map((company, i) => (
                          <label className="option" key={i} onClick={() => this.handleClick(company.sygla)} >
                            <input type="radio" name="option" />
                            <span className="title animated fadeIn"><i className="icon icon-speedometer"></i>{company.name}</span>
                          </label>
                        ))}
                      </form>
                    </div>
                  )
                }
              </div>
            </section>
            { this.state.redirect ? (<Redirect to={"/company/" + this.state.sygla}/>) : ''}
          </div>
      );
    }
  }
export default App;
