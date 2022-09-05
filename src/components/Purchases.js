import { useState, useEffect } from "react";

export function  Purchases() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pDate, setPDate] = useState([]);
    const [pPrice, setPPrice] = useState([]);
    var [categoryColor] = useState([]);

    const options = {  month: 'long', year: 'numeric',  day: 'numeric' };

    var date = new Date();
    var catStyle = [{}];

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
            categoryColor = [];
            setData(actualData)
            console.log(actualData.length)
            for (var i=0; i <= actualData.length; i++) {
                date = new Date(actualData[i]?.purchaseDate)
                pDate.push(date.toLocaleDateString('en-US', options));
                pPrice.push((actualData[i]?.price)/100);
                if (actualData[i]?.category === 'Food') {
                    categoryColor.push('green')
                } else if (actualData[i]?.category === 'Technology') {
                    categoryColor.push('black')
                } else if (actualData[i]?.category === 'Footwear') {
                    categoryColor.push('brown')
                } else if (actualData[i]?.category === 'Travel') {
                    categoryColor.push('purple')
                } else if (actualData[i]?.category === 'Entertainment') {
                    categoryColor.push('blue')
                } else if (actualData[i]?.category === 'Automotive') {
                    categoryColor.push('red')
                } else if (actualData[i]?.category === 'Apparel') {
                    categoryColor.push('orange')
                } 
                catStyle[i] = {
                    color: categoryColor[i]
                }
            }
            console.log(categoryColor.length);
            console.log(catStyle);
            setPDate(pDate)
            setPPrice(pPrice)
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



    return <div className="mobile-purchases">
         <h2 className="mobile-header">Purchases</h2>
         {loading && <div>Data is loading. Please hold...</div>}
           {error && (
         <div>{`There is a problem fetching the data - ${error}`}</div>
        )}
        {data && data.map((purchase, index) => (
            <div className="mobile-card" key={index}>
                <p style={{marginTop: '1rem'}}>
                    <span><img src={purchase?.location} className="mobile-image" alt="product"/></span>
                    <span className="mobile-name">{purchase?.name}</span>
                    <span className="mobile-price">${pPrice[index]}</span>
                </p>
                <p className="mobile-description">
                    {purchase?.description}
                </p>
                <p className="mobile-purchase-date">Purchase Date</p>
                <p className="mobile-date">{pDate[index]}</p>
            </div>
        ))}
    </div>

//     return <div className="desktop-purchases">
//         <h2>Purchases</h2>
//         {loading && <div>Data is loading. Please hold...</div>}
//         {error && (
//          <div>{`There is a problem fetching the data - ${error}`}</div>
//       )}
//       <table>
//         <tr>
//             <th width="15%">Name</th>
//             <th width="8%">Location</th>
//             <th width="10%">Purchase Date</th>
//             <th className="category-header" width="10%">Category</th>
//             <th width="20%">Description</th>
//             <th className="price-header" width="5%">Price</th>
//             <th width="5%"></th>
//         </tr>
//             {data && data.map((purchase, index) => (
//         <tbody>
//                 <tr key={index}>
//                     <td style={{textTransform: 'capitalize'}}>
//                         <b>{purchase.name}</b>
//                     </td>
//                     <td className="location">
//                         <img src={purchase?.location} className="product-image" alt="product"/>
//                     </td>
//                     <td className="purchase-date">
//                         {pDate[index]}
//                     </td>
//                     <td className="category">
//                         <span className="category-box">{purchase.category}</span>
//                     </td>
//                     <td className="description">
//                         {purchase.description}
//                     </td>
//                     <td className="price">
//                         ${pPrice[index]}
//                     </td>
//                     <td className="dots">
//                         &#8942;
//                     </td>
//                 </tr>
//         </tbody>
//             ))}
//       </table>
//     </div>
}
