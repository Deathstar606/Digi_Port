import React, { useEffect } from "react";
import Example from "./Navbar";
import HeroSec from "./HeroSec";
import Show from "./Test";
import Case from "./CaseStudies";
import Leaders from "./LeaderShip";
import Service from "./Services";
import ShowBrand from "./Brands";
import Footer from "./Footer";
import CaseDeats from "./CaseDetails";
import { LoadingComponent } from "./LoadinComponent";
import AdminComp from "./AdminComp";

import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { connect } from "react-redux";
import {
  fetchCases,
  fetchPeople,
  updateCase,
  deleteCase,
  updatePople,
  deletePeople,
  loginUser,
  logoutUser,
} from "../redux/ActionCreator";

const mapStateToProps = (state) => {
  return {
    cases: state.cases,
    people: state.people,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchCases: () => dispatch(fetchCases()),
  fetchPeople: () => dispatch(fetchPeople()),
  updateCase: (id, name, description) =>
    dispatch(updateCase(id, name, description)),
  deleteCase: (id) => dispatch(deleteCase(id)),
  updatePople: (_id, name, designation, description) =>
    dispatch(updatePople(_id, name, designation, description)),
  deletePeople: (_id) => dispatch(deletePeople(_id)),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
});

const Home = ({ ct, people }) => {
  return (
    <>
      <HeroSec />
      <Show />
      <Leaders leaders={people} />
      <Case casefile={ct} />
      <Service />
      <ShowBrand />
    </>
  );
};

const CaseId = (props) => {
  const { Id } = useParams();

  // Find the matching case by its MongoDB _id (string match)
  const deats = props.ct?.find((c) => c._id === Id) ?? null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <CaseDeats case={deats} />;
};

const Main = (props) => {
  useEffect(() => {
    props.fetchCases();
    props.fetchPeople();
  }, []);

  if (props.cases.isLoading || props.people.isLoading) {
    return <LoadingComponent />;
  }

  if (props.cases?.case?.length > 0 && props.people?.people?.length > 0) {
    return (
      <div>
        <Example />
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/home"
              element={
                <Home ct={props.cases.case} people={props.people.people} />
              }
            />
            <Route
              path="/home/:Id"
              element={<CaseId ct={props.cases.case} />}
            />
            <Route
              path="home/admin"
              element={
                <AdminComp
                  auth={props.auth}
                  cases={props.cases.case}
                  updateCase={props.updateCase}
                  deleteCase={props.deleteCase}
                  people={props.people.people}
                  updatePople={props.updatePople}
                  deletePeople={props.deletePeople}
                  loginUser={props.loginUser}
                  logoutUser={props.logoutUser}
                />
              }
            />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
