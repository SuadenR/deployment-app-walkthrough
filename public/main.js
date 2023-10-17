let myButton = document.querySelector('button')
let myDiv = document.querySelector('div')
// let newcatButton = document.querySelector('newCatButton')
let newCatForm = document.querySelector('#newCatForm')
let newCatInput = document.querySelector('#newCat')

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
});

newCatForm.addEventListener('submit', (event) => {
        event.preventDefault()
        let newCatValue = newCatInput.value
        axios.post('/cat', {newCatValue})
        .then((response) => {
            let newCat = response.data
            console.log(newCat)
        })
})
