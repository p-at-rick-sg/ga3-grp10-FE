import React, { useState, useEffect, useRef } from "react";
import useFetch from "../hooks/useFetch";
import LandingPage from "../pages/LandingPage";
import { Title } from "@mui/icons-material";
import { format } from "date-fns";

const HomeCard = () => {
  const [projects, setProjects] = useState([]);
  const fetchData = useFetch();

  const getProjects = async () => {
    try {
      const res = await fetchData("/api/projects", "GET", undefined, undefined);

      if (res.ok) {
        setProjects(res.data);
        console.log(`Projects fetched successfully`);
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <div className="grid w-full gap-10 grid-cols-3">
        {projects.map((project) => (
          <div className="bg-white w-full rounded-lg shadow-md flex flex-col transition-all overflow-hidden hover:shadow-2xl">
            <div className="  p-6">
              <div className="pb-3 mb-4 border-b border-stone-200 text-xs font-medium flex justify-between text-blue-900">
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  {project.createdDate
                    ? format(new Date(project.createdDate), "dd/MM/yyyy")
                    : "Unknown Date"}{" "}
                </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                    />
                  </svg>
                </span>
              </div>
              <h3 className="mb-4 font-semibold  text-2xl">
                <a
                  href=""
                  className="transition-all text-blue-900 hover:text-blue-600"
                >
                  {project.title}
                </a>
              </h3>
              <p className="text-sky-800 text-sm mb-0">{project.description}</p>
            </div>
            <div className="mt-auto">
              <img
                src={project.images[0].URL}
                alt=""
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeCard;
