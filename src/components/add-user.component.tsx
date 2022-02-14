import { Component, ChangeEvent } from "react";
import { Redirect } from "react-router-dom";
import UserDataService from "../services/user.service";
import IUserData from '../types/user.type';
type Props = {};
type State = IUserData & {
  submitted: boolean
};
export default class AddUser extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);
    this.state = {
      id: null,
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      submitted: false
    };
  }
  onChangeUsername(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      username: e.target.value
    });
  }
  onChangePassword(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeFirstName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      firstName: e.target.value
    });
  }
  onChangeLastName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      lastName: e.target.value
    });
  }
  saveUser() {
    const data: IUserData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      password: this.state.password
    };
    console.log(data);
    this.setState({
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      submitted: true
    });
    UserDataService.create(data)
      .then((response: any) => {
        this.setState({
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          username: response.data.username,
          submitted: true
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  newUser() {
    this.setState({
      id: null,
      username: "",
      password: "",
      submitted: false
    });
  }
  render() {
    const { submitted, username, password, firstName, lastName } = this.state;
    if (!username && submitted) {
      return <Redirect to={'/login'}></Redirect>
    }
    return (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newUser}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                required
                value={firstName}
                onChange={this.onChangeFirstName}
                name="firstname"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                required
                value={lastName}
                onChange={this.onChangeLastName}
                name="lastName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">UserName</label>
              <input
                type="text"
                className="form-control"
                id="username"
                required
                value={username}
                onChange={this.onChangeUsername}
                name="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                value={password}
                onChange={this.onChangePassword}
                name="password"
              />
            </div>
            <button onClick={this.saveUser} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }

}