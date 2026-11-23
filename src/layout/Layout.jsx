import { Outlet } from "react-router";

import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-100">
        <Outlet />
      </main>
    </>
  );
}
