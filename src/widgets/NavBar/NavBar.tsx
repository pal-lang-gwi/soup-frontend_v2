import { NavBarLoggedOut } from './NavBarLoggedOut.tsx'
import { NavBarLoggedIn } from './NavBarLoggedIn.tsx'

interface NavBarProps {
  isLoggedIn?: boolean
}

export const NavBar = ({ isLoggedIn = false }: NavBarProps) => {
  return isLoggedIn ? <NavBarLoggedIn /> : <NavBarLoggedOut />
}
