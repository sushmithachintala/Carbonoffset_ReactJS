import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';
import UserDataService from "../services/user.service";
import IUserData from "../types/user.type";
interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}
type Props = RouteComponentProps<RouterProps>;
type State = {
  currentUser: IUserData;
  message: string;
}
export default class Users extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.getProjects = this.getProjects.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateProjects = this.updateProjects.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.state = {
        currentUser: {
        id: null,
        firstName: "",
        lastName: "",
        username: "",
        password: ""
      },
      message: "",
    };
  }
  componentDidMount() {
    this.getProjects(this.props.match.params.id);
  }
  onChangeUsername(e: ChangeEvent<HTMLInputElement>) {
    const username = e.target.value;
    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          username: username,
        },
      };
    });
  }
  onChangeLastName(e: ChangeEvent<HTMLInputElement>) {
    const lastName = e.target.value;
    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          lastName: lastName,
        },
      };
    });
  }
  onChangeFirstName(e: ChangeEvent<HTMLInputElement>) {
    const firstName = e.target.value;
    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          firstName: firstName,
        },
      };
    });
  }
  onChangePassword(e: ChangeEvent<HTMLInputElement>) {
    const password = e.target.value;
    this.setState((prevState) => ({
        currentUser: {
        ...prevState.currentUser,
        password: password      
      },
    }));
  }
  getProjects(id: string) {
    UserDataService.get(id)
      .then((response: any) => {
        this.setState({
            currentUser: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  updatePublished(status: boolean) {
    const data: IUserData = {
      id: this.state.currentUser.id,
      firstName: this.state.currentUser.firstName,
      lastName: this.state.currentUser.lastName,
      username: this.state.currentUser.username,
      password: this.state.currentUser.password      
    };
    UserDataService.update(data, this.state.currentUser.id)
      .then((response: any) => {
        this.setState((prevState) => ({
          currentUser: {
            ...prevState.currentUser            
          },
          message: "The status was updated successfully!"
        }));
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  updateProjects() {
    UserDataService.update(
      this.state.currentUser,
      this.state.currentUser.id
    )
      .then((response: any) => {
        console.log(response.data);
        this.setState({
          message: "The user was updated successfully!",
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  deleteProject() {
    UserDataService.delete(this.state.currentUser.id)
      .then((response: any) => {
        console.log(response.data);
        this.props.history.push("/projects");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  render() {
    const { currentUser } = this.state;
    return (
      <div>
        {currentUser ? (
          <div className="edit-form">
            <h4>Registration</h4>
            <form>
              <div className="form-group">
                <label htmlFor="username">UserName</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={currentUser.username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={currentUser.password}
                  onChange={this.onChangePassword}
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  value={currentUser.firstName}
                  onChange={this.onChangeFirstName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  value={currentUser.lastName}
                  onChange={this.onChangeLastName}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>                
              </div>
            </form>
            
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteProject}
            >
              Delete
            </button>
            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateProjects}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
          </div>
        )}
      </div>
    );
  }
}