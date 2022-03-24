import React, { Component } from "react";

import { Link } from "react-router-dom";
import userService from "../services/userService";

class Instrument extends Component {
  state = {
    data: {
      instrument: {},
      user: {},
    },
    isCart: false,
  };

  async componentDidMount() {
    const { data } = await userService.getCurrentUserDetails();
    const { instrument }  = this.props;
    let isCart = data.cart.find(itemId => itemId === instrument._id);

    this.setState({ data: { instrument, user: data }, isCart });
  }
  

  render() {
    const {
      state: {
        data: { instrument },
      },
    } = this;
    const {
      state: {
        data: { user },
      },
    } = this;
    const { state: {isCart} } = this;

    return (
      <div className="col-md-6 col-lg-4 mt-3 mb-4">
        <div className="card bg-dark card border-white">
          <img
            src={instrument.instrumentImage}
            height="150"
            width="200"
            alt={instrument.instrumentImage}
            className="rounded mx-auto d-block mt-2 border border-black"
          />
          <div className="card-body bg-dark">
            <h5 className="change colors font-weight-bold font-italic">{instrument.instrumentName}</h5>
            <p className="card-text">{instrument.instrumentDescription}</p>
            <p className="card-text border-top pt-2">
              <b>Brand: </b>
              {instrument.instrumentBrand}
              <br />
              <b>Price: </b>
              {instrument.instrumentPrice} &#128178;
            </p>

            {!!user && user?.owner && (
              <React.Fragment>
                <Link
                  className="btn btn-sm btn-secondary"
                  to={`/edit/${instrument._id}`}
                >
                  Edit  <i className="fas fa-edit"></i>
                </Link>
                <Link
                  className="ml-2 btn btn-sm btn-danger"
                  to={`/delete/${instrument._id}`}
                >
                  Delete  <i className="fas fa-trash-alt"></i>
                </Link>
              </React.Fragment>
            )}
            {user && !user?.owner && !isCart && (
              <button
                className="btn btn-dark border border-info text-secondary"
                onClick={async () => {
                  this.setState({isCart: true});
                  await userService.addToCart(instrument._id);
                }}>
                <i className="fas fa-shopping-cart text-warning"></i> Add To Cart
              </button>
            )}
            {user && !user?.owner && isCart && (
              <button
                className="btn btn-dark border border-info"
                onClick={async () => {
                  this.setState({isCart: false });
                  await userService.removeFromCart(instrument._id);

                  if(window.location.pathname.includes('/cart'))
                  window.location.reload();
                }}>
                  <i className="fas fa-shopping-cart text-danger"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Instrument;