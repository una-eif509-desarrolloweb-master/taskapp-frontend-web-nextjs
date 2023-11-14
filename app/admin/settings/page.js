import styles from './settings.module.css';

// Dynamic Data Fetching or Server Side Rendering
// Def: https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering
async function fetchSettingsData() {
    const res = await fetch(process.env.API_SETTINGS_DATA,
        {cache: "no-store"}
    );

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return await res.json();
}

export default async function Page() {
    const settingsData = await fetchSettingsData();
    return (
        <>
            <div className={styles.subContainer}>
                <h1>Setting Page</h1>
                {settingsData.settings.map(({id, isValid, variable}) => (
                    <div key={id} className={styles.infoContainer}>
                        <p><span className={styles.label}>Valid: </span>{isValid.toString()}</p>
                        <p><span className={styles.label}>Variable: </span>{variable}</p>
                    </div>
                ))}
            </div>
        </>
    );
}