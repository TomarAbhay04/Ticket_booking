// Function to format a date to "MON DD MMM" format
export function formatDisplayDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'short', day: '2-digit', month: 'short' };
    return date.toLocaleDateString('en-US', options).toUpperCase();
  }