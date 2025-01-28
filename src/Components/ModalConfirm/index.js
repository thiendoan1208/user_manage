import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalConfirm({ show, handleClose, dataUserDelete }) {
  const handleDeleteUser = () => {
    console.log(dataUserDelete);
  };

  return (
    <>
      <div className="modal show" style={{ display: 'block', position: 'initial' }}>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Delete user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
                Are you sure to delete this user ?
                <br/>
                <b>Email: {dataUserDelete.email}</b>
                </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleDeleteUser}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default ModalConfirm;
