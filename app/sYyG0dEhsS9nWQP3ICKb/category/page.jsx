"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import { NavDashboard } from "@/component/Nav";
import Loading from "@/component/Loading";
import Login from "@/component/login";
import ModificationPage, {
  DeletePage,
  AddPage,
} from "@/component/dashboard/Modification";
import { redirectionAPI } from "@/utils/redirections";

export default function () {
  const [categories, setCategories] = React.useState([]);
  const [isConnected, setIsConnected] = React.useState(false);
  const [isLoad, setIsLoad] = React.useState(true);
  const [modification, setModification] = React.useState({});
  const [deleteProject, setDeleteProject] = React.useState({});
  const [isAdd, setIsAdd] = React.useState({});

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(redirectionAPI(`/api/all-categories`));
      const data = await res.json();
      setCategories(data);
      setIsLoad(false);
    }

    fetchData();
  }, [modification, deleteProject, isAdd]);

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
          <AddPage isAdd={isAdd} setIsAdd={setIsAdd} />
          <NavDashboard />

          <main id={"dashboard-content"}>
            <ul className="categorie-container">
              {categories.map((categorie) => (
                <li key={categorie._id} className="categorie">
                  <div className="categorie-information">
                    <p style={{ display: "flex", alignItems: "center" }}>
                      <span
                        style={{
                          fontSize: "10px",
                          color: "#1E1E1E",
                          marginRight: "5px",
                        }}
                      >
                        ●
                      </span>
                      {categorie.name}
                    </p>
                    <div className="action">
                      <FontAwesomeIcon
                        className={"modify"}
                        icon={faPenToSquare}
                        onClick={() =>
                          setModification({
                            ...categorie,
                            type: "categorie",
                          })
                        }
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() =>
                          setDeleteProject({
                            ...categorie,
                            type: "categorie",
                          })
                        }
                      />
                    </div>
                  </div>

                  <ul className="projet-container">
                    {categorie.content.map((projet) => (
                      <article className="project">
                        <span>{projet.name}</span>

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
                    <article
                      className="project"
                      onClick={() =>
                        setIsAdd({
                          show: true,
                          type: "projet",
                          category: categorie.name,
                        })
                      }
                    >
                      <span style={{ cursor: "pointer" }}>Nouveau projet</span>
                    </article>
                  </ul>
                </li>
              ))}

              <li>
                <div
                  className="categorie-information"
                  onClick={() => setIsAdd({ show: true, type: "categorie" })}
                >
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#1E1E1E",
                        marginRight: "5px",
                      }}
                    >
                      {"->"}
                    </span>
                    Nouvelle catégorie
                  </p>
                </div>
              </li>
            </ul>
          </main>
        </section>
      ) : (
        <Login setIsConnected={setIsConnected} />
      )}
    </>
  );
}
