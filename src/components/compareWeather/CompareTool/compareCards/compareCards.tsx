import React from 'react';
import { useState } from 'react';
import styles from './CompareCards.module.scss';
import { MapPin, ChevronDown, ExternalLink, Star } from 'lucide-react';

// Interface für die Wetterdaten
interface Weather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  time: string;
  is_day: number;
  relative_humidity_2m: number;
  precipitation_sum: number;
  cloudcover: number;
  visibility: number;
  city: string;
}

// 1. Interface definieren
interface CompareCardsProps {
  restaurant: Restaurant;
  isSelected: boolean;
  onSelect: (restaurant: Restaurant) => void;
  onCardClick: (restaurant: Restaurant) => void;
  displayedRestaurants: Restaurant[];
  comparisonMode: boolean;
  setActiveTooltip: (tooltip: string | null) => void;
  setComparisonMode: (mode: boolean) => void;
  selectedRestaurants: Restaurant[];
  setSelectedRestaurants: (restaurants: Restaurant[]) => void;
  expandedAddress: string | null;
  setExpandedAddress: (address: string | null) => void;
  isRestaurantDisabled: (restaurant: Restaurant) => boolean;
  isRestaurantSelected: (restaurant: Restaurant) => boolean;
}


// Hier kommen die Props rein
export const CompareCards = ({
  displayedRestaurants,
  comparisonMode,
  setActiveTooltip,
  selectedRestaurants,
  setSelectedRestaurants,
  expandedAddress,
  setExpandedAddress,
  isRestaurantDisabled,
  isRestaurantSelected,
}: CompareCardsProps) => {
  // und hier kommen die lokalen States für eine Variable rein

  const getRatingStars = (rating: number): React.ReactElement => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className={styles.stars}>
        {/* Volle Sterne */}
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} size={16} fill="#FDCC0D" color="#FDCC0D" />
        ))}

        {/* Halber Stern */}
        {hasHalfStar && (
          <Star
            size={16}
            fill="#FDCC0D"
            color="#FDCC0D"
            style={{ opacity: 0.5 }}
          />
        )}

        {/* Leere Sterne */}
        {[...Array(emptyStars)].map((_, i) => (
          <Star
            key={i + fullStars + (hasHalfStar ? 1 : 0)}
            size={16}
            color="#ccc"
          />
        ))}
        <span className={styles.ratingText}>({rating})</span>
      </div>
    );
  };

  const jaNeinEmoji = (val: string): string => {
    return val === 'y' ? '✅' : '❌';
  };

  const toggleAddressExpansion = (restaurantName: string): void => {
    setExpandedAddress(
      expandedAddress === restaurantName ? null : restaurantName
    );
  };

  // checkbox auswählbar durch diese funktion
  const toggleRestaurantSelection = (restaurant: Restaurant): void => {
    if (selectedRestaurants.find(r => r.name === restaurant.name)) {
      // Restaurant abwählen
      setSelectedRestaurants(prev =>
        prev.filter(r => r.name !== restaurant.name)
      );
    } else if (selectedRestaurants.length < 3) {
      // Restaurant auswählen (nur wenn weniger als 3 ausgewählt sind)
      setSelectedRestaurants(prev => [...prev, restaurant]);
    }
  };

  const handleCardClick = (restaurant: Restaurant): void => {
    setActiveTooltip(restaurant.name);
  };

  return (
    <div className={styles.restaurantList}>
      {displayedRestaurants.map((restaurant: Restaurant) => (
        <div
          key={restaurant.name}
          restaurant={restaurant}
          isSelected={isRestaurantSelected(restaurant)}
          onSelect={toggleRestaurantSelection}
          onCardClick={handleCardClick}
          expandedAddress={expandedAddress}
          setExpandedAddress={setExpandedAddress}
          isRestaurantDisabled={isRestaurantDisabled}
          className={`${styles.restaurantCard} ${comparisonMode ? styles.comparisonMode : ''}`}
          onClick={() => !comparisonMode && handleCardClick(restaurant)}
        >
          {/* Comparison Checkbox */}
          {comparisonMode && selectedRestaurants.length < 3 && (
            <input
              type="checkbox"
              checked={isRestaurantSelected(restaurant)}
              onChange={() => toggleRestaurantSelection(restaurant)}
              disabled={isRestaurantDisabled(restaurant)}
              className={styles.checkbox}
            />
          )}

          {/* Header Row */}
          <div className={styles.headerRow}>
            <div className={styles.ratingName}>
              {getRatingStars(restaurant.rating)}
              <h3>{restaurant.name}</h3>
            </div>

            <div className={styles.burgerTypes}>
              <span
                className={
                  restaurant.burger_classic === 'y'
                    ? styles.available
                    : styles.unavailable
                }
              >
                Classic: {jaNeinEmoji(restaurant.burger_classic)}
              </span>
              <span
                className={
                  restaurant.burger_cheese === 'y'
                    ? styles.available
                    : styles.unavailable
                }
              >
                Cheese: {jaNeinEmoji(restaurant.burger_cheese)}
              </span>
              <span
                className={
                  restaurant.burger_bio === 'y'
                    ? styles.available
                    : styles.unavailable
                }
              >
                Bio: {jaNeinEmoji(restaurant.burger_bio)}
              </span>
            </div>

            {/* Desktop Address und Chevron Icon*/}
            <div className={styles.desktopAddress}>
              <div className={styles.desktopIconTextWrapper}>
                <span className={styles.desktopAddressText}>Adresse</span>
                <div className={styles.desktopAddressIcon}>
                  <MapPin size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Address */}
          <div
            className={styles.mobileAddress}
            onClick={e => {
              e.stopPropagation();
              toggleAddressExpansion(restaurant.name);
            }}
          >
            <div className={styles.mobileIconTextWrapper}>
              <span className={styles.mobileAddressText}>Adresse anzeigen</span>
              <div className={styles.addressIcon}>
                <MapPin size={16} />
              </div>
            </div>

            <div
              className={`${styles.mobileAddressChevronIcon} ${expandedAddress === restaurant.name ? styles.expanded : ''}`}
            >
              <ChevronDown size={16} />
            </div>
          </div>

          {/* Mobile Address Details */}
          {expandedAddress === restaurant.name && (
            <div className={styles.mobileAddressDetails}>
              <div className={styles.mobileAddressInfo}>
                <div className={styles.mobileAddressItem}>
                  <MapPin size={16} />
                  <span>
                    {restaurant.street}, {restaurant.zip} {restaurant.city}
                  </span>
                </div>
                <div className={styles.mobileAddressItem}>
                  <ExternalLink size={16} />
                  <a
                    href={restaurant.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Zur Webseite
                  </a>
                </div>
              </div>
            </div>

          )}
        </div>
      ))}
    </div>

    
  );
};
