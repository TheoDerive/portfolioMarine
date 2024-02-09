import React from "react";

export const getStates = () => {
  const [modification, setModification] = React.useState({});
  const [deleteProject, setDeleteProject] = React.useState({});
  const [isAdd, setIsAdd] = React.useState({});

  return {
    modification,
    setModification,
    deleteProject,
    setDeleteProject,
    isAdd,
    setIsAdd,
  };
};
