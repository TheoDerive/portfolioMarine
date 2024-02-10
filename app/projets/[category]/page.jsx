"use client";

import React from "react";
import { useParams } from "next/navigation";

import Nav from "@/component/Nav";
import Footer from "@/component/Footer";
import Loading from "@/component/Loading";
import "@/style/style.css";
import { redirectionAPI } from "@/utils/redirections";
import ErrorPage from "@/app/not-found";

export default function ProjectPage() {
  let { category } = useParams();
  const [projectCategories, setProjectCategories] = React.useState([]);
  const [isLoad, setIsLoad] = React.useState(true);
  const [getError, setGetError] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        redirectionAPI(`/api/get-categorie/${category}`),
      );
      if (!response.ok) {
        throw new Error(
          "Il y a eu un problème dans la récupération des données...",
        );
      }
      const data = await response.json();

      console.log(data);
      if (data.length > 0) {
        setProjectCategories(data[0].content);
        document.documentElement.classList.add("remove-overflow");
        setIsLoad(false);
      } else {
        setGetError(true);
        setIsLoad(false);
      }
    }

    fetchData();
  }, [category]);

  React.useEffect(() => {
    if (!getError) {
      const photographieContainer = document.querySelectorAll(
        ".photographie-container",
      );
      let timer = 0;

      for (let i = 0; i < photographieContainer.length; i++) {
        const element = photographieContainer[i];

        setTimeout(() => {
          element.style.opacity = "1";
        }, timer + 300);

        timer = timer + 300;
      }
    }
  }, [projectCategories, getError]);

  return (
    <>
      {isLoad ? <Loading isLoad={isLoad} /> : null}
      {!getError ? (
        <>
          <Nav />
          <main id={category === "autre" ? "autre" : "project-page"}>
            <a href={`/projets`} className="left-button center-button"></a>
            {projectCategories.length > 0 ? (
              projectCategories.map((projet) => (
                <div
                  key={projet._id}
                  className={
                    projet.isLarge
                      ? "moodboard-content"
                      : "photographie-container"
                  }
                >
                  <img
                    src={`/${category}${projet.image}`}
                    alt=""
                    className={`photographie-element ${projet.isLarge ? "responcive-moodboard moodboard-element" : projet.isTall ? "zoom tall-responcive" : ""}`}
                  />
                  <a
                    href={`${window.location.href}/${projet._id}`}
                    className="responcive-link"
                  >
                    {" "}
                  </a>
                  <div className="photographie-text">
                    <a
                      href={`${window.location.href}/${projet._id}`}
                      className="calltoaction"
                    >
                      Voir plus
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p>En attente de la reucperation</p>
            )}
          </main>
          <Footer />
        </>
      ) : (
        <ErrorPage />
      )}
    </>
  );
}
