import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import { auth } from '../../../firebase';

const Root = function () {
  const user = {
    name: auth.currentUser?.displayName,
    profileImg: auth.currentUser?.photoURL,
  };

  return (
    <>
      {auth.currentUser ? <SideBar user={user} /> : <SideBar />}
      <Outlet />
    </>
  );
};

export default Root;
