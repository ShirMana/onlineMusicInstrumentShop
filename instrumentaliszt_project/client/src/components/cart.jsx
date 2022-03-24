import { Component } from "react";
import userService from "../services/userService";
import PageHeader from "./common/pageHeader";
import Instrument from "./instrument";
import Payment from "./payment";
import ReactDOM from 'react-dom';


class Cart extends Component {
  state = {
    instruments: [],
  };

  async componentDidMount() {
    const { data } = await userService.getMyCart();
    if (data.length) {
      this.setState({ instruments: data });
    }
  }
  sum;
  goToPayment = (sum) => {
    // eslint-disable-next-line no-undef
    console.log(sum);
    ReactDOM.render(<Payment sum = {sum} />, document.getElementById('root'));
  }

  render() {
    const {
      state: { instruments },
    } = this;

    return (
      <div className="container">
       < PageHeader titleText="My Cart" />
       

        <div className="row">
          <div className="col-12">
            <p><i className="fas fa-music"></i><i className="fas fa-music"> </i>  The items in your cart ( <span><i className="fas fa-shopping-cart"></i></span> ) are presented here:</p>
          </div>
        </div>
        <div className="row">
          {this.sum = 0}
          {instruments.length > 0 &&
            instruments.map((instrument) => {
              this.sum += instrument.instrumentPrice;
              return (
                <Instrument key={instrument._id} instrument={instrument} />
              );
            })}
        </div>
       
        <div className="d-flex justify-content-center">
            <p className="weight-bold">your total price is: {this.sum} &#36;</p>
        </div>
        <div className="d-flex justify-content-center mb-4">
          {/* <a className="btn btn-warning" href="/payment">
            Continue to Payment {this.sum}
          </a> */}
          <button className="btn btn-warning" onClick={() => this.goToPayment(this.sum)}> Continue to Payment {this.sum} &#36;</button>
        </div>
        </div>
        
    );
  }
}

export default Cart;
