'use client'

import Link from "next/link" ;
import Image from "next/image" ;
import { useState, useEffect } from "react" ;



const Nav = () => {

    const isUserLoggedIn = true

  return (
    <div>
    {isUserLoggedIn ? (
 <div className="navbar bg-base-100">
 <a className="btn btn-ghost normal-case text-xl">Dashboard</a>
</div>
    ) : (<> hahaha</>)}
    </div>
  )
}

export default Nav