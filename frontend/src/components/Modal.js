import { Button, Modal } from "react-bootstrap";

export const MyModal = (props) => {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title || "Modal heading"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children || "Content"}</Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Cancel</Button>
          <Button onClick={props.onSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
