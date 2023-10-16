let myButton = document.querySelector('button')
let myDiv = document.querySelector('div')

myButton.addEventListener('click', () => {
    axios.get('/cat')
    .then((response) => {
        let catName = response.data
        myDiv.innerHTML = ''
        let newP = document.createElement('p')
        newP.innerHTML = catName
        myDiv.appendChild(newP)
    })
    .catch((err) => {
        console.log(err)
    })
})
