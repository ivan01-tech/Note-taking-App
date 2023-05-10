import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import styles from "../Note.module.css";
type Props = {};

function Layout({}: Props) {
  return (
    <div className={`${styles.rootElement}`}>
      <Header />
      <Outlet />;
    </div>
  );
}

export default Layout;
