/**
 * @author Ollie Beenham
 */

/**
 * Login page
 * 
 * @returns {Promise<JSX.Element>} Login page
 */
export default function loginFlowPage() {
    // Redirect to the login page
    return <div className="flex flex-col items-center justify-center gap-10 p-10">
        <h1 className="text-2xl">Logging You In...</h1>
        <div className="loader"></div>
        <script src="/js/login.js"></script>
    </div>
}