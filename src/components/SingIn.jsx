import React from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { setUser } from '../redux/user/slice';
import Form from './Form';

const SingIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  //! ипользую два раза, нужно вынести код (неидеально решение)
  React.useEffect(() => {
    setTimeout(() => {
      if (auth.currentUser !== null) {
        dispatch(
          setUser({
            email: auth.currentUser.email,
            id: auth.currentUser.uid,
            token: auth.currentUser.accessToken,
          }),
        );
        navigate('/account');
      }
    }, 1000);
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

  return <Form buttonText="Войти" handleClick={handleLogin} />;
};

export default SingIn;
