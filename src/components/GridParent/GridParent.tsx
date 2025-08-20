import { ReactElement } from 'react';
import './GridParent.module.scss';
import { GridSlot } from '../GridSlot/GridSlot';

export const GridParent = (): ReactElement => {
  return <div className="grid-parent">
    <div className="grid-parent-content">
        <GridSlot title="Weather" description="This is a weather slot" weather="sunny" temperature={20} rain={10} city="Berlin" time="12:00" image="https://via.placeholder.com/150" />
        <GridSlot title="Weather" description="This is a weather slot" weather="sunny" temperature={20} rain={10} city="Berlin" time="12:00" image="https://via.placeholder.com/150" />
    </div>
    <div className="grid-parent-content">
        <GridSlot title="Weather" description="This is a weather slot" weather="sunny" temperature={20} rain={10} city="Berlin" time="12:00" image="https://via.placeholder.com/150" />
        <GridSlot title="Weather" description="This is a weather slot" weather="sunny" temperature={20} rain={10} city="Berlin" time="12:00" image="https://via.placeholder.com/150" />
    </div>
  </div>;
};  