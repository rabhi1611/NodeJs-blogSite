const exp = require('express');

const bodyParser = require('body-parser');

const _ = require('lodash');
const { padStart } = require('lodash');

const app = exp();

app.set('view engine', 'ejs');

app.use(exp.static('public'));

app.use(bodyParser.urlencoded({extended : true}));

try{

    let data = [
        {
            title: "Blog Application",
            Details: "This was first major web app of my web development courier",
            email_id: 'rabhi1611@gmail.com',
            date: '19 Jan 2023 11:30 PM',
        },

        {
            title: "Resume Builder Application",
            Details: "This was my first web app which i build on my own from scratch",
            email_id: 'rabhi1611@gmail.com',
            date: '19 Jan 2023 11:30 PM',
        },

        {
            title: "To-Do Application",
            Details: "I liked this app as i had coded it by taking reference of some part of it from external source",
            email_id: 'rabhi1611@gmail.com',
            date: '19 Jan 2023 11:30 PM',
        },

        {
            title: "My Portfolio",
            Details: "This is the project which i still like to work upon!",
            email_id: 'rabhi1611@gmail.com',
            date: '19 Jan 2023 11:30 PM',
        }
    ];


    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);

    app.get('/', (req, res) => {

        res.render('index', {time: day, lists: data});
    });

    app.get('/create', (req, res) => {
        res.render('create', {time: day, lists: data});
    });

    app.post('/create', (req, res) => {
        console.log(req.body);

        let temp = {
            title: req.body.title,
            Details: req.body.Description,
            email_id: req.body.email,
            date: day,
        };
        console.log(temp);
        data.push(temp);
        res.redirect('/');
    });

    app.get('/posts/:name', (req, res) => {
        
        let postName = _.lowerCase(req.params.name);
        //console.log(postName);
        data.forEach((post) => {
            let postTitle = _.lowerCase(post.title);
            //console.log(post);
            if(postName === postTitle){
            console.log(postTitle);
                res.render('posts', {
                    title: post.title,
                    details: post.Details,
                    time: day,
                    lists: data
                })
            }
        })
    });

}
catch(err){
    console.log(err.mesaage);
};

app.listen(3000, () => {
    console.log('Server is running at port 3000!');
});