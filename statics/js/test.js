// const randomArray = (length, max) =>
//     Array(length).fill().map(() => Math.round(Math.random() * max))
// console.log(randomArray(5, 147))

// var api_ulr = 'products-data.json';
// fetch(api_ulr)
//     .then(response => response.json())
//     .then(proData => {


//         const randomArray = (length, max) =>
//             Array(length).fill().map(() => Math.floor(Math.random() * max))
//         console.log(randomArray(4, proData.length))


//     })
//     .catch(err => console.log("Data Error"));




fetch("https://montanaflynn-spellcheck.p.rapidapi.com/check/?text=This%20sentnce%20has%20some%20probblems.", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "7ce5b190d3msh444cb696e62c2dbp1c088bjsn026d70fdffde",
		"x-rapidapi-host": "montanaflynn-spellcheck.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});