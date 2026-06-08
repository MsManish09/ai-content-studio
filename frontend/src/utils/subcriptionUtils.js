

// date formatter.
export function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = date.getUTCFullYear()

    return `${day}/${month}/${year}`
}

// function to calculate number of days remaining
export function getDaysRemaining(expiresAt) {
    if (!expiresAt) return null

    const today = new Date()
    const expiry = new Date(expiresAt)

    const diffTime = expiry - today

    return Math.ceil(
        diffTime / (1000 * 60 * 60 * 24) // 1000ms * 60sec = 1min; 1min * 60 = 1 hour ; 1 hour * 24 = 1 day
    )
}