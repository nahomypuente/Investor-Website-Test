import React, { Component } from 'react';
import axios from 'axios';
import ItemCompany from './ItemCompany.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      companies: [],
      item_company: ''
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(sygla) {
    console.log(sygla);
    this.setState({
      item_company: sygla
    })
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
            <option key={i} onClick={() => this.handleClick(company.sygla)}>
              {company.name}
            </option>
          ))}
        </select>
        { this.state.item_company !== '' ?
          <ItemCompany sygla={this.state.item_company}/> : ''
        }
      </div>
    );
  }
}

export default App;
