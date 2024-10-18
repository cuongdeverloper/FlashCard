import React, { useEffect, useState } from "react";
import "./profile.css";
import { useSelector } from "react-redux";

import { getAllResultsByUser } from "../../service/ApiService";
import Select from "react-select"; 
import ModalUpdateProfile from "./ModalUpdateProfile/ModalUpdateProfile";
import defaultImage from "../../../src/assests/avt.jpg"
const ViewProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showModal, setShowModal] = useState(false); // Replace setShowModal with setShow
  const handleEditClick = () => {
    setShowModal(true); // Use setShow to display the modal
  };

  const handleClose = () => {
    setShowModal(false); // Close modal
  };
  const user = useSelector((state) => state?.user?.account);

  // Load user profile data
  useEffect(() => {
    if (user) {
      setUserProfile(user);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [user]);

  // Fetch user exam results
  useEffect(() => {
    getResultOfUser();
  }, []);

  const getResultOfUser = async () => {
    try {
      let response = await getAllResultsByUser();
      console.log(response)
      if (response && Array.isArray(response.results)) {
        setResults(response.results);
        const subjects = Array.from(
          new Set(
            response.results
              .map((result) =>
                result.exam && result.exam.questionPack
                  ? result.exam.questionPack.subject
                  : null
              )
              .filter((subject) => subject !== null)
          )
        );
        setSubjects(
          subjects.map((subject) => ({ value: subject, label: subject }))
        );
      } else {
        setResults([]); // No results found but no error
      }
    } catch (err) {
      setResults([]); // Handle error but do not show it on the UI
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectChange = (selectedOption) => {
    setSelectedSubject(selectedOption);
  };

  const filteredResults = selectedSubject
    ? results.filter(
        (result) =>
          result.exam &&
          result.exam.questionPack &&
          result.exam.questionPack.subject === selectedSubject.value
      )
    : results;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-profile">
      {/* Breadcrumb */}
      <div className="navbar-breadcrumb p-3 mb-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a href="/" className="breadcrum-userprofile-home">
                Home
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Profile
            </li>
          </ol>
        </nav>
      </div>

      {/* User Profile */}
      <div className="profile-section">
  <div className="profile-info">
    <img src={userProfile?.image} alt="Profile" className="profile-avatar" />
    <p className="profile-name"><strong>{userProfile?.username || "N/A"}</strong></p>
  </div>
  
  <div className="contact-info">
    <p><strong>Full Name:</strong> {userProfile?.username || "N/A"}</p>
    <p><strong>Email:</strong> {userProfile?.email || "N/A"}</p>
          {/* Modal for editing profile */}
          <ModalUpdateProfile
            user={userProfile}
            showModal={showModal}
            handleClose={handleClose}
          />
        </div>
      </div>

      {/* Exam Results */}
      <div>
        <h2 className="text-white mt-4">Exam Results</h2>
        <Select
          value={selectedSubject}
          onChange={handleSubjectChange}
          options={subjects}
          isClearable={true}
          placeholder="Select a subject"
          className="mb-4"
        />
        {filteredResults && filteredResults.length > 0 ? (
          <div className="row">
            {filteredResults.map((result, index) => (
              <div key={index} className="col-md-4">
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">
                      {result?.exam?.questionPack?.subject || "Unknown Subject"}
                    </h5>
                    <p className="card-text">
                      Score: {result?.score || "N/A"}
                    </p>
                    <p className="card-text">
                      Exam Title: {result?.exam?.title || "Unknown Title"}
                    </p>
                    <p className="card-text">
                      Exam Date:{" "}
                      {result?.exam?.createdAt
                        ? new Date(result.exam.createdAt).toLocaleDateString()
                        : "Unknown Date"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No exam results found for this subject.</div>
        )}
      </div>
    </div>
  );
};

export default ViewProfile;
