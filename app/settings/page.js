import styles from './settings.module.css';

/**
 * Fetch settings data from the API
 * @returns {Promise<Object>} The settings data or an empty array in case of error
 */
async function fetchSettingsData() {
    try {
        // Make a fetch request to the API endpoint specified in the environment variable
        const res = await fetch(process.env.API_SETTINGS_DATA, { cache: "no-store" });

        // Check if the response is not ok (status code is not in the range 200-299)
        if (!res.ok) {
            console.error('Failed to fetch data');
            return { settings: [] }; // Return an empty array in case of error
        }

        // Parse the JSON response and return the data
        return await res.json();
    } catch (error) {
        // Log any errors that occur during the fetch request
        console.error('Error fetching settings data:', error);
        return { settings: [] }; // Return an empty array in case of error
    }
}

/**
 * The main Page component that renders the settings data
 * @returns {JSX.Element} The rendered component
 */
export default async function Page() {
    // Fetch the settings data
    const settingsData = await fetchSettingsData();

    // Render the settings data or a message if no data is available
    return (
        <div className={styles.subContainer}>
            <h1>Setting Page</h1>
            {settingsData.settings.length > 0 ? (
                settingsData.settings.map(({ id, isValid, variable }) => (
                    <div key={id} className={styles.infoContainer}>
                        <p><span className={styles.label}>Valid: </span>{isValid.toString()}</p>
                        <p><span className={styles.label}>Variable: </span>{variable}</p>
                    </div>
                ))
            ) : (
                <p>No settings data available.</p>
            )}
        </div>
    );
}