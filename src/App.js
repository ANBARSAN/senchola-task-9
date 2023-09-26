import React from "react";
import {Container} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "./pages/Pagination";



const App = () => {
    return(
        <Container>
          <Pagination/>
        </Container>
    );
};

export default App;