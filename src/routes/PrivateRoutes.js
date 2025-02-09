import { useContext } from 'react';
import { UserContext } from '~/Context/UserContext';
import { Alert } from 'react-bootstrap';

function PrivateRoutes({ children }) {
  const { user } = useContext(UserContext);

  if (user && user.auth === true) {
    return children;
  } else {
    return (
      <Alert variant="danger" className="mt-3">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>You dont have permission to access this site, please login first !</p>
      </Alert>
    );
  }
}
export default PrivateRoutes;
