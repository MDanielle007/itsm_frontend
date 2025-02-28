export function formatDate(value, format = "short") {
	if (!value) return "";
	const date = new Date(value);
	if (isNaN(date)) return "";

	switch (format) {
		case "input":
			return new Intl.DateTimeFormat("en-CA", {
				dateStyle: "full",
				timeStyle: "medium",
				timeZone: "Asia/Manila",
				hour12: true,
			})
				.format(date)
				.split("/")
				.reverse()
				.join("-");

		case "short":
			return date.toLocaleDateString("en-US", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});

		case "relative": {
			const now = new Date();
			const diffInMs = now - date;
			const diffInSec = Math.floor(diffInMs / 1000);
			const diffInMin = Math.floor(diffInSec / 60);
			const diffInHour = Math.floor(diffInMin / 60);
			const diffInDay = Math.floor(diffInHour / 24);

			if (diffInSec < 60) return `${diffInSec} sec ago`;
			if (diffInMin < 60) return `${diffInMin} min ago`;
			if (diffInHour < 24) return `${diffInHour} hour${diffInHour > 1 ? "s" : ""} ${diffInMin % 60} min ago`;
			if (diffInDay === 1) return "Yesterday";
			if (diffInDay < 7) return `${diffInDay} day${diffInDay > 1 ? "s" : ""} ago`;

			return `${date.getFullYear().toString().slice(-2)}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
		}

		case "long": {
			const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
			const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			const dayOfWeek = days[date.getDay()];
			const month = months[date.getMonth()];
			const day = date.getDate();
			const year = date.getFullYear();
			let hours = date.getHours();
			const minutes = date.getMinutes();
			const ampm = hours >= 12 ? "PM" : "AM";
			hours = hours % 12 || 12;

			return `${dayOfWeek}, ${month} ${day}, ${year}, ${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
		}

		default:
			return "Invalid format";
	}
}


export function capitalizeWords(str) {
	if (!str) return ''

	return str
		.toLowerCase() // Convert everything to lowercase first
		.replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize first letter of each word
}
