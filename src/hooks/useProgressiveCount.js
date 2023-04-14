import React, { useState } from "react";
const useProgressiveCount = () => {
  const [seg, setSeg] = useState("01");
  const [min, setMin] = useState("00");
  const [hour, setHour] = useState("00");

  const time = (hour, min, seg) => {
    const segundo = parseInt(seg);
    const minuto = parseInt(min);

    if (segundo < 9) setSeg(`0${segundo + 1}`);
    else if (segundo >= 9 && segundo < 59) setSeg(`${segundo + 1}`);
    else if (segundo <= 59) {
      setSeg("00");
      if (minuto < 9) {
        setMin(`0${minuto + 1}`);
      } else if (minuto >= 9 && min < 59) {
        setMin(`${minuto + 1}`);
      } else if (minuto <= 59) {
        setMin("00");
        if (hour < 9) {
          const hora = parseInt(hour);
          setHour(`0${hora + 1}`);
        } else if (hour >= 9) {
          const hora = parseInt(hour);
          setHour(`${hora + 1}`);
        }
      }
    }
  };

  setTimeout(() => {
    time(hour, min, seg);
  }, 1000);

  return {
    seg,
    min,
    hour,
  };
};

export { useProgressiveCount };
