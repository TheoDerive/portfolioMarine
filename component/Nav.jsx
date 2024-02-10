"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faList } from "@fortawesome/free-solid-svg-icons";
import useWindowDimensions from "@/utils/utilsVar";

export function NavDashboard() {
  function ongletSelect(e) {
    const onglets = document.querySelectorAll(".onglet-link");

    onglets.forEach((onglet) => {
      onglet.classList.remove("onglet-link-active");
    });

    e.target.classList.add("onglet-link-active");
  }

  return (
    <header id={`header-dashboard`}>
      <nav className="dashboard-nav">
        <ul className="onglet-dashboard-container">
          <li className="onglet" onClick={(e) => ongletSelect(e)}>
            <a
              href="/238b609edb608f333ff38a1a62a1e1/"
              className="onglet-link onglet-link-active"
            >
              <FontAwesomeIcon icon={faHome} />
            </a>
          </li>
          <li className="onglet" onClick={(e) => ongletSelect(e)}>
            <a
              href="/238b609edb608f333ff38a1a62a1e1/category"
              className="onglet-link"
            >
              <FontAwesomeIcon icon={faList} />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default function Nav() {
  const ongletContainerRef = React.useRef();
  const ongletHome = React.useRef();
  const ongletProjet = React.useRef();
  const ongletContact = React.useRef();
  const [isProjectPage, setIsProjectPage] = React.useState({
    isShow: false,
    redirect: "",
  });
  const [isClient, setIsClient] = React.useState(false);
  const { windowWidth } = useWindowDimensions();

  React.useEffect(() => {
    setIsClient(true);

    const location = window.location.pathname;
    const splitLocation = location.split("/");
    const newSplitLocation = splitLocation.slice(1, splitLocation.length);
    if (newSplitLocation.length > 2 && newSplitLocation[0] !== "") {
      setIsProjectPage({
        isShow: true,
        redirect: `/${splitLocation[1]}/${splitLocation[2]}`,
      });
    }

    document.querySelectorAll(".onglet").forEach((onglet) => {
      onglet.classList.remove("onglet-active");
    });

    const params = window.location.pathname;
    const arrayParams = params.split("/");

    if (arrayParams[1] === "projets") {
      ongletProjet.current.classList.add("onglet-active");
    } else if (arrayParams[1] === "contact") {
      ongletContact.current.classList.add("onglet-active");
    } else {
      ongletHome.current.classList.add("onglet-active");
    }
  }, []);

  function openNav() {
    ongletContainerRef.current.classList.add("onglet-container-open");
    document.querySelector("html").classList.add("remove-scroll");
  }

  function closeNav() {
    ongletContainerRef.current.classList.remove("onglet-container-open");
    document.querySelector("html").classList.remove("remove-scroll");
  }

  return (
    <header id="header">
      <a href="/">
        <h2 style={{ textTransform: "uppercase" }}>Marine Sicaud</h2>
      </a>

      <nav
        className={isClient && windowWidth > 800 ? "nav-desktop" : "nav-phone"}
      >
        <span
          className="menu-burger"
          style={isProjectPage.isShow ? { display: "none" } : null}
          onClick={() => openNav()}
        ></span>
        <ul
          className="onglet-container"
          style={isProjectPage.isShow ? { display: "none" } : null}
          ref={ongletContainerRef}
        >
          <span className="cross" onClick={() => closeNav()}></span>
          <li className="onglet onglet-active" ref={ongletHome}>
            <a href={`/`}>A Propos</a>
          </li>
          <li className="onglet" ref={ongletProjet}>
            <a href={`/projets`}>Projets</a>
          </li>
          <li className="onglet" ref={ongletContact}>
            <a href="mailto:sicaud.marine.pro@gmail.com">Contact</a>
          </li>
        </ul>
      </nav>

      {isProjectPage.isShow ? (
        <a href={isProjectPage.redirect} className="return"></a>
      ) : null}
    </header>
  );
}
