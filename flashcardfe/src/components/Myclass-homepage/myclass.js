import React, { useEffect, useState } from 'react';
import './myclass.scss';
import { Link } from 'react-router-dom';
import { getClassById } from '../../service/ApiService'; // Import API service


const MyClass = () => {
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true); // Để kiểm tra trạng thái loading
  const [error, setError] = useState(null); // Để lưu lỗi nếu có


  // Gọi API để lấy dữ liệu lớp học
  const fetchClassData = async () => {
    try {
      const response = await getClassById();
      if (response && response.errorCode === 0) {
        setClassData(response.data);
      } else {
        setError('Không thể lấy dữ liệu lớp học');
      }
    } catch (err) {
      setError('');
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi component được mount
  useEffect(() => {
    fetchClassData();
  }, []); // Chạy một lần khi component được load

  if (loading) {
    return <div>Đang tải dữ liệu...</div>; // Hiển thị khi dữ liệu đang được tải
  }

  if (error) {
    return <div>{error}</div>; // Hiển thị lỗi nếu có
  }

  if (!classData || classData.length === 0) {
    return (
    <>
            <h2 style={{ margin: '10px 20px', color: 'white', fontWeight: 700 }}>Lớp của bạn</h2>
      <div style={{ margin: '10px 30px', color: 'white', fontWeight: 700 }}>
        Không có lớp học nào.
      </div>
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
              <span className="course-count">{classItem.courseCount} học phần</span>
              <span className="member-count">{classItem.memberCount} thành viên</span>
            </div>
            <Link to={`/classes/${classItem._id}`} className="class-link">Xem chi tiết</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClass;
