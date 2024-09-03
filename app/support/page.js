import styles from './support.module.css';

/**
 * Fetch support data from the API
 * @returns {Promise<Object>} The support data or an empty array in case of error
 */
async function fetchSupportData() {
    try {
        // Make a fetch request to the API endpoint specified in the environment variable
        const res = await fetch(process.env.API_SUPPORT_DATA, { cache: "no-store" });

        // Check if the response is not ok (status code is not in the range 200-299)
        if (!res.ok) {
            console.error('Failed to fetch data');
            return { support: [] }; // Return an empty array in case of error
        }

        // Parse the JSON response and return the data
        return await res.json();
    } catch (error) {
        // Log any errors that occur during the fetch request
        console.error('Error fetching support data:', error);
        return { support: [] }; // Return an empty array in case of error
    }
}

/**
 * The main Page component that renders the support data
 * @returns {JSX.Element} The rendered component
 */
export default async function Page() {
    // Fetch the support data
    const supportData = await fetchSupportData();

    // Render the support data or a message if no data is available
    return (
        <div className={styles.subContainer}>
            <h1>Support Page</h1>
            {supportData.support.length > 0 ? (
                supportData.support.map(({ id, data }) => (
                    <div key={id} className={styles.infoContainer}>
                        <p>{data}</p>
                    </div>
                ))
            ) : (
                <p>No support data available.</p>
            )}
        </div>
    );
}