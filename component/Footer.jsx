"use client";

import React from "react";

export default function Footer() {
  const [isShow, setIsShow] = React.useState(true);

  React.useEffect(() => {
    const location = window.location.pathname;
    const splitLocation = location.split("/");
    const newSplitLocation = splitLocation.slice(1, splitLocation.length);
    if (newSplitLocation.length > 0 && newSplitLocation[0] !== "") {
      setIsShow(false);
    }
  }, [isShow]);

  return (
    <footer>
      {isShow ? (
        <section className="contact-footer">
          <h2>
            De l'idée à l'action, je transforme ma vision créative en réalité,
            façonnant chaque projet avec passion et détermination !
          </h2>
          <a href="mailto:sicaud.marine.pro@gmail.com" className="calltoaction">
            Contact
          </a>
        </section>
      ) : null}
      <ul className="footer-container">
        <li className="footer-onglet">
          <a href="https://www.linkedin.com/in/marine-sicaud/">
            <img src={`/linkedin.svg`} alt="" />
          </a>
        </li>
        <li className="footer-logo">
          <a href="#header">
            <img src={`/part1Logo.png`} alt="" />
          </a>
        </li>
        <li className="footer-onglet">
          <a href="https://www.instagram.com/marines.design/">
            <img src={`/instagram.svg`} alt="" />
          </a>
        </li>
      </ul>
    </footer>
  );
}

