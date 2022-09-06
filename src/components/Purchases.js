import { useState, useEffect } from "react";

export function  Purchases() {
    /* Initialing state and variables */
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
        /* Here I'm fetching the data and storing it in a json or throwing an error */
        fetch('https://idme-interview.herokuapp.com/').then((response) => {
            if (!response.ok) {
              throw new Error(
                `This is an HTTP error: The status is ${response.status}`
              );
            }
            return response.json();
        })
        /* Here I'm taking in the data and storing it to state.
         * I'm also taking the date and price and formatting them to the design.
         * I made an attempt to assign colors to categories, and even to set a 
         * style based on those. Both the array of colors and the array of styles
         * do get stored, but I had trouble assigning them either inline or in CSS.
         * I left them here to show the attempt.
         */
        .then((responseData) => {
            categoryColor = [];
            setData(responseData)
            for (var i=0; i <= responseData.length; i++) {
                date = new Date(responseData[i]?.purchaseDate)
                pDate.push(date.toLocaleDateString('en-US', options));
                pPrice.push((responseData[i]?.price)/100);
                if (responseData[i]?.category === 'Food') {
                    categoryColor.push('green')
                } else if (responseData[i]?.category === 'Technology') {
                    categoryColor.push('black')
                } else if (responseData[i]?.category === 'Footwear') {
                    categoryColor.push('brown')
                } else if (responseData[i]?.category === 'Travel') {
                    categoryColor.push('purple')
                } else if (responseData[i]?.category === 'Entertainment') {
                    categoryColor.push('blue')
                } else if (responseData[i]?.category === 'Automotive') {
                    categoryColor.push('red')
                } else if (responseData[i]?.category === 'Apparel') {
                    categoryColor.push('orange')
                } 
                catStyle[i] = {
                    color: categoryColor[i]
                }
            }
            /* saving the new data to state */
            setPDate(pDate)
            setPPrice(pPrice)
            setError(null);
        })

        /* if something goes wrong witht he above, we console log an error */
        .catch((err) => {
            setError(err.message)
            console.log(err.message)
            setData(null);
        })
        /* loading is complete if we make it to here */
        .finally(() => {
            setLoading(false);
        });
    }, []);

    /* On lines 80-103 I am using window size for mobile demo purposes to display cards
     * On lines 106-154 is the table that will display on the desktop
     * It would be nice to refactor those into child components in my opinion to make
     * this easier to read
   /* On lines 82-84 & 109-111 a message will display if there is a lag in fetching data */ 
    if (window.innerWidth <= 768) {
        return <section className="mobile-purchases">
            <h2 className="mobile-header" data-testid="purchases">Purchases</h2>
            {loading && <section style={{marginLeft: '15px'}}>Data is loading. Please hold...</section>}
            {error && (
            <section style={{marginLeft: '15px'}}>{`There is a problem fetching the data - ${error}`}</section>
            )}
            {data && data.map((purchase, index) => (
                <main>
                    <section className="mobile-card" key={index}>
                        <p style={{marginTop: '1rem'}}>
                            <span><img src={purchase?.location} className="mobile-image" alt="product" /></span>
                            <span className="mobile-name" data-testid="mobileProductName">{purchase?.name}</span>
                            <span className="mobile-price">${pPrice[index]}</span>
                        </p>
                        <p className="mobile-description">
                            {purchase?.description}
                        </p>
                        <p className="mobile-purchase-date">Purchase Date</p>
                        <p className="mobile-date"><time>{pDate[index]}</time></p>
                    </section>
                </main>
            ))}
        </section>
    } else {
        return <section className="desktop-purchases">
            <h2 className="desktop-header" data-testid="purchases">Purchases</h2>
            {loading && <section style={{marginLeft: '15px'}}>Data is loading. Please hold...</section>}
            {error && (
            <section style={{marginLeft: '15px'}}>{`There is a problem fetching the data - ${error}`}</section>
        )}
        <main>
            <table>
                <tr>
                    <th width="15%">Name</th>
                    <th width="8%">Location</th>
                    <th width="10%">Purchase Date</th>
                    <th className="table-category-header" width="10%">Category</th>
                    <th width="20%">Description</th>
                    <th className="table-price-header" width="5%">Price</th>
                    <th width="5%"></th>
                </tr>
                    {data && data.map((purchase, index) => (
                <tbody>
                        <tr key={index}>
                            <td className="table-name" data-testid="desktopProductName">
                                <b>{purchase.name}</b>
                            </td>
                            <td className="table-location">
                                <img src={purchase?.location} className="table-product-image" alt="product"/>
                            </td>
                            <td className="table-purchase-date"><time>
                                {pDate[index]}
                                </time>
                            </td>
                            <td className="table-category">
                                <span className="table-category-box">{purchase.category}</span>
                            </td>
                            <td className="table-description">
                                {purchase.description}
                            </td>
                            <td className="table-price">
                                ${pPrice[index]}
                            </td>
                            <td className="table-dots">
                                &#8942;
                            </td>
                        </tr>
                </tbody>
                    ))}
            </table>
        </main>
    </section>
    }
}
