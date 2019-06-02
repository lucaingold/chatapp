export const getTime24hours = () => {
  const now = new Date();
  let mins = now.getMinutes();
  let hours = now.getHours();

  if (hours < 10) {
    hours = `0${hours}`
  }

  if (mins < 10) {
    mins = `0${mins}`
  }

  return `${hours}:${mins}`
};

export const scrollToBottom = (elementToBeScrolled) => {
  elementToBeScrolled.scrollTop = elementToBeScrolled.scrollHeight;
};

export const isPageActive = (pageHash) => window.location.hash.split('/')[1] === pageHash;
