import { useState, useEffect } from "react";

export function  Purchases() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://idme-interview.herokuapp.com/').then((response) => {
            if (!response.ok) {
              throw new Error(
                `This is an HTTP error: The status is ${response.status}`
              );
            }
            return response.json();
        })
        .then((actualData) => {
            setData(actualData)
            console.log(actualData)
            setError(null);
        })

        .catch((err) => {
            setError(err.message)
            console.log(err.message)
            setData(null);
        })
        .finally(() => {
            setLoading(false);
          });
    }, []);

    return <div className="Purchases">
        <h2>Purchases</h2>
        {loading && <div>Data is loading. Please hold...</div>}
        {error && (
         <div>{`There is a problem fetching the data - ${error}`}</div>
      )}
      <table>
        <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Purchase Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Price</th>
        </tr>
        <tbody>
            {data && data.map((purchase, index) => (
                <tr key={index}>
                    <td style={{textTransform: 'capitalize'}}>
                        <b>{purchase.name}</b>
                    </td>
                    <td>
                        <img src={purchase.location} class="image" alt="product"/>
                    </td>
                    <td>
                        {purchase.purchaseDate}
                    </td>
                    <td>
                        {purchase.category}
                    </td>
                    <td>
                        {purchase.description}
                    </td>
                    <td>
                        {purchase.price}
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
}