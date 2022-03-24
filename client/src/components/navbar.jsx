import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../images/logo.jpg";

class Navbar extends Component {
  state = {};
  render() {
    const { user } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary shadow-lg">
        <div className="container">
          <Link className="nav-item nav-link" to="/">
            <img
              className="rounded-circle"
              src={logo}
              alt="InstruMentaliszt logo"
            />
            <span> InstruMentaliszt</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-item nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-item nav-link" to="/allinstruments">
                  All Instruments
                </NavLink>
              </li>
              {!!user && user?.owner && (
                <li className="nav-item">
                  <NavLink className="nav-item nav-link" to="/create-item">
                    Create Item <i className="fas fa-plus"></i>
                  </NavLink>
                </li>
              )}
            </ul>
            <ul className="navbar-nav ml-auto">
              {!user && (
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-item nav-link" to="/signin">
                      Login <i className="fas fa-sign-in-alt"></i>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-item nav-link" to="/signup">
                      Sign Up <i className="fas fa-user-plus"></i>
                    </NavLink>
                  </li>
                </React.Fragment>
              )}

              {user && (
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-item nav-link" to="/logout">
                      Logout <i className="fas fa-sign-out-alt"></i>
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-item nav-link" to="/edit-user">
                      Edit User <i className="fas fa-user-edit"></i>
                    </NavLink>
                  </li>
                  {!!user && !user?.owner && (
                    <li className="nav-item">
                      <NavLink className="nav-item nav-link" to="/cart">
                        Cart <i className="fas fa-shopping-cart"></i>
                      </NavLink>
                    </li>
                  )}
                </React.Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
