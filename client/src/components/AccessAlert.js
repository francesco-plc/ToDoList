import { Alert } from 'react-bootstrap';

function AccessAlert(props) {
  const { loggedIn, userInfo, closeAlert } = props;

  return (
    loggedIn
      ? (
        <Alert variant="info" onClose={closeAlert} dismissible>
          <Alert.Heading>
            Welcome,
            {' '}
            {userInfo}
          </Alert.Heading>
          <p>
            From now on you can add, edit or remove tasks from your personal and private list.
            Have fun!
          </p>
        </Alert>
      )
      : (
        <Alert variant="danger" onClose={closeAlert} dismissible>
          <Alert.Heading>
            Incorrect username and/or password. Please check them.
          </Alert.Heading>
        </Alert>
      )
  );
}

export default AccessAlert;
