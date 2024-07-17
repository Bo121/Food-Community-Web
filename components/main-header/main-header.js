// 1. The use of "Link"
// 2. The use of "Image" optimizes many steps that would otherwise be our responsibility.
import Link from "next/link";
import Image from "next/image";

// 3. By assigning a alias to the css file, the styling will only be applied to the specific component
import classes from './main-header.module.css';
import logoImg from '@/assets/logo.png';
import MainHeaderBackGround from "./main-header-background";
import NavLink from "./nav-link";

// 4. This kind of component file is executed on the server instead of in the browser !!!!!!!!!!!!!!!!
export default function MainHeader() {

  // 4. console.log("Hello");   =>   is executed in the back-end server
  return (
    <>
      <MainHeaderBackGround />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={ logoImg } alt="Image" priority></Image>
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href={'/meals'}>Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href={'/community'}>Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
