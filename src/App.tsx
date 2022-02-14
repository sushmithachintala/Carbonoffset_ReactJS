import React, { Component, useEffect } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddUser from "./components/add-user.component";
import Users from "./components/user.component";
import Login from "./components/login-user.component";
import { render } from "@testing-library/react";
import IUserData from "./types/user.type";
import Home from "./components/home.component";
import { Button } from "react-bootstrap";
type Props = {};
type State = IUserData & {
  submitted: boolean,
  redirect: boolean
};
class App extends Component<Props, State>  {
  constructor(props: Props) {
    super(props);
    this.state = {
      firstName: '', submitted: false, lastName: '', username: '', redirect: false
    };
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidUpdate() {
    let data = localStorage.getItem('userDetails');
    if (data) {
      this.userDetails = JSON.parse(data);
      if (this.userDetails.username)
        this.setState(this.userDetails);
    }
  }
  handleLogOut() {
    localStorage.clear();
    this.setState({ redirect: true });
    this.renderRedirect();
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }
  isUserLogged() {
    let data = localStorage.getItem('userDetails');
    if (data)
      return true;
    else
      return false;
  }
  userDetails: IUserData = {}
  render() {    
    const { username } = this.state;
    let loginButton, registerButton;
    if (this.isUserLogged()) {
      loginButton = <li className="nav-item">
        <Button onClick={this.handleLogOut}>
          Logout
        </Button>
      </li>
    } else {
      loginButton = <li className="nav-item">
        <Link to={"/login"} className="nav-link">
          Login
        </Link>
      </li>;
      registerButton = <li className="nav-item">
        <Link to={"/add"} className="nav-link">
          Register
        </Link>
      </li>

    }
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/userlist"} className="navbar-brand">
            Power Energy
          </Link>
          <div className="navbar-nav mr-auto">
            {loginButton}
            {registerButton}
            <li className="nav-item">
              <span>{username}</span>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/add" component={AddUser} />
            <Route exact path="/login" component={Login} />
            <Route path="/userlist/:id" component={Users} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;