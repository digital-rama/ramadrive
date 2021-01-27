import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ForgotPassword = () => {
  const emailRef = useRef();
  const { forgotPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await forgotPassword(emailRef.current.value);
      setMessage("Check your mail inbox for Password Reset Instruction.");
      emailRef.current.value = "";
    } catch (error) {
      setError(
        error.code === "auth/user-not-found"
          ? "Incorrect Email Address"
          : "Failed to Reset Password."
      );
    }
    setLoading(false);
  };

  return (
    <>
      <Card style={{ color: "black", padding: "1rem" }}>
        <h2 className='text-center'>Reset Password</h2>
        {error && <Alert variant='danger'>{error}</Alert>}
        {message && <Alert variant='success'>{message}</Alert>}
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Button type='submit' className='w-100' disabled={loading}>
              Reset Password
            </Button>
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to='/signin'>Login</Link>
          </div>
        </Card.Body>
      </Card>
      <p className='w-100 text-center mt-2'>
        Don't have an Account? <Link to='/signup'>Sign Up</Link>
      </p>
    </>
  );
};
