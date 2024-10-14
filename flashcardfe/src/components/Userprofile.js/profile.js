import React, { useEffect, useState } from "react";
import "./profile.css";
import { useSelector } from "react-redux";
import { FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import { getAllResultsByUser } from "../../service/ApiService";
import Select from "react-select"; // Import thư viện Select

const ViewProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [results, setResults] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null); // Thêm state cho môn học được chọn

  const user = useSelector((state) => state?.user?.account);

  // Load user profile data
  useEffect(() => {
    if (user) {
      setUserProfile(user);
      setEditedProfile(user);
      setLoading(false);
    } else {
      setError("User data not available");
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
      console.log(response); // Xem dữ liệu trả về từ API
      if (response && Array.isArray(response.results)) {
        setResults(response.results);
        const subjects = Array.from(new Set(response.results.map(result => 
          result.exam && result.exam.questionPack ? result.exam.questionPack.subject : null
        ).filter(subject => subject !== null))); // Lọc bỏ các giá trị null
        setSubjects(subjects.map(subject => ({ value: subject, label: subject })));
      } else {
        setError("No results found.");
      }
      setLoading(false);
    } catch (err) {
      console.error(err); // Log lỗi để kiểm tra
      setError("Failed to fetch results.");
      setLoading(false);
    }
  };
  
  

  const handleEditClick = () => {
    setIsEditing(!isEditing); // Toggle editing mode
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setUserProfile(editedProfile);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile((prevState) => ({
          ...prevState,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubjectChange = (selectedOption) => {
    setSelectedSubject(selectedOption);
  };

  const filteredResults = selectedSubject
  ? results.filter(result => 
      result.exam && 
      result.exam.questionPack && 
      result.exam.questionPack.subject === selectedSubject.value
  )
  : results;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container-profile">
      {/* Breadcrumb */}
      <div className="navbar-breadcrumb p-3 mb-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a href="/" className="breadcrum-userprofile-home">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Profile
            </li>
          </ol>
        </nav>
      </div>

      <div className="row">
        {/* Profile Section */}
        <div className="col-md-4">
          <div className="card text-center profile-card">
            <div className="card-body">
              <img
                src={editedProfile?.image || "https://via.placeholder.com/150"}
                alt="User Profile"
                className="profile-img"
              />
              {isEditing && (
                <div className="upload-btn-wrapper mt-2">
                  <button className="btn btn-secondary">
                    <FaUpload />
                  </button>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              )}
              {isEditing ? (
                <input
                  type="text"
                  className="form-control mt-3"
                  name="username"
                  value={editedProfile.username || ""}
                  onChange={handleInputChange}
                />
              ) : (
                <h4 className="card-title mt-3">{userProfile?.username}</h4>
              )}
              <p className="text-muted">{userProfile?.address}</p>
            </div>
          </div>
        </div>

        {/* Editable Information Section */}
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5>Contact Information</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <span>Full Name:</span>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={editedProfile.username || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span>{userProfile?.username}</span>
                    )}
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <span>Email:</span>
                    {isEditing ? (
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={editedProfile.email || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span>{userProfile?.email}</span>
                    )}
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <span>Phone:</span>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="phoneNumber"
                        value={editedProfile.phoneNumber || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span>{userProfile?.phoneNumber}</span>
                    )}
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <span>Address:</span>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={editedProfile.address || ""}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <span>{userProfile?.address}</span>
                    )}
                  </div>
                </li>
              </ul>
              <div className="mt-3 text-right">
                {isEditing ? (
                  <button className="btn btn-success" onClick={handleSave}>
                    Save
                  </button>
                ) : (
                  <button className="btn btn-warning" onClick={handleEditClick}>
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>



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
  {selectedSubject ? (
    filteredResults && filteredResults.length > 0 ? (
      <div className="row">
        {filteredResults.map((result, index) => (
          <div key={index} className="col-md-4">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">
                  {result?.exam?.questionPack?.subject || "Unknown Subject"}
                </h5>
                <p className="card-text">Score: {result?.score || "N/A"}</p>
                <p className="card-text">Exam Title: {result?.exam?.title || "Unknown Title"}</p>
                <p className="card-text">Exam Date: {result?.exam?.createdAt ? new Date(result.exam.createdAt).toLocaleDateString() : "Unknown Date"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div>No results found for this exam.</div>
    )
  ) : (
    <div>Please select a subject to view results.</div>
  )}
</div>


    </div>
  );
};

export default ViewProfile;
