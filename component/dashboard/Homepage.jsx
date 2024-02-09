import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../component/Loading";
import axios from "axios";
import { getStates } from "@/utils/getStates";

export default function DashboardHomepage() {
  const [isLoad, setIsLoad] = React.useState(false);
  const {
    isConnected,
    modification,
    setModification,
    setDeleteProject,
    deleteProject,
  } = getStates();

  React.useEffect(() => {
    async function fetchData() {
      await axios
        .get(`https://marine-api.onrender.com/all-categories`)
        .then((res) => res.data)
        .then((data) => {
          setIsLoad(true);
          const promises = [];

          for (let i = 0; i < data.length; i++) {
            if (data[i].content.length > 0) {
              for (let j = 0; j < data[i].content.length; j++) {
                promises.push(data[i].content[j]);
              }
            }
          }

          return Promise.all(promises);
        })
        .then((allProjects) => {
          const comparerDates = (objet1, objet2) => {
            const date1 = new Date(objet1.date);
            const date2 = new Date(objet2.date);

            return date1 - date2; // Changement ici pour trier par ordre croissant
          };

          const sortedProjects = allProjects.sort(comparerDates);
          const fiveProject = sortedProjects.slice(0, 2);
          setAllProject(fiveProject);
          setIsLoad(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    fetchData();
  }, [modification, deleteProject]);

  return (
    <>
      {isLoad ? <Loading /> : null}
      <section className="hello-home">
        <div className="text">
          <h1>Bonjours Marine</h1>
          <p>Si tu as besoin de faire des modification, clique sur le bouton</p>

          <Link to="/dashboard/category" className="calltoaction-dashboard">
            Modifier mes projets
          </Link>
        </div>
        <img src="/Hello.svg" alt="" className={"hello-image"} />
      </section>

      <section className="panel-last-project">
        <h1 style={{ color: "#1E1E1E" }}>Dernier Projet</h1>
        <ul className="last-project-container">
          {allProject.map((projet) => (
            <article className="last-project">
              <img
                src={`/${projet.category}/${projet.image}`}
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
    </>
  );
}
