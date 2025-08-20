export const dateToTime = (date: Date) => date.toLocaleString('de-DE', {
    hour: 'numeric',
    minute: 'numeric'
  });
  
  // dateToTime(new Date(hourly?.time[index]))
  // funktioniert todays forecast