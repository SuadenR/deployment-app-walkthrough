let express = require('express')
let app = express()

let catDatabase = ['Sparkles', 'Jumpy']

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '1bebf8db1bcb47d4a3197ab2784ca9bd',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

app.use(express.json())

//we are going to use express.static()
//what it does, is it takes the path to a folder in my project as a parameter
//and it does some "black magic" to make it so there are GET endpoints associated with
//every file in that folder
//so once we do this express.static()
//there will be a GET endpoint, '/index.html' that serves the HTML file as a response,
//a GET enpoint, '/main.js' that serves the JS file as a response,
//a GET enpoint, '/styles.css', that serves the CSS file as a response
//a GET endpoint, '/', that serves index.html's HTML specifically
app.use(express.static(__dirname + '/public'))

app.get('/cat', (req, res) => {
    let randomIndex = Math.floor(Math.random() * catDatabase.length)

    res.status(200).send(catDatabase[randomIndex])
});

app.post('/cat', (req, res) => {
  let {newCatValue} = req.body
  // console.log(req.body)
  rollbar.info('Someone is adding a cat!')

  const index = catDatabase.findIndex(cat => {
      return cat === newCatValue
  })

  try {
      if (index === -1 && newCatValue !== '') {
        catDatabase.push(newCatValue)
          res.status(200).send(newCatValue)
      } else if (newCatValue === ''){
           rollbar.warning('The User tried to enter in a nameless cat.')
           res.status(400).send('You must name the cat.')
      } else {
           rollbar.critical('The User added in a cat that already exists.')
           res.status(400).send('That cat already exists.')
      }
  } catch (err) {
      console.log('My bobios fuction did not work at All!')
      rollbar.critical('Cat Submission error: cat submission function did not work.')
  }
})



app.listen(4000, () => {
    console.log('server up on port 4000')
})