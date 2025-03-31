"use client";

import { useState } from "react";
import styles from "./CreateDoctor.module.css";

const CreateDoctor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialty: "",
    experience: "",
    education: "",
    bio: "",
    consultation_fee: "",
    location: "",
    languages: "",
    gender: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/doctors`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create doctor");
      }

      alert("Doctor created successfully!");
      setFormData({
        name: "",
        email: "",
        specialty: "",
        experience: "",
        education: "",
        bio: "",
        consultation_fee: "",
        location: "",
        languages: "",
        gender: "",
        photo: null,
      });
    } catch (error) {
      console.error("Error creating doctor:", error);
      alert(error.message);
    }
  };

  return (
    <div className={styles.createDoctorContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          className={styles.inputText}
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          className={styles.inputText}
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          className={styles.inputText}
          name="specialty"
          placeholder="Specialty"
          value={formData.specialty}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          className={styles.inputText}
          name="experience"
          placeholder="Experience (Years)"
          value={formData.experience}
          onChange={handleChange}
          required
        />
     
        <input
          type="number"
          className={styles.inputText}
          name="consultation_fee"
          placeholder="Consultation Fee"
          value={formData.consultation_fee}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          className={styles.inputText}
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          className={styles.inputText}
          name="languages"
          placeholder="Languages (comma-separated)"
          value={formData.languages}
          onChange={handleChange}
        />
        <select
          name="gender"
          className={styles.selectText}
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="file"
          className={styles.fileUpload}
          name="photo"
          accept="image/*"
          onChange={handleFileChange}
          required
        />

        <button type="submit" className={styles.submitBtn}>
          Create Doctor
        </button>
      </form>
    </div>
  );
};

export default CreateDoctor;
