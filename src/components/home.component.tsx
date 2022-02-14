import { ChangeEvent, Component } from "react";
import { Button, Modal } from "react-bootstrap";
import 'reactjs-popup/dist/index.css';
import { SaveAndEditModal } from "../functions";
import IProjectDetails from "../types/projects.type";
import AddEditProject from '../components/add-edit-project'
import { constants } from "buffer";
import IUserData from "../types/user.type";
import { Redirect } from "react-router-dom";
type Props = {};
type State = {
    projectDetails: IProjectDetails[];
    showDialog: boolean;
    editProject: IProjectDetails;
    isLogged: boolean;
}
export default class Home extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            projectDetails:
                [{ carbonEmission: '', createby: 0, id: 0, offsetValue: '', projectName: '' }],
            showDialog: false,
            editProject: { carbonEmission: '', createby: 0, id: 0, offsetValue: '', projectName: '' },
            isLogged: false
        }
        this.onChangeProjectName = this.onChangeProjectName.bind(this);
        this.onChangeOffset = this.onChangeOffset.bind(this);
        this.onChangeCarbonEmission = this.onChangeCarbonEmission.bind(this);
    }
    editProjectDetails(selectedProjectId: number) {
        let projects = this.state;
        let index = projects.projectDetails.map(s => s.id).indexOf(selectedProjectId);

        this.setState({
            projectDetails: this.state.projectDetails,
            showDialog: true,
            editProject: projects.projectDetails[index]
        });
    }
    addNewProject() {
        this.setState({
            projectDetails: this.state.projectDetails,
            showDialog: true,
            editProject: { carbonEmission: '', createby: 0, id: 0, offsetValue: '', projectName: '' }
        });
    }
    deleteProjectDetails(selectedProjectId: number) {
        let projects = this.state;
        let index = projects.projectDetails.map(s => s.id).indexOf(selectedProjectId);
        projects.projectDetails.splice(index, 1);
        this.setState(projects);
    }
    closeModal() {
        this.setState({
            projectDetails: this.state.projectDetails,
            showDialog: false
        });
    }
    componentDidMount() {
        let projects = [{
            carbonEmission: '50', createby: 1, id: 1, offsetValue: '25', projectName: 'Redom 1', submitted: false
        }, {
            carbonEmission: '60', createby: 1, id: 2, offsetValue: '30', projectName: 'Fedo Match', submitted: false
        }, {
            carbonEmission: '70', createby: 2, id: 3, offsetValue: '50', projectName: 'Recto Master', submitted: false
        }
        ]
        this.setState({ projectDetails: projects });
    }
    saveNewProject(projectInfo: IProjectDetails) {
        const { projectDetails, editProject } = this.state;
        if (projectInfo.id == 0) {
            let maxId = Math.max(...projectDetails.map(s => { return s.id }))
            projectInfo.id = maxId + 1;
            projectInfo.createby = 1;
            projectDetails.push(projectInfo);
            this.setState({
                projectDetails: projectDetails,
                showDialog: false
            });
        } else {
            let index = projectDetails.map(s => { return s.id }).indexOf(projectInfo.id);
            let projectDetail = projectDetails[index];
            projectDetail.carbonEmission = projectInfo.carbonEmission;
            projectDetail.offsetValue = projectInfo.offsetValue;
            projectDetail.projectName = projectInfo.projectName;
            this.setState({
                projectDetails: projectDetails,
                showDialog: false
            });
        }
    }
    onChangeProjectName(e: ChangeEvent<HTMLInputElement>) {
        const projectName = e.target.value;
        this.setState((prevState) => ({
            editProject: {
                ...prevState.editProject,
                projectName: projectName
            },
        }));
        e?.preventDefault();
    }
    onChangeCarbonEmission(e: ChangeEvent<HTMLInputElement>) {
        const carbonEmission = e.target.value;
        this.setState((prevState) => ({
            editProject: {
                ...prevState.editProject,
                carbonEmission: carbonEmission
            },
        }));
    }
    onChangeOffset(e: ChangeEvent<HTMLInputElement>) {
        const offSet = e.target.value;
        this.setState((prevState) => ({
            editProject: {
                ...prevState.editProject,
                offsetValue: offSet
            },
        }));
    }
    handleCallback = (projectInfo: any) => {
        const { projectDetails, editProject } = this.state;
        if (projectInfo.id == 0) {
            let maxId = Math.max(...projectDetails.map(s => { return s.id }))
            if (projectDetails.length == 0)
                maxId = 0;
            projectInfo.id = maxId + 1;
            projectInfo.createby = 1;
            projectDetails.push(projectInfo);
            this.setState({
                projectDetails: projectDetails,
                showDialog: false
            });
        } else {
            let index = projectDetails.map(s => { return s.id }).indexOf(projectInfo.id);
            let projectDetail = projectDetails[index];
            projectDetail.carbonEmission = projectInfo.carbonEmission;
            projectDetail.offsetValue = projectInfo.offsetValue;
            projectDetail.projectName = projectInfo.projectName;
            this.setState({
                projectDetails: projectDetails,
                showDialog: false
            });
        }
    }
    userDetails: IUserData = {}
    isUserLogged() {
        let data = localStorage.getItem('userDetails');
        if (data)
            return true;
        else
            return false;
    }
    render() {
        let projects = this.state;
        const ShowModal = () => {
            if (projects.showDialog) {
                return <AddEditProject data={projects.editProject} parentCallback={this.handleCallback}></AddEditProject>
            } else
                return <div></div>
        }
        const Table = (projects: any) => {
            if (projects && projects.data.length > 0) {
                return <div>
                    <p>List of Projects
                    </p>
                    <table>
                        <thead>
                            <tr>
                                <td>Project ID
                                </td>
                                <td>Project Name
                                </td>
                                <td>Carbon Emission
                                </td>
                                <td>Offset Value
                                </td>
                                <td>
                                    Actions
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.data.map((project: any, index: number) =>
                                <Row key={index} data={project} />
                            )}
                        </tbody>
                    </table>
                </div>
            }
            else
                return <span>No Records Found</span>
        }
        const Row = (proj: any) => <tr>
            <td>{proj.data.id}
            </td>
            <td>{proj.data.projectName}
            </td>
            <td>{proj.data.carbonEmission}
            </td>
            <td>{proj.data.offsetValue}
            </td>
            <td>
                <Button variant="primary" onClick={() => this.editProjectDetails(proj.data.id)}>
                    Edit
                </Button>
                <Button variant="secondary" onClick={() => this.deleteProjectDetails(proj.data.id)}>Delete</Button>
            </td>
        </tr>
        if (!this.isUserLogged())
            return <Redirect to='/login' />
        return <div>
            <Button variant="primary" onClick={() => this.addNewProject()}>
                Add New Project
            </Button>
            <Table data={projects.projectDetails} />
            <ShowModal></ShowModal>
        </div >
    }
}