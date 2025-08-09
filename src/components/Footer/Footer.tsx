// Footer.tsx
import React from "react";
import styles from "./footer.module.scss";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { Github } from "lucide-react";

export const Footer = () => {
  const { darkMode } = useDarkMode();

  return (
    <footer className={styles.emptycontainer}>
      <div className={styles.footer}>
        <div className="row" style={{ justifyContent: "center" }}>
          <Github size={20} />
        </div>

        <p>
          Built by Gylan Salih. The source code for PetalStack is available on{" "}
          <a
            href="https://github.com/dein-benutzername/dein-repo"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>

        <p
          style={{
            marginTop: "0.75rem",
            fontSize: "0.875rem",
            color: "var(--muted-foreground)",
          }}
        >
          © {new Date().getFullYear()} PetalStack
        </p>
      </div>
    </footer>
  );
};
