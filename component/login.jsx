"use client";

import React from "react";

import "@/style/style-dashboard.css";

export default function Login({ setIsConnected }) {
  const [user, setUser] = React.useState({ password: "" });
  const mdp = process.env.NEXT_PUBLIC_MOT_DE_PASSE;

  React.useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("user"))) {
      if (JSON.parse(sessionStorage.getItem("user")).password === mdp) {
        setIsConnected(true);
      }

      setUser(JSON.parse(sessionStorage.getItem("user")));
    }
  }, []);

  function Login(e) {
    e.preventDefault();

    const error = document.querySelector("#error");

    if (user.password === mdp && typeof window !== "undefined") {
      setIsConnected(true);
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      error.innerText = "Mot de passe incorrect";
    }
  }

  return (
    <form id="login" onSubmit={(e) => Login(e)}>
      <input
        type="password"
        placeholder="Mot de passe"
        onChange={(e) =>
          setUser((prev) => ({
            ...prev,
            password: e.target.value,
          }))
        }
      />

      <p id="error"></p>

      <button type={"submit"}>Se connecter</button>
    </form>
  );
}
