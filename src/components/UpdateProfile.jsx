import React, { useRef, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const UpdateProfile = () => {
  const { currentUser, updatemail, updatepassword } = useAuth();
  const emailRef = useRef();
  const newPasswordRef = useRef();
  const confirmPassword = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const promises = [];
    setLoading(true);
    setError("");

    if (newPasswordRef.current.value === confirmPassword.current.value) {
      promises.push(updatemail(emailRef.current.value));
    } else {
      return setError("New & Confirm Password Do Not Match");
    }

    if (newPasswordRef.current.value) {
      return promises.push(updatepassword(newPasswordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to Update Account");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Card className='py-2 px-2'>
      <h3 className='w-100 text-center'>Update Profile</h3>
      <p>{error && error}</p>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              ref={emailRef}
              placeholder='Email Address'
              defaultValue={currentUser.email}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type='password'
              ref={newPasswordRef}
              placeholder='Leave Blank to Keep the Same'
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              ref={confirmPassword}
              placeholder='Confirm Password'
            ></Form.Control>
          </Form.Group>
          <Button type='submit' className='w-100' disabled={loading}>
            Update Profile
          </Button>
        </Form>
      </Card.Body>
      <p className='w-100 text-center'>
        <Link to='/'>Cancel</Link>
      </p>
    </Card>
  );
};
