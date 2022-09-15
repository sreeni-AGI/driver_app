var currentDate = new Date();
    const endDate = new Date();
    endDate.setUTCHours(23,59,59)
    const timediff = parseInt(((endDate.getTime())-(currentDate.getTime() + (3600000*4)))/1000);
    console.log(timediff)