import {
  Row, Button, Form, Card,
} from 'react-bootstrap';
import { useState } from 'react';
import userPlaceholder from '../img/logo.png';

/* Account Info Placeholder */
function AccountInfo(props) {
  const { userInfo, doLogOut } = props;

  return (
    <Row className="mt-5 justify-content-center">
      <Card className="text-center" style={{ width: '24rem' }}>
        <Card.Body>
          <Card.Img className="mb-4" variant="info" src={userPlaceholder} alt="userImage" style={{ width: '18rem' }} />
          <Card.Text className="text-left mb-4">
            Hello
            {' '}
            <b>{userInfo}</b>
            ,  you are already logged in.
            {' '}
            <br />
            You can add, edit or remove tasks from your personal and private list.
            <br />
            Have fun!
          </Card.Text>
          <Button className="btn-lg btn-block" variant="info" onClick={doLogOut}>Log Out</Button>
        </Card.Body>
      </Card>
    </Row>
  );
}

function LoginForm(props) {
  const { doLogIn } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === '' || password === '') {
      setInvalidUsername(username === '');
      setInvalidPassword(password === '');
      // eslint-disable-next-line no-alert
      // alert('Please insert username and password');
    } else {
      doLogIn(username, password);
    }
  };

  const handleChange = (event) => {
    if (event.target.id === 'username') {
      setUsername(event.target.value);
      setInvalidUsername(event.target.value === '');
    } else if (event.target.id === 'password') {
      setPassword(event.target.value);
      setInvalidPassword(event.target.value === '');
    }
  };

  return (
    <Row className="mt-5 justify-content-center">
      <Card className="text-center" style={{ width: '24rem' }}>
        <Card.Body>
          <Card.Img variant="info" src={userPlaceholder} alt="imagePlaceholder" style={{ width: '18rem' }} />
          <Form>
            <Form.Group className="text-left mb-4" controlId="username">
              <Form.Label>Username:</Form.Label>
              <Form.Control isInvalid={invalidUsername} placeholder="Enter Username" type="email" value={username} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please insert username.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="text-left mb-4" controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control isInvalid={invalidPassword} placeholder="Enter Password" type="password" value={password} onChange={handleChange} />
              <Form.Control.Feedback type="invalid">Please insert password.</Form.Control.Feedback>
            </Form.Group>
            <Button className="btn-lg btn-block" variant="info" onClick={handleSubmit}>Log In</Button>
          </Form>
        </Card.Body>
      </Card>
    </Row>
  );
}

export { AccountInfo, LoginForm };
