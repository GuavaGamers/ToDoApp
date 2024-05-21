const sequelize = require('./db')
// const User = require('../models/User')
// const Note = require('../models/Note')

//import my newly associated model
const { Note, User, Todo } = require('../models/index')

const userData = require('../seeds/user_data')
const noteData = require('../seeds/note_data')
const toDoData = require('../seeds/toDo_data')



function seedDB(){
    sequelize.sync({ force: true }).then(() => {
        //indicate to our console that our db has been cleared and recreated
        console.log('All tables were successfully dropped and recreated')

        //create the user and notes entries for our db
        //model.create() -> Promise -> const userPromises = [{promise Pending},{promise Pending},{promise Pending}]
        //iterate through our data -> User.create(user)
        const userPromises = userData.map((user) => {
            //User.create(user)
            return User.create(user)
        })

        const notePromises = noteData.map((note) => {
            return Note.create(note)
        })

        const toDoPromises = toDoData.map((todo) => {
            return Todo.create(todo)
        })

        //resolve all the promises from userPromises + notePromises 
        return Promise.all([...userPromises, ...notePromises, ...toDoPromises])

    }).then(() => {
        console.log('All users, notes, and todos have been created and seeded successfully')
    })
    .catch((error) => {
        console.error("Error syncing our models or problem with seeding our database", error)
    })
} 

//invoke the function to seed information into
seedDB()