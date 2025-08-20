import { ReactElement } from 'react';
import './GridSlot.module.scss';
import { Cloud, Thermometer } from 'lucide-react';

// interface for the grid slot
interface GridSlotProps {
  city: string;
  time: string;
  temperature: number;
  image: string;
  title: string;
  description: string;
  weather: string;
}

export const GridSlot = ({ title, description, weather, temperature, city, time, image }: GridSlotProps): ReactElement => {
  return <div className="grid-slot">
    <div className="grid-slot-content">
      <div className="grid-slot-content-header">
        <h2>{title}</h2> 
        <p>{description}</p>
      </div>
      <div className="grid-slot-content-weather">
        <Cloud />
        <p>{weather}</p>
        <Thermometer />
        <p>{temperature}</p>
      </div>
      <div className="grid-slot-content-image">
        <img src={image} alt="weather" />
      </div>
    </div>
  </div>;
};