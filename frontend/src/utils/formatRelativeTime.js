export function formatRelativeTime(timestamp) {
    const currentDate = new Date();
    const createdAtDate = new Date(timestamp);
    
    const diffInMilliseconds = currentDate - createdAtDate;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);

    if (diffInYears > 0) {
        return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
    } else if (diffInMonths > 0) {
        return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
    } else if (diffInDays > 0) {
        return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    } else if (diffInHours > 0) {
        return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInMinutes > 0) {
        return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
        return 'just now';
    }
}

