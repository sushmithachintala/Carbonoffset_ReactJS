import { ChangeEvent, Component } from "react";
import { Modal } from "react-bootstrap";
import IProjectDetails from "../types/projects.type";

type Props = {
  data: IProjectDetails;
  parentCallback: (childData: any) => void;
};
type State = {
  projectInfo: IProjectDetails;
  showDialog: boolean;
};

export default class AddEditProject extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      projectInfo: {
        id: this.props.data.id,
        projectName: this.props.data.projectName,
        offsetValue: this.props.data.offsetValue,
        carbonEmission: this.props.data.carbonEmission,
        createby: this.props.data.createby,
      },
      showDialog: true,
    };
    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangeOffset = this.onChangeOffset.bind(this);
    this.onChangeCarbonEmission = this.onChangeCarbonEmission.bind(this);
  }
  onChangeProjectName=(e: ChangeEvent<HTMLInputElement>)=> {
    const projectName = e.target.value;
    this.setState(function (prevState) {
      return {
        projectInfo: {
          ...prevState.projectInfo,
          projectName: projectName,
        },
      };
    });
  }
  onChangeCarbonEmission(e: ChangeEvent<HTMLInputElement>) {
    const carbonEmission = e.target.value;
    this.setState(function (prevState) {
      return {
        projectInfo: {
          ...prevState.projectInfo,
          carbonEmission: carbonEmission,
        },
      };
    });
  }
  onChangeOffset(e: ChangeEvent<HTMLInputElement>) {
    const offsetValue = e.target.value;
    this.setState(function (prevState) {
      return {
        projectInfo: {
          ...prevState.projectInfo,
          offsetValue: offsetValue,
        },
      };
    });
  }
  closeModal() {
    this.setState({
      projectInfo: this.state.projectInfo,
      showDialog: false,
    });
  }
  saveNewProject() {
    this.props.parentCallback(this.state.projectInfo);
  }

  ModelPopUp = () => (
    <Modal
      show={true}
      onHide={() => this.closeModal()}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          Edit
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="form-group">
            <label htmlFor="projectName">Project Name</label>
            <input
              key="pojectName"
              type="text"
              className="form-control"
              id="projectName"
              required
              defaultValue={this.state.projectInfo.projectName}
              onChange={this.onChangeProjectName}
              name="projectName"
            />
          </div>
          <div className="form-group">
            <label htmlFor="carbomEmission">Carbon Emission</label>
            <input
              key="carbomEmission"
              type="text"
              className="form-control"
              id="carbomEmission"
              required
              defaultValue={this.state.projectInfo.carbonEmission}
              onChange={this.onChangeCarbonEmission}
              name="carbomEmission"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Offset">Offset</label>
            <input
              key="Offset"
              type="text"
              className="form-control"
              id="Offset"
              required
              defaultValue={this.state.projectInfo.offsetValue}
              onChange={this.onChangeOffset}
              name="Offset"
            />
          </div>
          <button
            className="btn btn-success"
            onClick={() => this.saveNewProject()}
          >
            Save
          </button>
          <button
            onClick={() => this.closeModal()}
            className="btn btn-success"
          >
            Cancel
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );

  render() {
    return (
      <>
        <this.ModelPopUp/>
      </>
    );
  }
}
