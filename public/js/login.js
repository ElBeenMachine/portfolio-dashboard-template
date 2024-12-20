// Get the querystring
const urlParams = new URLSearchParams(window.location.search);
const redirect = urlParams.get("redirectTo") || "/dashboard";

// Wait 3 seconds
setTimeout(() => {
	// Redirect to log in
	window.location.href = `/api/auth/signin?redirectTo=${redirect}`;
}, 1000);
