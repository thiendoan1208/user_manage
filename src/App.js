import Header from './Components/Header';
import TableUsers from './Components/TableUsers';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="app__container">
      {/* Header */}
      <Header />
      {/* Container */}
      <Container>
        <TableUsers />
      </Container>
    </div>
  );
}

export default App;
