import { Route, Routes } from 'react-router-dom';
import Home from '~/Components/Home';
import Login from '~/Components/Login';
import TableUsers from '~/Components/TableUsers';
import PrivateRoutes from './PrivateRoutes';
import NotFound from './NotFound';

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={
            <PrivateRoutes>
              <TableUsers />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
