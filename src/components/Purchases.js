import { useState, useEffect } from "react";

export function  Purchases() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pDate] = useState([]);
    const [pPrice] = useState([]);

    const options = {  month: 'long', year: 'numeric',  day: 'numeric' };

    var date = new Date();

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
            for (var i=0; i <= actualData.length; i++) {
                date = new Date(actualData[i]?.purchaseDate)
                pDate.push(date.toLocaleDateString('en-US', options));
                pPrice.push((actualData[i]?.price)/100);
            }
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
            <th></th>
        </tr>
            {data && data.map((purchase, index) => (
        <tbody>
                <tr key={index}>
                    <td style={{textTransform: 'capitalize'}}>
                        <b>{purchase.name}</b>
                    </td>
                    <td>
                        <img src={purchase?.location} className="product-image" alt="product"/>
                    </td>
                    <td>
                        {pDate[index]}
                    </td>
                    <td>
                        {purchase.category}
                    </td>
                    <td className="description">
                        {purchase.description}
                    </td>
                    <td className="price">
                        ${pPrice[index]}
                    </td>
                    <td className="dots">
                        &#8942;
                    </td>
                </tr>
        </tbody>
            ))}
      </table>
    </div>
}