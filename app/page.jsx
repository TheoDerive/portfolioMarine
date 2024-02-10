"use client";

import React from "react";

import { redirectionAPI } from "../utils/redirections.js";
import Nav from "../component/Nav";
import Footer from "../component/Footer";
import Loading from "../component/Loading";
import "../style/style.css";
import useWindowDimensions from "@/utils/utilsVar.js";

export default function Homepage() {
  const [allProject, setAllProject] = React.useState([]);
  const [isLoad, setIsLoad] = React.useState(true);
  const { windowWidth, windowHeight } = useWindowDimensions();

  React.useEffect(() => {
    setIsLoad(true);

    async function fetchData() {
      try {
        const response = await fetch(redirectionAPI("/api/all-categories"), {
          method: "GET",
          mode: "cors",
        });
        if (!response.ok) {
          throw new Error(
            "Une erreur est survenue lors de la récupération des données.",
          );
        }
        const data = await response.json();
        const promises = [];

        for (let i = 0; i < data.length; i++) {
          if (data[i].content.length > 0) {
            for (let j = 0; j < data[i].content.length; j++) {
              promises.push(data[i].content[j]);
            }
          }
        }

        const allProjects = await Promise.all(promises);

        const comparerDates = (objet1, objet2) => {
          const date1 = new Date(objet1.date);
          const date2 = new Date(objet2.date);

          return date1 - date2; // Changement ici pour trier par ordre croissant
        };

        const sortedProjects = allProjects.sort(comparerDates);
        const fiveProject = sortedProjects.slice(0, 5);
        setAllProject(fiveProject);
        document.documentElement.classList.add("remove-overflow");
        setIsLoad(false);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  React.useEffect(() => {
    let allProject = document.querySelectorAll(".project-content");
    const animationContainer = document.querySelector(".projects");

    for (let i = 0; i < allProject.length; i++) {
      const element = allProject[i];

      element.addEventListener("mouseenter", () => {
        animationContainer.classList.add("paused");
      });

      element.addEventListener("mouseleave", () => {
        animationContainer.classList.remove("paused");
      });
    }
  });

  React.useEffect(() => {
    let allProject = document.querySelectorAll(".project-content");
    const leftImage = document.querySelector(".left");
    const title = document.querySelectorAll(".title");
    const titleAcceuil = document.querySelector(".acceuil-title");
    const paragraphePresentation = document.querySelector(
      ".paragraph-presentation",
    );
    const competanceContainer = document.querySelector(".competance-container");
    const competanceLogo = document.querySelectorAll(".logo-competence");
    const callToAction = document.querySelectorAll(".calltoaction");
    const footer = document.querySelector(".footer-container");

    const windowSizeParagraphe = () => {
      if (windowWidth > 1000) {
        return 2900;
      } else {
        return 1500;
      }
    };

    const windowSizeTitle = () => {
      if (windowWidth > 1000) {
        return 1900;
      } else {
        return 400;
      }
    };

    if (isLoad === false) {
      setTimeout(() => {
        leftImage.style.transform = "translateX(0)";
      }, 1000);

      setTimeout(() => {
        titleAcceuil.classList.add("title-remove");
      }, windowSizeTitle());

      setTimeout(() => {
        paragraphePresentation.style.opacity = "1";
      }, windowSizeParagraphe());
    }

    function loadAnimation(pourcentage) {
      allProject = document.querySelectorAll(".project-content");

      if (pourcentage >= 43) {
        competanceContainer.classList.add("competance-anim");
        competanceLogo.forEach((logo) => {
          logo.style.opacity = "1";
        });
      }

      if (windowWidth < 750) {
        if (pourcentage >= 48) {
          title[0].classList.add("title-remove");
          callToAction[0].classList.add("calltoaction-animation");
        }
      } else {
        if (pourcentage >= 47) {
          title[0].classList.add("title-remove");
          callToAction[0].classList.add("calltoaction-animation");
        }
      }

      if (pourcentage >= 57) {
        for (let i = 0; i < allProject.length; i++) {
          const element = allProject[i];

          element.classList.add("project-content-animation");
        }
      }

      if (pourcentage >= 92) {
        title[0].classList.add("title-remove");
        callToAction[callToAction.length - 1].classList.add(
          "calltoaction-animation",
        );
      }
      if (pourcentage >= 98) {
        footer.classList.add("footer-container-animation");
      }
    }

    function handleLoad() {
      const scroll = window.scrollY;
      const pageHeight = document.querySelector("html").offsetHeight;

      const pourcentage = Math.round(
        ((scroll + windowHeight) / pageHeight) * 100,
      );
      const windowSize = () => {
        if (windowWidth > 1000) {
          return 1300;
        } else {
          return 500;
        }
      };

      setTimeout(() => {
        loadAnimation(pourcentage);
      }, windowSize());
    }

    function handleScroll() {
      const scroll = window.scrollY;
      const pageHeight = document.querySelector("html").offsetHeight;

      const pourcentage = Math.round(
        ((scroll + windowHeight) / pageHeight) * 100,
      );

      loadAnimation(pourcentage);
    }

    window.addEventListener("load", handleLoad);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoad]);

  return (
    <>
      {isLoad ? <Loading isLoad={isLoad} /> : null}
      <Nav />
      <main>
        <section className="presentation">
          <div className="left">
            <img src={`/Marine2.png`} alt="" />
          </div>
          <div className="presentation-container">
            <h1 className="acceuil-title">Bienvenue sur mon portfolio</h1>

            <p className="paragraph-presentation" style={{ width: "88%" }}>
              {" "}
              Bonjour, je m’appelle Marine Sicaud. Depuis mon plus jeune âge,
              j'ai toujours eu une âme créative, fascinée par l’art et la
              manière dont les images pouvaient évoquer une émotion ou susciter
              une réflexion profonde . De nature curieuse, mon intérêt pour
              l’art a vu le jour lorsque les crayons et les pinceaux étaient mes
              compagnons constants, et ou chaque coin de la maison était
              transformé en un atelier d'art. Cette créativité innée a tissé les
              bases de mon intérêt pour l'expression visuelle qui a évoluée au
              fil des années.
              <br /> <br />
              La photographie est pour moi un moyen puissant d'exprimer ma
              créativité en capturant des moments uniques qui évoquent des
              émotions intenses. Lorsque je prends un appareil photo entre mes
              mains, je suis transportée dans un monde où la beauté se trouve
              dans chaque coin de rue, dans chaque visage et dans chaque
              paysage.
            </p>
          </div>
        </section>

        <section className="competance">
          <div className="competance-container">
            <div className="logo-competence">
              <img src={`/photoshop.png`} alt="" />
              <p className="title-compétance">Photoshop</p>
            </div>
            <div className="logo-competence">
              <img src={`/illstrator.png`} alt="" />
              <p className="title-compétance">Illustrator</p>
            </div>
            <div className="logo-competence">
              <img src={`/XD.png`} alt="" />
              <p className="title-compétance">Adoble XD</p>
            </div>
            <div className="logo-competence">
              <img src={`/InDesign.png`} alt="" />
              <p className="title-compétance">InDesign</p>
            </div>
            <div className="logo-competence">
              <img src={`/procreate.jpg`} alt="" />
              <p className="title-compétance">Procreate</p>
            </div>
            <div className="logo-competence">
              <img src={`/canvas.png`} alt="" />
              <p className="title-compétance">Canva</p>
            </div>
          </div>
        </section>

        <section className="project-section">
          <h2 className="title">Une infime partie de mes projets</h2>

          <a href={`/projets`} className="calltoaction">
            Voir mes projets
          </a>

          <div className="project-container">
            <ul className="projects">
              {allProject.length > 0
                ? allProject.map((project) => (
                    <article className="project-content" key={project._id}>
                      <a
                        href={`/projets/${project.category.toLowerCase()}/${project._id}`}
                        className="project-content-link"
                      >
                        {" "}
                      </a>
                      <img
                        src={`/${project.category.toLowerCase()}${project.image}`}
                        alt=""
                      />
                      <div className="name-project">
                        <a
                          href={`/projets/${project.category.toLowerCase()}/${project._id}`}
                          className="calltoaction"
                        >
                          Voir le projet
                        </a>
                      </div>
                    </article>
                  ))
                : null}
              {allProject.length > 0
                ? allProject.map((project) => (
                    <article className="project-content" key={project._id}>
                      <a
                        href={`/projets/${project.category}/${project._id}`}
                        className="project-content-link"
                      >
                        {" "}
                      </a>
                      <img
                        src={`/${project.category}/${project.image}`}
                        alt=""
                      />
                      <div className="name-project">
                        <a
                          href={`/projets/${project.category}/${project._id}`}
                          className="calltoaction"
                        >
                          Voir le projet
                        </a>
                      </div>
                    </article>
                  ))
                : null}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
