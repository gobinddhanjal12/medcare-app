"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import styles from "./ScheduleAppointment.module.css";
import {
  ChevronDown,
  CircleChevronLeft,
  CircleChevronRight,
} from "lucide-react";
import DateScroller from "../DateScroller/DateScroller";
import TimeSlotSection from "../TimeSlotSection/TimeSlotSection";
import { useRouter } from "next/navigation";

const ScheduleAppointment = ({ doctorId }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedOption, setSelectedOption] = useState("1");
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [morningSlots, setMorningSlots] = useState([]);
  const [afternoonSlots, setAfternoonSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [doctorLocation, setDoctorLocation] = useState("");

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/doctors/${doctorId}`
        );
        if (!res.ok) throw new Error("Failed to fetch doctor details");

        const doctorData = await res.json();
        setDoctorLocation(doctorData.data.location);
      } catch (err) {
        console.error("Error fetching doctor details:", err);
      }
    };

    if (doctorId) {
      fetchDoctorDetails();
    }
  }, [doctorId]);

  const fetchTimeSlots = async (doctorId, selectedDate) => {
    setLoading(true);
    setError(null);

    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/appointments/available-slots/${doctorId}?date=${formattedDate}`
      );

      if (!response.ok) throw new Error("Failed to fetch slots");
      const result = await response.json();      

      const availableSlots = result.data.map((slot) =>
        slot.start_time.slice(0, 5)
      );

      const expectedSlots = [
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
      ];

      const slots = expectedSlots.map((time) => ({
        time,
        available: availableSlots.includes(time),
      }));

      setMorningSlots(
        slots.filter((slot) => parseInt(slot.time.split(":")[0]) < 14)
      );
      setAfternoonSlots(
        slots.filter((slot) => parseInt(slot.time.split(":")[0]) >= 14)
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeSlots(doctorId, selectedDate);
  }, [doctorId, selectedDate]);

  const generateDatesForMonth = (currentDate) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const startDay =
      today.getMonth() === month && today.getFullYear() === year
        ? today.getDate()
        : 1;
    return Array.from({ length: daysInMonth - startDay + 1 }, (_, i) => {
      const dateObj = new Date(year, month, startDay + i);
      return {
        day: format(dateObj, "EEE"),
        date: format(dateObj, "MMM dd"),
      };
    });
  };

  const changeMonth = (offset) => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + offset);
      return newDate;
    });
  };

  const dates = generateDatesForMonth(date);

  const [slotError, setSlotError] = useState("");

  const router = useRouter();

  const handleNext = () => {
    if (!selectedSlot) {
      setSlotError("Please select a time slot before proceeding.");
      return;
    }
    setSlotError("");

    const selectedDoctorId = doctorId || selectedOption;

    const allSlots = [...morningSlots, ...afternoonSlots];
    const timeSlotId =
      allSlots.findIndex((slot) => slot.time === selectedSlot) + 1;

    const mode = activeTab === "video" ? "online" : "offline";

    router.push(
      `/appointment-request?date=${format(
        selectedDate,
        "yyyy-MM-dd"
      )}&time=${selectedSlot}&timeSlotId=${timeSlotId}&doctorId=${selectedDoctorId}&mode=${mode}`
    );
  };

  const [activeTab, setActiveTab] = useState("video");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2 className={styles.title}>Schedule Appointment</h2>
        <button className={styles.bookButton} onClick={handleNext}>
          Book Appointment
        </button>
      </div>

      <div className={styles.tabContainer}>
        <button
          className={`${styles.tab} ${
            activeTab === "video" ? styles.activeTab : ""
          }`}
          onClick={() => handleTabClick("video")}
        >
          Book Video Consult
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "hospital" ? styles.activeTab : ""
          }`}
          onClick={() => handleTabClick("hospital")}
        >
          Book Hospital Visit
        </button>
      </div>

      <div className={styles.dropdownWrapper}>
        <select
          className={styles.dropdown}
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          {doctorLocation && <option value={doctorId}>{doctorLocation}</option>}
        </select>
        <ChevronDown className={styles.icon} size={28} />
      </div>

      <div className={styles.dateHeader}>
        <button
          className={styles.dateButton}
          onClick={() => changeMonth(-1)}
          disabled={date.getMonth() === new Date().getMonth()}
        >
          <CircleChevronLeft size={28} className={styles.icon} />
        </button>
        <h3 className={styles.heading}>
          {date.toLocaleString("default", { month: "long" })}{" "}
          {date.getFullYear()}
        </h3>
        <button className={styles.dateButton} onClick={() => changeMonth(1)}>
          <CircleChevronRight size={28} className={styles.icon} />
        </button>
      </div>

      <DateScroller
        dates={dates}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {loading && <p className={styles.loading}>Loading slots...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <>
          <TimeSlotSection
            title="Morning"
            icon="Sun"
            slots={morningSlots}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
          />
          <TimeSlotSection
            title="Afternoon"
            icon="Sunset"
            slots={afternoonSlots}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
          />
        </>
      )}

      <button className={styles.nextButton} onClick={handleNext}>
        Next
      </button>
      {slotError && <p className={styles.error}>{slotError}</p>}
    </div>
  );
};

export default ScheduleAppointment;
