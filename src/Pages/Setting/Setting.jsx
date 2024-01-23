import React, { useEffect, useRef, useState } from "react";
import "../../css/style/setting.css";
import Layout from "../../Components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../../Context/auth-context";
import { patchReq } from "../../lib/request";
import { actionTypes } from "../../Context/reducer";
export default function Setting() {
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();
  const [image, setImage] = useState();
  const [bioInput, setBioInput] = useState(user.bio);
  const previewRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    previewRef.current.style.backgroundImage = `url(${image || user.avatar})`;
  }, [image]);
  const handleImage = (e) => {
    const temppath = URL.createObjectURL(e.target.files[0]);
    setImage(temppath);
  };
  const handleBioChange = (e) => {
    setBioInput(e.target.value);
  };
  const handleSubmit = () => {
    if (image) {
      patchReq(`/users/${user.id}`, { avatar: image, bio: bioInput });
      dispatch({
        type: actionTypes.UPDATE,
        payload: {
          user: {
            id: user.id,
            avatar: image,
            bio: bioInput,
            username: user.username,
          },
        },
      });
    } else {
      patchReq(`/users/${user.id}`, { bio: bioInput });
      dispatch({
        type: actionTypes.UPDATE,
        payload: {
          user: { id: user.id, username: user.username, bio: bioInput },
        },
      });
    }
    navigate("/profile");
  };
  const handleLogout = () => {
    localStorage.removeItem("username");
    dispatch({
      type: actionTypes.LOGOUT,
    });
  };
  return (
    <Layout>
      <section className="setting-section container">
        <ul className="setting-option">
          <li className="back-arrow">
            <Link to="/profile">
              <ion-icon name="arrow-back-outline"></ion-icon>
            </Link>
          </li>
          <li>
            <p className="setting-header">Change avatar</p>
            <div className="avatar-upload">
              <div className="avatar-edit">
                <input
                  onChange={handleImage}
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                />
                <label htmlFor="imageUpload"></label>
              </div>
              <div className="avatar-preview">
                <div
                  ref={previewRef}
                  id="imagePreview"
                  role="img"
                  aria-label="avatar user"
                  className="image-preview"
                ></div>
              </div>
            </div>
          </li>
          <li>
            <label className="setting-header">Change Bio</label>
            <textarea
              onChange={handleBioChange}
              className="input-bio"
              rows="3"
              cols="50"
              placeholder="Write a bio of yourself for people who don't know you"
              value={bioInput}
            >
              {bioInput}
            </textarea>
          </li>
          <li className="save-setting">
            <button onClick={handleSubmit} className="save-change-btn">
              Save changes
            </button>
            <button onClick={handleLogout} className="logout">
              Log out
            </button>
          </li>
        </ul>
      </section>
    </Layout>
  );
}
