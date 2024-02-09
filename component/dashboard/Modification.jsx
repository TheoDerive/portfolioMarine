"use client";

import React from "react";

import { redirectionAPI } from "@/utils/redirections";

export function AddPage({ isAdd, setIsAdd }) {
  const [projet, setProjet] = React.useState({});
  async function submitNewProjet(e) {
    e.preventDefault();

    try {
      await fetch(redirectionAPI(`/api/new-project`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          nameCategory: isAdd.category,
          nameProject: projet.name,
          imageProject: projet.image,
          descriptionProject: projet.description,
          dateProjet: projet.date,
          isLarge: projet.isLarge,
          isTall: projet.isTall,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
      setTimeout(() => {
        setIsAdd({});
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }

  async function submitNewCategorie(e) {
    e.preventDefault();

    await fetch(redirectionAPI(`/api/new-category`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        nameCategory: projet.name,
        imageCategory: projet.image,
      }),
    });

    setTimeout(() => {
      setIsAdd({});
    }, 1000);
  }

  return (
    <>
      {Object.keys(isAdd).length > 0 ? (
        isAdd.type === "projet" ? (
          <>
            <div className="background"></div>
            <section className="edit-project">
              <span
                className="cross-dashboard"
                onClick={() => setIsAdd({})}
              ></span>
              <h2 style={{ color: "#1E1E1E" }}>Nouveau projet</h2>
              <form onSubmit={(e) => submitNewProjet(e)}>
                <div>
                  <p>Nom du projet:</p>
                  <input
                    type="text"
                    placeholder="Nom du projet"
                    value={projet.name}
                    onChange={(e) =>
                      setProjet((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <p>Image du projet: </p>
                  <input
                    type="text"
                    placeholder="Nom de l'image"
                    value={projet.image}
                    onChange={(e) =>
                      setProjet((prev) => ({
                        ...prev,
                        image: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <p>Description du projet: </p>
                  <textarea
                    placeholder="Description du projet"
                    value={projet.description}
                    onChange={(e) =>
                      setProjet((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <p>Date du projet: </p>
                  <input
                    type="date"
                    placeholder="Date du projet"
                    value={projet.date}
                    onChange={(e) =>
                      setProjet((prev) => ({
                        ...prev,
                        date: new Date(e.target.value),
                      }))
                    }
                  />
                </div>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    placeholder="Nom de l'image"
                    checked={projet.isLarge}
                    onChange={(e) =>
                      setProjet((prev) => ({
                        ...prev,
                        isLarge: e.target.checked,
                      }))
                    }
                  />
                  <p>L'image, est-elle large ?</p>
                </div>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    placeholder="Nom de l'image"
                    checked={projet.isTall}
                    onChange={(e) =>
                      setProjet((prev) => ({
                        ...prev,
                        isTall: e.target.checked,
                      }))
                    }
                  />
                  <p>L'image, est-elle haute ?</p>
                </div>

                <button type={"submit"}>Envoyer</button>
              </form>
            </section>
          </>
        ) : (
          <>
            <div className="background"></div>
            <section className="edit-project">
              <span
                className="cross-dashboard"
                onClick={() => setIsAdd({})}
              ></span>
              <h2 style={{ color: "#1E1E1E" }}>Nouvelle categorie</h2>
              <form onSubmit={(e) => submitNewCategorie(e)}>
                <div>
                  <p>Nom de la categorie:</p>
                  <input
                    type="text"
                    placeholder="Nom du projet"
                    value={projet.name}
                    onChange={(e) =>
                      setProjet((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <p>Image de la categorie: </p>
                  <input
                    type="text"
                    placeholder="Nom de l'image"
                    value={projet.image}
                    onChange={(e) =>
                      setProjet((prev) => ({
                        ...prev,
                        image: e.target.value,
                      }))
                    }
                  />
                </div>
                <button type={"submit"}>Envoyer</button>
              </form>
            </section>
          </>
        )
      ) : null}
    </>
  );
}

export default function ModificationPage({ modification, setModification }) {
  const [projet, setProjet] = React.useState({});
  const [oldProjet, setOldProjet] = React.useState({});
  React.useEffect(() => {
    setProjet(modification);
    setOldProjet(modification);
  }, [modification]);

  async function submitEditProjet(e) {
    e.preventDefault();

    await fetch(redirectionAPI(`/api/update-project`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        nameCategory: projet.category,
        oldProjectName: oldProjet.name,
        oldProjectImage: oldProjet.image,
        oldProjectDescription: oldProjet.description,
        oldProjectDate: oldProjet.date,
        oldProjetIsTall: oldProjet.isTall,
        oldProjetIsLarge: oldProjet.isLarge,
        newProjectName: projet.name,
        newProjectImage: projet.image,
        newProjectDescription: projet.description,
        newProjectDate: projet.date,
        newProjetIsTall: projet.isTall,
        newProjetIsLarge: projet.isLarge,
      }),
    });
    setTimeout(() => {
      setModification({});
    }, 1000);
  }

  async function submitEditCategorie(e) {
    e.preventDefault();

    await fetch(redirectionAPI(`/api/update-category`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        oldCategoryName: oldProjet.name,
        newCategoryName: projet.name,
        newCategoryImage: projet.image,
      }),
    });
    setTimeout(() => {
      setModification({});
    }, 1000);
  }

  return (
    <>
      {Object.keys(projet).length > 0 ? (
        modification.type === "projet" ? (
          <>
            <div className="background"></div>
            <section className="edit-project">
              <span
                className="cross-dashboard"
                onClick={() => setModification({})}
              ></span>
              <h2 style={{ color: "#1E1E1E" }}>Modifié un projet</h2>
              <form onSubmit={(e) => submitEditProjet(e)}>
                <div>
                  <p>Nom du projet:</p>
                  <input
                    type="text"
                    placeholder="Nom du projet"
                    value={projet.name}
                    onChange={(e) =>
                      setProjet((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <p>Image du projet: </p>
                  <input
                    type="text"
                    placeholder="Nom de l'image"
                    value={projet.image}
                    onChange={(e) =>
                      setProjet((prev) => ({
                        ...prev,
                        image: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <p>Description du projet: </p>
                  <textarea
                    placeholder="Description du projet"
                    value={projet.description}
                    onChange={(e) =>
                      setProjet((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <p>Date du projet: </p>
                  <input
                    type="date"
                    placeholder="Date du projet"
                    value={projet.date}
                    onChange={(e) =>
                      setProjet((prev) => ({
                        ...prev,
                        date: new Date(e.target.value),
                      }))
                    }
                  />
                </div>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    placeholder="Nom de l'image"
                    checked={projet.isLarge}
                    onChange={(e) =>
                      setProjet((prev) => ({
                        ...prev,
                        isLarge: e.target.checked,
                      }))
                    }
                  />
                  <p>L'image, est-elle large ?</p>
                </div>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    placeholder="Nom de l'image"
                    checked={projet.isTall}
                    onChange={(e) =>
                      setProjet((prev) => ({
                        ...prev,
                        isTall: e.target.checked,
                      }))
                    }
                  />
                  <p>L'image, est-elle haute ?</p>
                </div>

                <button type={"submit"}>Envoyer</button>
              </form>
            </section>
          </>
        ) : (
          <>
            <div className="background"></div>
            <section className="edit-project">
              <span
                className="cross-dashboard"
                onClick={() => setModification({})}
              ></span>
              <h2 style={{ color: "#1E1E1E" }}>Modifié une categorie</h2>
              <form onSubmit={(e) => submitEditCategorie(e)}>
                <div>
                  <p>Nom de la categorie:</p>
                  <input
                    type="text"
                    placeholder="Nom du projet"
                    value={projet.name}
                    onChange={(e) =>
                      setProjet((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <p>Image de la categorie: </p>
                  <input
                    type="text"
                    placeholder="Nom de l'image"
                    value={projet.image}
                    onChange={(e) =>
                      setProjet((prev) => ({
                        ...prev,
                        image: e.target.value,
                      }))
                    }
                  />
                </div>
                <button type={"submit"}>Envoyer</button>
              </form>
            </section>
          </>
        )
      ) : null}
    </>
  );
}

export function DeletePage({ deleteProject, setDeleteProject }) {
  const [projet, setProjet] = React.useState({});
  const [elementNameToDelete, setElementNameToDelete] = React.useState("");
  React.useEffect(() => {
    setProjet(deleteProject);
  }, [deleteProject]);

  async function submitDeleteProjet(e) {
    e.preventDefault();

    if (projet.name === elementNameToDelete) {
      const res = await fetch(redirectionAPI(`/api/delete-project/`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          nameCategory: projet.category,
          nameProject: projet.name,
          imageProject: projet.image,
          descriptionProject: projet.description,
        }),
      });

      setTimeout(() => {
        setDeleteProject({});
      }, 1000);
    }
  }

  async function submitDeleteCategorie(e) {
    e.preventDefault();

    if (projet.name === elementNameToDelete) {
      try {
        await fetch(redirectionAPI(`/api/delete-category/${projet.name}`));

        setTimeout(() => {
          setDeleteProject({});
        }, 1000);
      } catch (error) {
        console.error("Erreur lors de la requête :", error);
        // Gérez l'erreur en conséquence
      }
    }
  }

  return (
    <>
      {Object.keys(projet).length > 0 ? (
        projet.type === "projet" ? (
          <>
            <div className="background"></div>
            <section className="delete-project">
              <span
                className="cross-dashboard"
                onClick={() => setDeleteProject({})}
              ></span>
              <h2 style={{ color: "#1E1E1E" }}>Supprimer ton projet:</h2>
              <form onSubmit={(e) => submitDeleteProjet(e)}>
                <div>
                  <p>
                    Pour valider la suppression de votre projets, veuillez
                    entrez son nom:
                  </p>
                  <input
                    type="text"
                    placeholder={projet.name}
                    onChange={(e) => setElementNameToDelete(e.target.value)}
                  />
                </div>
                <button type={"submit"}>Envoyer</button>
              </form>
            </section>
          </>
        ) : (
          <>
            <div className="background"></div>
            <section className="delete-project">
              <span
                className="cross-dashboard"
                onClick={() => setDeleteProject({})}
              ></span>
              <h2 style={{ color: "#1E1E1E" }}>Modifié une categorie</h2>
              <form onSubmit={(e) => submitDeleteCategorie(e)}>
                <div>
                  <p>
                    Pour valider la suppression de votre catégorie, et tous les
                    projets qui lui sont assimilé, veuillez entrez son nom:
                  </p>
                  <input
                    type="text"
                    placeholder={projet.name}
                    onChange={(e) => setElementNameToDelete(e.target.value)}
                  />
                </div>
                <button type={"submit"}>Envoyer</button>
              </form>
            </section>
          </>
        )
      ) : null}
    </>
  );
}
