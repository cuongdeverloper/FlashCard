import React, { useEffect, useState } from "react";
import "./profile.css";
import { getUserId, getUserByUserId } from '../../service/ApiService';

const ViewProfile = (props) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm để lấy user profile khi component load
  const fetchUserProfile = async () => {
    try {
      // Lấy userId bằng cách chờ kết quả từ getUserId
      const userIdResponse = await getUserId();
      const userId = userIdResponse.data.userId; // Sử dụng data trong phản hồi

      // Kiểm tra nếu userId tồn tại, sau đó gọi API để lấy thông tin người dùng
      if (userId) {
        const userDataResponse = await getUserByUserId(userId);
        setUserProfile(userDataResponse.data); // Lưu dữ liệu người dùng vào state
      } else {
        setError("User ID not found.");
      }
    } catch (err) {
      setError("Error fetching user profile.");
    } finally {
      setLoading(false); // Tắt trạng thái loading
    }
  };

  // Dùng useEffect để gọi hàm fetchUserProfile khi component mount
  useEffect(() => {
    fetchUserProfile();
  }, []); // Chỉ chạy một lần khi component được render lần đầu

  // Nếu đang tải, hiển thị spinner hoặc thông báo
  if (loading) {
    return <div>Loading...</div>;
  }

  // Nếu có lỗi, hiển thị thông báo lỗi
  if (error) {
    return <div>{error}</div>;
  }

  // Hiển thị thông tin người dùng nếu dữ liệu đã được tải
  return (
    <div className="profile-container">
      <div className="card profile-card">
        <div className="card-body text-center">
          <img src={userProfile.image} alt="User Profile" className="profile-img" />
          <h4 className="card-title mt-3">{userProfile.username}</h4>
          <p className="card-text">{userProfile.bio}</p>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <h5>Contact Information</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Email: {userProfile.email}</li>
            <li className="list-group-item">Phone: {userProfile.phoneNumber}</li>
            <li className="list-group-item">Address: {userProfile.address}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
