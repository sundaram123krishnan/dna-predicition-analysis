import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DNA Sequencing Tool</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          
                <li>
                  <Link href="/mutation_detected">Mutation Detection</Link>
                </li>
                <li>
                  <Link href="/local_alignment">Local Alignment Searching</Link>
                </li>
                <li>
                <Link href="/performance_analysis">Performance Analysis</Link>
              </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
