import React from "react";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

class NavBar extends React.Component {
  onLogout() {
    Accounts.logout();
  }

  render() {
    // console.log("NavBar Props: ", this.props.user.emails[0].address);
    return (
      <div className="">
        <nav className="navbar navbar-expand-sm navbar-light">
          <div className="container">
            <NavLink className="font-weight-bold navbar-brand" to="/">
              <img
                src="favicon-96x96.png"
                width="40"
                height="40"
                alt="our-logo"
                style={{ marginRight: 0.3 + "em" }}
              />
              Brews <span id="ampColor">&</span> <span id="youColor">You</span>
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/search"
                  >
                    Search
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/about"
                  >
                    About
                  </NavLink>
                </li>
              </ul>
              <div className="md-form my-0">
                {Meteor.user() ? (
                  <span>
                    <Dropdown role="menu">
                      <Dropdown.Toggle
                        className="p-1 m-0"
                        id="dropdown-custom-1"
                        variant="outline-light"
                      >
                        <img
                          className="rounded-circle"
                          height="30px"
                          width="30px"
                          src={`https://robohash.org/${
                            Meteor.users.findOne(Meteor.userId()).emails[0]
                              .address
                          }`}
                          alt={
                            Meteor.users.findOne(Meteor.userId()).emails[0]
                              .address
                          }
                        />
                      </Dropdown.Toggle>
                      <Dropdown.Menu alignRight className="super-colors">
                        <LinkContainer to="/account">
                          <Dropdown.Item as="button" role="menuitem">
                            Account
                          </Dropdown.Item>
                        </LinkContainer>
                        <Dropdown.Item
                          as="button"
                          role="menuitem"
                          onClick={this.onLogout.bind(this)}
                        >
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </span>
                ) : (
                  <span>
                    <NavLink
                      className="btn"
                      to={{
                        pathname: "/login",
                        state: { prevPath: location.pathname }
                      }}
                    >
                      Login
                    </NavLink>{" "}
                    <NavLink className="btn btn-primary" to="/signup">
                      Signup
                    </NavLink>
                  </span>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(NavBar);
