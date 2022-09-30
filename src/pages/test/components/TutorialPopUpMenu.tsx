import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form } from "react-bootstrap";

export default function Model({ handleClick, status, handleChange, text }) {
  return (
    <>
      <Modal show={status} onHide={handleClick}>
        <Modal.Header closeButton>
          <Modal.Title>Gallary</Modal.Title>
        </Modal.Header>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            value={text}
            placeholder="Enter Something"
            onChange={handleChange}
          />
        </Form.Group>
        <Modal.Body>
          Woohoo, you're reading this text in a modal from your input:{" "}
          <strong>{text}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClick}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
