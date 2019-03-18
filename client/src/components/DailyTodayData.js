import React, {Component} from 'react';

class DailyTodayData extends Component {
  render(){
    return(
      <div>
        <div className="date">
          { this.props.price.difference > 0 ?
            (<div className="priceP">
                <h3>Close Price: {this.props.price.number}</h3>
                <h4>Increase: {this.props.price.difference}</h4>
                <h4>Percent: {this.props.price.percent + ' %'}</h4>
              </div>
            ) :
            (<div className="priceN">
                <h3>Close Price: {this.props.price.number}</h3>
                <h4>Decrement: {this.props.price.difference}</h4>
                <h4>Percent: {this.props.price.percent + ' %'}</h4>
              </div>
            )
          }
      </div>
      </div>
    );
  }
}

export default DailyTodayData;
