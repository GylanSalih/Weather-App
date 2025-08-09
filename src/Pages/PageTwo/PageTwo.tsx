import { ReactElement } from 'react';
import styles from './PageTwo.module.scss';
import { ArrowRight } from 'lucide-react';

export const PageTwo = (): ReactElement => {
  return (
    <div className="container page">
      <section className={styles.stack1}>
        <h1>Page 2</h1>
        <p>
          Noch eine editierbare Seite mit vorgefertigten Stilen und Komponenten.
        </p>
        <div className="row">
          <button className="btn">Jetzt starten <ArrowRight size={16} /></button>
          <button className="btn-secondary">Mehr erfahren</button>
          <button className="btn-outline">Kontakt</button>
        </div>
      </section>

      <section className={styles.stack2}>
        <h2>Abschnittstitel</h2>
        <p>
          Beispieltext für Inhalte. Ersetze diesen Text, füge Bilder oder
          Komponenten hinzu, um deine Seite schneller aufzubauen.
        </p>
      </section>
    </div>
  );
};


