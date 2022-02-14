import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export function SaveAndEditModal(data: any, buttonlabel: string) {
    const [show, setShow] = useState(false);
    if (!data) {
        return <Button variant="primary" onClick={() => setShow(true)}>
            {buttonlabel}
        </Button>
    } else
        return (
            <>
                <Button variant="primary" onClick={() => setShow(true)}>
                    {buttonlabel}
                </Button>

                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            {buttonlabel}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="form-group">
                                <label htmlFor="projectName">Project Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="projectName"
                                    required
                                    value={data.projectName}
                                    name="projectName"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="carbomEmission">Carbon Emission</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="carbomEmission"
                                    required
                                    value={data.carbonEmission}
                                    name="carbomEmission"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Offset">Offset</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Offset"
                                    required
                                    value={data.offsetValue}
                                    name="Offset"
                                />
                            </div>
                            <button className="btn btn-success">
                                Save
                            </button>
                            <button className="btn btn-success">
                                Cancel
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
}
