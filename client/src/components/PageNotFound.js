import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

/* Page Not Found Placeholder */
function PageNotFound() {
  const routerHistory = useHistory();

  const handleClick = () => {
    routerHistory.push('/');
  };

  return (
    <>
      <h1 className="below-nav text-center">Page Not Found</h1>
      <Button variant="info" onClick={handleClick}>Goto Homepage</Button>
    </>
  );
}

export default PageNotFound;
