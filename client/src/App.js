import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      companies: [],
      item_company: ''
    }
  }

  componentDidMount() {
    axios
    .get('/api/companies')
    .then(
      response => {
        console.log(response.data)
        this.setState({
          companies: response.data
        })
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    )
  }

  render() {
    return (
      <div className="App">
        <h1>Investor Web</h1>
        <select>
          { this.state.companies.map((company, i) => (
            <option key={i} onClick={this.handleClick}>
              {company.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default App;
