"use client";

import React from "react";
import { useParams } from "next/navigation";

import Nav from "@/component/Nav";
import Loading from "@/component/Loading";
import "@/style/style.css";
import { redirectionAPI } from "@/utils/redirections";
import varUtils from "@/utils/utilsVar";

export default function ShowProject() {
  const { category, id } = useParams();
  const [categories, setCategories] = React.useState(0);
  const [projet, setProjet] = React.useState(0);
  const [index, setIndex] = React.useState(0);
  const [isLoad, setIsLoad] = React.useState(false);

  React.useEffect(() => {
    setIsLoad(true);

    async function fetchData() {
      const response = await fetch(
        redirectionAPI(`/api/get-categorie/${category}`),
      );
      if (!response.ok) {
        throw new Error(
          "Il y a eu un problème lors de la récupération des données...",
        );
      }

      const data = await response.json();
      const filteredCategories = data.filter(
        (projet) => projet.name === category && projet.content.length > 0,
      );
      const filteredProject = filteredCategories[0].content.filter(
        (projet) => projet._id === id,
      );

      for (let i = 0; i < filteredCategories[0].length; i++) {
        if (
          filteredProject[0].name === filteredCategories[0].content[i].name &&
          filteredProject[0]._id === filteredCategories[0].content[i]._id
        ) {
          setIndex(i);
        }
      }

      setCategories(filteredCategories[0]);
      setProjet(filteredProject[0]);
      document.documentElement.classList.add("remove-overflow");
      setIsLoad(false);
    }

    fetchData();
  }, [category, id]);

  React.useEffect(() => {
    const imgContainer = document.querySelector(".img-container");
    const imgContent = document.querySelector("#project-image");
    const { windowWidth } = varUtils();

    imgContainer.addEventListener("mousemove", (e) => {
      let clientX = e.clientX - imgContainer.offsetLeft;
      let clientY = e.clientY - imgContainer.offsetTop;

      clientX = (clientX / imgContainer.offsetWidth) * 100;
      clientY = (clientY / imgContainer.offsetHeight) * 100;

      if (windowWidth > 800) {
        imgContent.style.transform = `translate(-${clientX}%, -${clientY}%) scale(2)`;
      }
    });

    imgContainer.addEventListener("mouseleave", () => {
      imgContent.style.transform = "translate(-50%, -50%) scale(1)";
    });
  }, []);

  function nextProjet() {
    if (index + 1 === categories.content.length) {
      const newProjet = categories.content[0];
      setProjet(newProjet);
      setIndex(0);
    } else {
      const newProjet = categories.content[index + 1];
      setProjet(newProjet);
      setIndex((prev) => prev + 1);
    }
  }

  function previousProjet() {
    if (index === 0) {
      const newProjet = categories.content[categories.content.length - 1];
      setProjet(newProjet);
      setIndex(categories.content.length - 1);
    } else {
      const newProjet = categories.content[index - 1];
      setProjet(newProjet);
      setIndex((prev) => prev - 1);
    }
  }

  return (
    <>
      {isLoad ? <Loading isLoad={isLoad} /> : null}
      <Nav />

      <main id="projet">
        <section className={`image-project-page`}>
          <button
            className="left-button"
            onClick={() => previousProjet()}
          ></button>
          <div className="img-container">
            <img
              src={`/${category}${projet.image}`}
              style={projet.isLarge ? { width: "100%", height: "unset" } : null}
              alt=""
              id="project-image"
            />
          </div>
          <button
            className="right-button"
            onClick={() => nextProjet()}
          ></button>
        </section>
        <section className="description-project-page">
          <h1 className=" title-project-page" id="project-title">
            {projet.name}
          </h1>

          <p id="project-description">{projet.description}</p>
        </section>
      </main>
    </>
  );
}
