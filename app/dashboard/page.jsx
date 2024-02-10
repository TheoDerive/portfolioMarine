"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import Loading from "@/component/Loading";
import { redirectionAPI } from "@/utils/redirections";
import Login from "@/component/login";
import "@/style/style-dashboard.css";
import ModificationPage, {
  DeletePage,
} from "@/component/dashboard/Modification";
import { NavDashboard } from "@/component/Nav";

export default function DashboardHomepage() {
  const [allProject, setAllProject] = React.useState([]);
  const [isLoad, setIsLoad] = React.useState(false);
  const [isConnected, setIsConnected] = React.useState(false);
  const [modification, setModification] = React.useState({});
  const [deleteProject, setDeleteProject] = React.useState({});

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch(redirectionAPI(`/api/all-categories`), {
        method: "GET",
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error(
          "Il y a eu un problème dans la récupératio des informations...",
        );
      }

      const data = await response.json();

      setIsLoad(true);
      const promises = [];

      for (let i = 0; i < data.length; i++) {
        if (data[i].content.length > 0) {
          for (let j = 0; j < data[i].content.length; j++) {
            promises.push(data[i].content[j]);
          }
        }
      }
      const allProjects = promises;

      const comparerDates = (objet1, objet2) => {
        const date1 = new Date(objet1.date);
        const date2 = new Date(objet2.date);

        return date1 - date2; // Changement ici pour trier par ordre croissant
      };

      const sortedProjects = allProjects.sort(comparerDates);
      const fiveProject = sortedProjects.slice(0, 2);
      setAllProject(fiveProject);
      setIsLoad(false);
    }
    fetchData();
  }, [modification, deleteProject]);

  return (
    <>
      {isLoad ? <Loading /> : null}

      {isConnected ? (
        <section id="dashboard">
          <ModificationPage
            modification={modification}
            setModification={setModification}
          />
          <DeletePage
            deleteProject={deleteProject}
            setDeleteProject={setDeleteProject}
          />
          <NavDashboard />

          <main id={"dashboard-content"}>
            <section className="hello-home">
              <div className="text">
                <h1>Bonjours Marine</h1>
                <p>
                  Si tu as besoin de faire des modification, clique sur le
                  bouton
                </p>

                <a
                  href="/dashboard/category"
                  className="calltoaction-dashboard"
                >
                  Modifier mes projets
                </a>
              </div>
              <img src="/Hello.svg" alt="" className={"hello-image"} />
            </section>

            <section className="panel-last-project">
              <h1 style={{ color: "#1E1E1E" }}>Dernier Projet</h1>
              <ul className="last-project-container">
                {allProject.map((projet) => (
                  <article className="last-project">
                    <img
                      src={`/${projet.category.toLowerCase()}/${projet.image}`}
                      alt={projet.name}
                    />
                    <span className="projet-date" style={{ color: "#1E1E1E" }}>
                      {new Date(projet.date).toLocaleDateString("fr-FR", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>

                    <div className="action">
                      <FontAwesomeIcon
                        className={"modify"}
                        icon={faPenToSquare}
                        onClick={() =>
                          setModification({
                            ...projet,
                            type: "projet",
                          })
                        }
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() =>
                          setDeleteProject({
                            ...projet,
                            type: "projet",
                          })
                        }
                      />
                    </div>
                  </article>
                ))}
              </ul>
            </section>
          </main>
        </section>
      ) : (
        <Login setIsConnected={setIsConnected} />
      )}
    </>
  );
}
