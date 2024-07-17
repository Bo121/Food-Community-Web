// Since it should be rendered from the client side because it should retrieve the route
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from './nav-link.module.css'

export default function NavLink({ href, children }) {
  // 5. To retrieve the path from the route
  const path = usePathname();
  return (
    <>
      <Link href={href} className={path.startsWith(href) ? `${classes.link} ${classes.active}` : classes.link}>
        {children}
      </Link>
    </>
  );
}