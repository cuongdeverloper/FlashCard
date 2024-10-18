import React, { useEffect, useState } from "react";
import "./myclass.scss";
import { Link } from "react-router-dom";
import { getClassById } from "../../service/ApiService"; 
const MyClass = () => {
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 


  const fetchClassData = async () => {
    try {
      const response = await getClassById();
      if (response && response.errorCode === 0) {
        setClassData(response.data);
      } else {
        setError("Không thể lấy dữ liệu lớp học");
      }
    } catch (err) {
      setError("");
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchClassData();
  }, []); 

  if (loading) {
    return <div>Đang tải dữ liệu...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  if (!classData || classData.length === 0) {
    return (
      <>
        <h2>Your class</h2>
        <h4>No class.</h4>
      </>
    );
  }

  return (
    <div className="my-classes">
      <h2>Lớp của bạn</h2>
      <div className="class-list">
        {classData.map((classItem) => (
          <div key={classItem._id} className="class-card">
            <h3>{classItem.name}</h3>
            <p>{classItem.location}</p>
            <div className="class-details">
              <span className="course-count">
                {classItem.courseCount} học phần
              </span>
              <span className="member-count">
                {classItem.memberCount} thành viên
              </span>
            </div>
            <Link to={`/classes/${classItem._id}`} className="class-link">
              Xem chi tiết
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClass;
