"use client";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.userMenu}`)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  const handleCloseMenu = () => setIsOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.subContainer}>
        <div className={styles.logo} onClick={() => router.push("/")}>
          <Image
            src="/images/logo.png"
            alt="MedCare Logo"
            width={36}
            height={36}
            className={styles.logoImg}
          />
          <span className={styles.logoText}>MedCare</span>
        </div>

        <button className={styles.hamburger} onClick={() => setIsOpen(true)}>
          <Menu className={styles.hamburgerIcon} size={36} />
        </button>

        <div
          className={`${styles.menuOverlay} ${isOpen ? styles.menuOpen : ""}`}
        >
          <button className={styles.closeBtn} onClick={handleCloseMenu}>
            <X size={36} />
          </button>
          <nav className={styles.navMenu}>
            <ul>
              <li className={pathname === "/" ? styles.active : ""}>
                <Link href="/" onClick={handleCloseMenu}>
                  Home
                </Link>
              </li>
              <li className={pathname === "/appointments" ? styles.active : ""}>
                <Link href="/appointments" onClick={handleCloseMenu}>
                  Appointments
                </Link>
              </li>
              <li className={pathname === "/emergency" ? styles.active : ""}>
                <Link href="/emergency" onClick={handleCloseMenu}>
                  Emergency
                </Link>
              </li>
              <li className={pathname === "/reviews" ? styles.active : ""}>
                <Link href="/reviews" onClick={handleCloseMenu}>
                  Reviews
                </Link>
              </li>
              {user ? (
                <>
                  <li className={pathname === "/profile" ? styles.active : ""}>
                    <Link href="/profile" onClick={handleCloseMenu}>
                      Profile
                    </Link>
                  </li>
                  <li
                    className={
                      pathname === "/user-appointments" ? styles.active : ""
                    }
                  >
                    <Link href="/user-appointments" onClick={handleCloseMenu}>
                      My Appointments
                    </Link>
                  </li>
                  <li>
                    <button
                      className={`${styles.registerBtn} btn`}
                      onClick={() => {
                        handleLogout();
                        handleCloseMenu();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button
                      className={`${styles.loginBtn} btn`}
                      onClick={() => {
                        router.push("/login");
                        handleCloseMenu();
                      }}
                    >
                      Login
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${styles.registerBtn} btn`}
                      onClick={() => {
                        router.push("/signup");
                        handleCloseMenu();
                      }}
                    >
                      Register
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>

        <nav className={styles.desktopNavLinks}>
          <ul>
            <li className={pathname === "/" ? styles.active : ""}>
              <Link href="/">Home</Link>
            </li>
            <li className={pathname === "/appointments" ? styles.active : ""}>
              <Link href="/appointments">Appointments</Link>
            </li>
            <li className={pathname === "/emergency" ? styles.active : ""}>
              <Link href="/emergency">Emergency</Link>
            </li>
            <li className={pathname === "/reviews" ? styles.active : ""}>
              <Link href="/reviews">Reviews</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.desktopButtons}>
          {user ? (
            <div className={styles.userMenu}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
                className={styles.avatar}
              >
                <User size={24} />
              </div>
              {isDropdownOpen && (
                <ul className={styles.dropdownMenu}>
                  <li
                    className={pathname === "/profile" ? styles.active : ""}
                    onClick={() => {
                      router.push("/profile");
                      setIsDropdownOpen(false);
                    }}
                  >
                    Profile
                  </li>
                  <li
                    className={
                      pathname === "/user-appointments" ? styles.active : ""
                    }
                    onClick={() => {
                      router.push("/user-appointments");
                      setIsDropdownOpen(false);
                    }}
                  >
                    My Appointments
                  </li>
                  <li onClick={handleLogout} className={styles.logoutItem}>
                    Logout
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <button
                className={`${styles.loginBtn} btn`}
                onClick={() => router.push("/login")}
              >
                Login
              </button>
              <button
                className={`${styles.registerBtn} btn`}
                onClick={() => router.push("/signup")}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
