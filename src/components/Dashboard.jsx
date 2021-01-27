import React, { useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Dashboard = () => {
  const [error, setError] = useState("");
  const { currentUser, signout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    setError("");
    try {
      await signout();
      history.push("/login");
    } catch (error) {
      setError("Failed to Logout.");
      console.log(error);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center'>Sign Up</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          {`Current User ${currentUser && currentUser.email}`}
          <Link to='/profile-update' className='btn btn-primary w-100 mt-3'>
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <p className='w-100 text-center mt-2'>
        <Button
          variant='link'
          onClick={handleLogout}
          className='btn btn-danger text-white'
        >
          Logout
        </Button>
      </p>
    </>
  );
};
