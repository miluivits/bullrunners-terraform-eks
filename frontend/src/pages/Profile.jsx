// Profile.js
import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import ProfileCard from "../components/ProfileCard";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (loading) return <p className="loading-text">Loading profile...</p>;
  if (!user) return <p className="loading-text">No user logged in.</p>;

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/users/${user.username}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        navigate("/");
      } else {
        alert("An error occurred while deleting your account.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete the account.");
    } finally {
      setDeleting(false);
      setShowModal(false);
    }
  }

  return (
    <div className="profile-page">
      <ProfileCard 
        user={user} 
        onTerminate={() => setShowModal(true)} 
      />

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Confirm Account Deletion</h2>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="modal-buttons">
              <button 
                className="profile-btn danger" 
                onClick={handleDelete} 
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete Account"}
              </button>
              <button 
                className="profile-btn" 
                onClick={() => setShowModal(false)}
                disabled={deleting}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
