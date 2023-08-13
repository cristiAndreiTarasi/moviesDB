const baseURL = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };
const timeout = 10000;

async function fetchAPIInstace<T>(url: string, options?: RequestInit): Promise<T> {
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(baseURL + url, { signal, headers, ...options });
        return await response.json();
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                throw new Error('Request timed out');
            }    
        }
        
        throw error;
    }
}

export { fetchAPIInstace };
