export const getCurrentDateTime = () => {
    return {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };
  };