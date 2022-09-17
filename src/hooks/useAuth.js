import { useSelector } from 'react-redux'

export function useAuth() {
  const { email, token, userId } = useSelector((state) => state.userSlice)
  return {
    isAuth: !!email,
    email,
    token,
    userId, 
  }
}