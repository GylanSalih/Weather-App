import { ReactElement } from "react";
import styles from "./PageThree.module.scss";
import { ArrowRight } from "lucide-react";

export const PageThree = (): ReactElement => {
  return (
    <div className="container page">
      <section className={styles.stack1}>
        <h1>Page 3</h1>
        <p>
          Verwende diese Seite als Vorlage für Kontakt-, Feature- oder
          Marketingseiten.
        </p>
        <div className="row">
          <button className="btn">
            Los geht’s <ArrowRight size={16} />
          </button>
          <button className="btn-secondary">Dokumentation</button>
          <button className="btn-outline">Demo ansehen</button>
        </div>
      </section>

      <section className="grid-cards">
        <div className="card">
          <h3>Feature eins</h3>
          <p>Kurze Beschreibung für ein Beispiel-Feature.</p>
        </div>
        <div className="card">
          <h3>Feature zwei</h3>
          <p>Kurze Beschreibung für ein Beispiel-Feature.</p>
        </div>
        <div className="card">
          <h3>Feature drei</h3>
          <p>Kurze Beschreibung für ein Beispiel-Feature.</p>
        </div>
      </section>
    </div>
  );
};
