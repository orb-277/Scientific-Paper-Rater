import axios from "axios";
import "./App.css";
//import { Card, CardContent} from '@material-ui/core';
import { NavBar } from "./NavBar";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@material-ui/core";
import PaperCard from "./PaperCard";
import { Grid, Container } from "@mui/material";
const PAPERS_URL = "http://localhost:5050/home/papers";

export default function UserView() {
  const [papers, setPapers] = useState([]);

  //console.log(papers);
  const handleDelete = (paperId) => {
    let PAPER_DELETE_URL = "http://localhost:5050/home/papers/delete";
    const token = localStorage.getItem("token");
    axios({
      method: "delete",
      url: PAPER_DELETE_URL,
      headers: { authorization: `Bearer ${token}` },
      data: { paper_id: paperId },
    })
      .then(function (response) {
        //handle success
        console.log(response);
        //navigate("/admin/userDetails");

        //window.location.reload();
        axios
          .get(PAPERS_URL, {
            headers: { authorization: `Bearer ${token}` },
          })
          .then((response) => {
            // update the state with the updated list of papers
            setPapers(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(function (response) {
        //handle error
        alert("Delete Failed");
        console.log(response);
      });
  };

  async function loadPapers() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const response = await axios
      .get(PAPERS_URL, {
        headers: { authorization: `Bearer ${token}` },
      })
      .catch((e) => {
        console.log(e);
      });
    const loadedArray = response.data; // extract the array data from the response object
    return loadedArray;
  }
  useEffect(() => {
    async function fetchData() {
      const loadedArray = await loadPapers();
      if(loadedArray.length==0){
        alert("No papers found, Add your first paper!");	
      }
      setPapers(loadedArray);
      console.log(loadedArray);
    }
    fetchData();
  }, []);
  const cardLoad = papers.map((paper) => {
    return <PaperCard paper={paper} handleDelete={handleDelete} />;
  });

  return (
    <Container>
      <NavBar />
      {/* <h2 style={{ color: "black" }}>Y</h2> */}

      {cardLoad}
    </Container>
  );
}
