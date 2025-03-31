import styles from "./appointments.module.css";
import ScheduleAppointment from "../components/ScheduleAppointment/ScheduleAppointment";

const Appointments = () => {
  return (
    <div>
      <div className={styles.appointments}>
        <div className={styles.left}>
          <h1 className="heading">Book Your Next Doctor Visit in Seconds.</h1>
          <p className="para">
            CareMate helps you find the best healthcare provider by specialty,
            location, and more, ensuring you get the care you need.
          </p>
        </div>
        <div className={styles.right}>
          <ScheduleAppointment />
        </div>
      </div>
    </div>
  );
};

export default Appointments;
