import React, {Component} from 'react';

class ItemCompany extends Component {
  constructor(props) {
    super();
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
