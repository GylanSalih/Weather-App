import { ReactElement } from 'react';
import './PageOne.module.scss';
import { ArrowRight } from 'lucide-react';

export const PageOne = (): ReactElement => {
  return (
    <div className="container page">
      <section className="stack">
        <h1>Page 1</h1>
        <p>
          Diese Seite ist eine vorgefertigte Vorlage. Passe Titel, Texte und
          Buttons beliebig an, um schnell neue Seiten zu erstellen.
        </p>
        <div className="row">
          <button className="btn">
            Primäraktion <ArrowRight size={16} />
          </button>
          <button className="btn-secondary">Sekundär</button>
          <button className="btn-outline">Outline</button>
        </div>
      </section>
    </div>
  );
};


