const formatArticleDate = (dateReleased, includeWeekday = false) =>
  new Intl.DateTimeFormat('en-US', {
    weekday: includeWeekday ? 'long' : undefined,
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${dateReleased}T12:00:00Z`));

export default formatArticleDate;
