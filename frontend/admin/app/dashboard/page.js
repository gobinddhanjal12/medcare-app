"use client";

import { useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import { AppointmentCard } from "../components/AppointmentCard/AppointmentCard";
import Pagination from "../components/Pagination/Pagination";
import CreateDoctor from "../components/CreateDoctor/CreateDoctor";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState("pending");
  const itemsPerPage = 12;

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/appointments/pending?page=${currentPage}&limit=${itemsPerPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch");
      }

      setAppointments(data.data || []);
      setTotalPages(data.pagination.pages || 1);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "pending") {
      fetchAppointments();
    }
  }, [currentPage, activeTab]);

  return (
    <div className="container">
      <div className={styles.dashboard}>
        <div className={styles.left}>
          <button
            className={`${styles.btn} ${
              activeTab === "createDoctor" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("createDoctor")}
          >
            Create Doctor
          </button>
          <button
            className={`${styles.btn} ${
              activeTab === "pending" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending Appointments
          </button>
        </div>

        <div className={styles.right}>
          {activeTab === "pending" && (
            <>
              <div className={styles.cardContainer}>
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      refreshAppointments={fetchAppointments}
                    />
                  ))
                ) : (
                  <p>No pending appointments found.</p>
                )}
              </div>

              {totalPages > 1 && (
                <Pagination
                  totalItems={totalPages * itemsPerPage}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </>
          )}

          {activeTab === "createDoctor" && <CreateDoctor />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
