import Express from 'express'
import BodyParser from 'body-parser'
import Cors = from 'cors'
import Chatkit from '@pusher/chatkit-server'

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:eaa11770-0fc4-4e98-859d-12cc04bf7e91',
  key: 'c718aa5d-9fe8-44a3-abc0-6671c7751934:qpxEug07cETs0FSNVoUgkahj3gHSZusQ7Kb3SjzcM00='
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/user', (req, res) =>{
  const {username} = req.body
  chatkit
    .createUser({
      name: username,
      id: username
    })
    .then(()=>res.sendStatus(201))
    .catch(error => {
      if(error.error_type === 'service/chatkit/user_already_exists')
      {
        res.sendStatus(200)
      } else {
        res.Status(error.statusCode).json(error)
      }
    })
})

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
