import { ReactElement } from 'react';
import './Home.module.scss';
import { MainContent } from '../../components/MainContent/MainContent';

export const Home = (): ReactElement => {
  return (
    <div>
      <MainContent />
    </div>
  );
};
