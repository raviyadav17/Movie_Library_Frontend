import React, { useState} from "react";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../services/api";

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Using useNavigate hook

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signIn(email, password); // Call signIn function from auth.js
      localStorage.setItem('token', response.token);
      navigate('/');
    } catch (error) {
      setError(error.response.data.error); // Set error message for display
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100 overflow-hidden bg-info"
    >
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="shadow mt-3 p-3">
            <h2 className="text-center mt-1">Login</h2>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                {error && <p className="text-danger">{error}</p>} {/* Display error message */}
                <Button variant="primary" type="submit" className="w-100">
                  Sign In
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInPage;
