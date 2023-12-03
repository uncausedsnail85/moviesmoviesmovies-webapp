// test to to call backend server

import { testCall } from "./client/userClient"
import { useState, useEffect } from "react";

function Test() {

    const [testResult, setTestResult] = useState(null);

    const test = async () => {
        const results = await testCall();
        console.log(`results: ${JSON.stringify(results)}`)
        setTestResult(results);
    };

    useEffect(() => {
        test();
    }, []);

    return (
        <>
            <pre>{JSON.stringify(testResult, null, 2)}</pre>
        </>
    )
}

export default Test