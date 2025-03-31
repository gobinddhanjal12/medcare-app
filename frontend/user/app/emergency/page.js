"use client";

import React from "react";
import styles from "./styles.module.css";
import { AlertCircle, Heart } from "lucide-react";
import ContactCard from "../components/ContactCard/ContactCard";

export default function EmergencyContact() {
  const emergencyServices = [
    {
      id: 1,
      name: "National Emergency Number",
      number: "112",
      description: "All Emergency Services",
    },
    {
      id: 2,
      name: "Police",
      number: "100",
      description: "Crime Reporting & Emergencies",
    },
    {
      id: 3,
      name: "Fire",
      number: "101",
      description: "Fire Emergency Services",
    },
    {
      id: 4,
      name: "Ambulance",
      number: "108",
      description: "Medical Emergency Services",
    },
    {
      id: 5,
      name: "Women Helpline",
      number: "1091",
      description: "Women Safety & Distress",
    },
    {
      id: 6,
      name: "Child Helpline",
      number: "1098",
      description: "Child Abuse & Emergency",
    },
  ];

  const hospitalContacts = [
    {
      id: 7,
      name: "AIIMS Delhi",
      number: "011-26588500",
      description: "All India Institute of Medical Sciences",
    },
    {
      id: 8,
      name: "Apollo Hospitals",
      number: "1860-500-1066",
      description: "Emergency Medical Services",
    },
    {
      id: 9,
      name: "Fortis Healthcare",
      number: "1800-102-6565",
      description: "Emergency Care",
    },
    {
      id: 10,
      name: "Max Healthcare",
      number: "1860-500-1111",
      description: "Emergency & Trauma Care",
    },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Emergency Helplines</h1>
        <p>Quick access to important emergency contacts in India</p>
      </header>

      <section className={styles.emergencySection}>
        <div className={styles.sectionHeader}>
          <AlertCircle className={styles.sectionIcon} />
          <h2>Emergency Services</h2>
        </div>
        <div className={styles.contactsGrid}>
          {emergencyServices.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <Heart className={styles.sectionIcon} />
          <h2>Hospitals & Medical Care</h2>
        </div>
        <div className={styles.contactsGrid}>
          {hospitalContacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </section>
    </div>
  );
}
