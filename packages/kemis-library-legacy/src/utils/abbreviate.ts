const abbreviate = (str: string): string => {
  const name = str.replace(/\s+/gi, ' ').trim();
  const nameParts = name.split(' ');

  return nameParts.length >= 2
    ? `${nameParts[0]} ${nameParts[1][0]}.`
    : nameParts[0];
};

export default abbreviate;
