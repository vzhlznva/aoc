import { Axios  } from "axios"
export const useData = () => {
    const SESSION_KEY="53616c7465645f5f0843bb5264b5953df95b28b97144ea33a192e40f166204482eaa569cb9d457741980d47f412f0bdceb82ed135c34445d2124bd7949f3bf74"
    const URL_ROOT = "https://adventofcode.com/"
    const HEADERS = {
        'Cookie': `session=${SESSION_KEY}`, 
    }

    const axiosInstance = new Axios({
        baseURL: URL_ROOT,
        headers: HEADERS
    })

    const fetchData = async (year: number, day: number): Promise<any> => {
        console.log(HEADERS)
        try {
            const { data } = await axiosInstance.get(`${year}/day/${day}/input`); 
            return data
        } catch (error: any) {
            console.log(error)
        }
    }

    return { fetchData }
}