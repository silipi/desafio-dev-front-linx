export default function formatDate(date) {
  const dateToFormat = new Date(date)

  let day = dateToFormat.getDate();
  let month = dateToFormat.getMonth() + 1; 
  const year = dateToFormat.getFullYear();

  if (day < 10) {
      day = `0${day}`;
  } 

  if (month < 10) {
    month = `0${month}`;
  }
  
  return `${day}/${month}/${year}`
}

