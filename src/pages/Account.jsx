import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

import { setUserInformation } from '../redux/useInformation/slice';
import { useAuth } from '../hooks/useAuth';
import AccountNavigate from '../components/AccountNavigate';
import Loader from '../components/Loader';

const Account = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.userSlice);
  const { isAuth } = useAuth();

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const getUserInfo = async () => {
      const orderRef = doc(db, `user/${id?.uid}/informationAboutUser/infoUser`);
      const unsubscribe = onSnapshot(orderRef, (userInfo) => {
        if (userInfo.exists()) {
          dispatch(setUserInformation(userInfo.data()));
        }
        setIsLoading(false);
      });
      return () => {
        unsubscribe();
      };
    };
    getUserInfo();
  }, []);

  return isAuth ? (
    isLoading ? (
      <Loader />
    ) : (
      <main className="account universal">
        <div className="account__container universal__container">
          <div className="account-body universal-body">
            <div className="body-account universal-body__content">
              <div className="body-account-breadcrumbs universal-body__content-breadcrumbs">
                <ul>
                  <Link to="/">
                    <li>
                      <p>Начальная страница</p>
                    </li>
                  </Link>
                  <li>
                    <p>аккаунт</p>
                  </li>
                </ul>
              </div>
              <div className="universal-body__title">
                <h1>Аккаунт</h1>
              </div>
            </div>
            <AccountNavigate />
          </div>
        </div>
      </main>
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default Account;
