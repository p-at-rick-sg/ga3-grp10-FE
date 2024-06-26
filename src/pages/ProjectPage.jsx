import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Container, Grid, Paper } from "@mui/material";
import ProjectDetails from "../components/ProjectDetails";
import QandASection from "../components/QandASection";
import ProjectPictures from "../components/ProjectPictures";

const ProjectPage = () => {
  const { id } = useParams(); // extract project ID from URL
  const fetchData = useFetch();
  const [project, setProject] = useState(null); // init "project" as null

  useEffect(() => {
    const getProjectDetails = async () => {
      try {
        const res = await fetchData(`/api/projects/?projectID=${id}`, "GET");
        if (res.ok) {
          setProject(res.data);
        } else {
          console.error("Failed to fetch project details:", res.data);
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    getProjectDetails();
  }, [id]); // only re-run the effect if `id` changes

  if (!project) {
    return <div>Loading project details...</div>;
  }

  return (
    <Container maxWidth="xl">
      <Grid container spacing={1} marginTop={1}>
        <Grid container item spacing={2}>
          <Grid container item xs={12} md={5}>
            <Grid item xs={12}>
              <ProjectPictures
                selectedProjectID={id}
                projectOwner={project[0].owner}
              />
            </Grid>
          </Grid>

          <Grid container item spacing={3} xs={12} md={7}>
            <Grid item xs={12}>
              <ProjectDetails project={project} />
              <QandASection
                selectedProjectID={id}
                projectOwner={project[0].owner}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProjectPage;
