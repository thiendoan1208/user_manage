import { useState } from 'react';

import { toast } from 'react-toastify';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { postCreateUser } from '~/Services/user-service';

function AddNewUser({ show, handleClose, handleUpdateTableUser }) {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job);

    if (res && res.id) {
      handleClose();
      setName('');
      setJob('');
      toast.success('Create new user success !! ');
      handleUpdateTableUser({first_name: name, id: res.id});
    } else {
      toast.error('Cannot create new user ');
    }
  };

  return (
    <>
      <div className="modal show" style={{ display: 'block', position: 'initial' }}>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}> 
          <Modal.Header closeButton>
            <Modal.Title>Add new user</Modal.Title>
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
            <Button variant="primary" onClick={handleSaveUser}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default AddNewUser;
