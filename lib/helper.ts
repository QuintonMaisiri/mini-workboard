export function formatDateString(input: string): string {
    const date = new Date(input);
    if (isNaN(date.getTime())) return '';

    return date
        .toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        })
        .replace(',', '')
        .toLowerCase();
}

 export const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };