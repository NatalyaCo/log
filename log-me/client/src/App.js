import "./App.css";
import React from "react";
import "./index.css";
// import "./bootstrap.css";
// import 'bootswatch/dist/morph/bootstrap.min.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MainPage from "./components/MainPage/MainPage";
import LandingPage from "./components/pages/LandingPage/LandingPage";
import { BrowserRouter, Route } from "react-router-dom";
import ReminderForm from "./components/ReminderForm/ReminderForm";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";

const App = () => {
    <BrowserRouter>
    <Header />
    <main style={{ minHeight: "90vhv" }}>

    <Route path="/" component={LandingPage} exact />
    <Route path="/login" component={LoginPage} exact />
    <Route path="/register" component={RegisterPage} exact />
    <Route path="/reminders" component={() => <ReminderForm /> } /> 
 

    <MainPage />
 
    </main> 

<Footer /> 
</BrowserRouter>
    
};





    
 

export default App; 