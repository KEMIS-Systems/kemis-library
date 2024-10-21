export function getFlagEmoji(countryCode: string) {
    try {
        const codePoints = countryCode
          .toUpperCase()
          .split('')
          .map(char => 127397 + char.charCodeAt(0));

        return String.fromCodePoint(...codePoints);
    } catch (error) {
        // do anything
    }
}
