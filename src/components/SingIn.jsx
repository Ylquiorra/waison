import React from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { setUser, setUserInformation } from '../redux/user/slice';
import Form from './Form';
import Loader from './Loader';

const SingIn = () => {
  const [loadingSingInPage, setLoadingSingInPage] = React.useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  React.useEffect(() => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user !== null) {
          dispatch(
            setUser({
              email: user.auth.currentUser.email,
              id: user.auth.currentUser.uid,
              token: user.auth.currentUser.accessToken,
            }),
          );
          setLoadingSingInPage(false);
          navigate('/account');
        } else {
          setLoadingSingInPage(false);
        }
      });
    } catch (error) {
      alert('Не удалось зайти в личный кабинет');
    }
  }, []);

  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(setUser({ email: user.email, id: user.uid, token: user.accessToken }));
        navigate('/account');
      })
      .catch(() =>
        alert('Невозможсно выполнить вход в аккаунт! Проверьте корректность введенных данных.'),
      );
  };

  return loadingSingInPage ? <Loader /> : <Form buttonText="Войти" handleClick={handleLogin} />;
};

export default SingIn;
