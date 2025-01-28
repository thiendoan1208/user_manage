import { useEffect, useState } from 'react';
import { putUpdateUser } from '~/Services/user-service';

import { toast } from 'react-toastify';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function ModalEditUser({ show, handleClose, dataUserEdit, handleEditUserFromModal }) {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  useEffect(() => {
    if (show) {
      setName(dataUserEdit.first_name);
    }
  }, [dataUserEdit, show]);

  const handleEditUser = async () => {
    let res = await putUpdateUser(name, job);

    if (res && res.updatedAt) {
      handleEditUserFromModal({
        first_name: name,
        id: dataUserEdit.id,
      });
      handleClose();
      toast.success('Update user success');
    }
  };

  return (
    <>
      <div className="modal show" style={{ display: 'block', position: 'initial' }}>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mb-3 flex flex-col">
                <Form.Group className="width-full" controlId="validationCustom01">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    required
                    type="text"
                    placeholder="Please enter a name"
                  />
                </Form.Group>
                <Form.Group className="width-full" controlId="validationCustom02">
                  <Form.Label>Job</Form.Label>
                  <Form.Control
                    value={job}
                    onChange={(e) => {
                      setJob(e.target.value);
                    }}
                    required
                    type="text"
                    placeholder="Please enter a job"
                  />
                </Form.Group>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEditUser}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default ModalEditUser;
