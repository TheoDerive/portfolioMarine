"use client";

import React from "react";

export default function Loading({ isLoad }) {
  React.useEffect(() => {
    let timeoutId;

    const performAction = () => {
      if (isLoad) {
        window.location.reload();
      }
    };

    timeoutId = setTimeout(performAction, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoad]);

  return <div id="loading"></div>;
}
