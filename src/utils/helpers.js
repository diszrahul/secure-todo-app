export const getFormattedDate = () => {
    Date.prototype.toShortFormat = function() {

      let monthNames =["Jan","Feb","Mar","Apr",
                        "May","Jun","Jul","Aug",
                        "Sep", "Oct","Nov","Dec"];
      
      let day = this.getDate();
      
      let monthIndex = this.getMonth();
      let monthName = monthNames[monthIndex];
      
      return `${day} ${monthName}`;  
  }

  let today = new Date()
  return today.toShortFormat()
  }
