import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '~/Services/user-service';
import { toast } from 'react-toastify';

function ModalConfirm({ show, handleClose, dataUserDelete, handleDeleteUserFromModal }) {
  const handleDeleteUser = async () => {
    let res = await deleteUser(dataUserDelete.id);
    if (res && +res.statusCode === 204) {
      toast.success('Delete user success !');
      handleDeleteUserFromModal(dataUserDelete);
      handleClose();
    } else {
      toast.error('An error ocurs');
    }
  };

  // Dấu + có tác dụng trong th trả ra 1 một chuỗi string thì sẽ convert nó sang kiểu sô nguyên.

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
              <br />
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
