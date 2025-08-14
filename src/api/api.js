export async function getData (endpoint) {
    let result = await fetch(`${import.meta.env.VITE_BASE_URL}${endpoint}` )
    .then(res => res.json());

    return result

}