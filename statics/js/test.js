const randomArray = (length, max) =>
    Array(length).fill().map(() => Math.round(Math.random() * max))
console.log(randomArray(5, 147))

////////////////////////////////////////////////////////////////
var api_ulr = 'products-data.json';
fetch(api_ulr)
    .then(response => response.json())
    .then(proData => {           
        
        
        const randomArray = (length, max) =>
            Array(length).fill().map(() => Math.floor(Math.random() * max))
        console.log(randomArray(4, proData.length))
        
        
    })
    .catch(err => console.log("Data Error"));