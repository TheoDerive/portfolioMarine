"use client";

import React from "react";

import { redirectionAPI } from "../../utils/redirections.js";
import Nav from "../../component/Nav";
import Footer from "../../component/Footer";
import Loading from "../../component/Loading";
import "../../style/style.css";

export default function AllProjectCategory() {
  const [categories, setCategories] = React.useState([]);
  const [isLoad, setIsLoad] = React.useState(false);

  React.useEffect(() => {
    setIsLoad(true);

    async function fetchData() {
      try {
        const response = await fetch(redirectionAPI("/api/all-categories"));
        if (!response.ok) {
          throw new Error(
            "Une erreur est survenue lors de la récupération des données...",
          );
        }
        const data = await response.json();
        setCategories(data.filter((category) => category.content.length > 0));
        setIsLoad(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
        setIsLoad(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {isLoad ? <Loading isLoad={isLoad} /> : null}
      <Nav />
      <main id="projets">
        {categories.length > 0 ? (
          categories.map((categories) => (
            <article className="portfolio-categorie" key={categories._id}>
              <a
                href={`${window.location.href}/${categories.name.toLowerCase()}`}
                className="portfolio-categorie-link"
              ></a>
              <img
                src={`${categories.image}`}
                alt=""
                className="categorie-image"
              />
              <div className="categorie-content">
                <a
                  href={`${window.location.href}/${categories.name.toLowerCase()}`}
                  className="calltoaction"
                >
                  Voir plus
                </a>
              </div>
            </article>
          ))
        ) : (
          <p>Pas de project</p>
        )}
      </main>
      <Footer />
    </>
  );
}
