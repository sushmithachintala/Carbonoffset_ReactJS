import { Component, ChangeEvent } from "react";
import { Redirect } from "react-router-dom";
import UserDataService from "../services/user.service";
import ILoginData from "../types/login.type";
type Props = {};
type State = ILoginData & {
  submitted: boolean
};
export default class LoginUser extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.loadData = this.loadData.bind(this);
    this.state = {
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

  loginUser() {
    const data: ILoginData = {
      username: this.state.username,
      password: this.state.password
    };
    localStorage.setItem('userDetails', JSON.stringify(data));
    this.setState({
      username: this.state.username,
      password: this.state.password,
      submitted: true
    });    
    UserDataService.find(data)
      .then((response: any) => {
        this.setState({
          username: response.data.username,
          password: response.data.password,
          submitted: true
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  loadData() {
    // have to load the data after user login
    this.setState({
      username: "",
      password: "",
      submitted: false
    });
  }
  render() {
    const { submitted, username, password } = this.state;
    if (submitted) {
      return <Redirect to={'/'}>
      </Redirect>
    }
    return (
      <div className="submit-form">
        {submitted ? (
          <div>
            <button className="btn btn-success" onClick={this.loadData}>
              Add
            </button>
          </div>
        ) : (
          <div>
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
            <button onClick={this.loginUser} className="btn btn-success">
              Login
            </button>
          </div>
        )}
      </div>
    );
  }

}