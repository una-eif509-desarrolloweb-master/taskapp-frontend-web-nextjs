import styles from "./support.module.css";

// Static data fetching
// Def: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
async function fetchSupportData() {
    const res = await fetch(
        "https://raw.githubusercontent.com/una-eif509-desarrolloweb-master/taskapp-frontend-web-staticdata/main/static/support.json"
    );

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return await res.json();
}

export default async function Page() {
    const supportData = await fetchSupportData();
    return (
        <>
            <div className={styles.subContainer}>
                <h1>Support Page</h1>
                {supportData.support.map(({ id, data }) => (
                    <div key={id} className={styles.infoContainer}>
                        <p>{data}</p>
                    </div>
                ))}
            </div>
        </>
    );
}