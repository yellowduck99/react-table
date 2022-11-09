import { useState, useEffect } from 'react';

const App = () => {

    // Hook for table data
    const [data, setData] = useState();

    // Fetching data from API and save to data
    // @todo would using async help?
    useEffect(() => {
        try {
            fetch('/get')
                .then((res) => res.json())
                .then((data) => {
                    setData(data.output);
                })
        }
        catch (e) {
            console.log(e)
        }
    }, [])

    // empty arr when not finished fetched
    let keys = !data ? [] : Object.keys(data[0]);


    // function of creating header of table
    const header = (keys) => {
        return keys.map((key, index) => {
            return <th key={index} >{key}</th>
        })

    }

    // function of creating data rows
    const row = (keys, json, index) => {
        return (<tr key={index} >
            {keys.map((key, index) => {
                return (<td key={index} >{json[key] ? json[key] : 'NULL'}</td>)
            })}
        </tr>)
    }


    // main return 
    return (<div className='App' >
        {!data ? 'loading'
            : <table className='table table-striped ' >
                <tbody>
                    <tr>{header(keys)}</tr>
                    {data.map((json, index) => {
                        return (row(keys, json, index))
                    })}
                </tbody>
            </table>}
    </div>)
}

export default App;