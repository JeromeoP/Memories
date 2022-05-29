import React  from 'react';
import {Container} from '@material-ui/core';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { gapi } from "gapi-script";
import PostDetails from './components/PostDetails/PostDetails';
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
    
      const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <BrowserRouter>
       <Container maxwidth="xl">
           <Navbar />
           <Routes>
               <Route path = "*" element={<Navigate to = "/posts" replace/>}/>
               <Route path = "/posts" element = {<Home />} />
               <Route path = "/posts/search" element = {<Home />} />
               <Route path = "/posts/:id" element = {<PostDetails />} />

               <Route path = "/auth" element={!user ? <Auth /> : <Navigate to = "/posts" replace/>}/>

           </Routes>
       </Container>
       </BrowserRouter>

    );
};

export default App;