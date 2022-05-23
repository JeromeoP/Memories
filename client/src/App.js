import React  from 'react';
import {Container} from '@material-ui/core';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { gapi } from "gapi-script";

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
    gapi.load("client:auth2", () => {
        gapi.client.init({
          clientId:
            "977953374598-phtp1rho9h4fn71d0ettf90gnku0dn2d.apps.googleusercontent.com",
          plugin_name: "chat",
        });
      });
    
      
    return (
        <BrowserRouter>
       <Container maxwidth="lg">
           <Navbar />
           <Routes>
               <Route path = "/" element={<Home />}/>
               <Route path = "/auth" element={<Auth />}/>

           </Routes>
       </Container>
       </BrowserRouter>

    );
};

export default App;