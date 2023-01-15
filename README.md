This project involved setting up a book library application using postgres, sequelize, express.js and allows you to do a range of CRUD requests to the database. I am working to increase the functionality, but I have added some data below if you would like to play around 
// readers
[{
	"name": "Robert Baratheon",
	"email": "ours_is_fury@gmail.com",
    "password": "password123"
}, 
{
	"name": "Arya Stark",
	"email": "winter_is_comming@gmail.com",
	"password": "password123"
}, 
{
	"name": "Jamie Lanister",
	"email": "pays_debts@gmail.com",
	"password": "password123"
}, 
{
	"name": "Loris Tyrell",
	"email": "flower_strong@gmail.com",
	"password": "password123"
},
{
	"name": "Jon Snow",
	"email": "knows_nothing@gmail.com",
	"password": "password123"
}]

// books

[
{
"title": "Winds of Winter",
"author": "George Martin",
"AuthorId": 2,
"GenreId": 1,
"ISBN": "87D"
},
{
    "title": "Redwall",
    "author": "Brian Jacques",
"AuthorId": 1,
    "GenreId": 1,
    "ISBN": "72A"
},
{
	"title": "Dune",
"author": "Frank Herbert",
"GenreId": 2,
"ISBN": "43R"
},
{
"title": "Philosophers Stone",
"author": "JK Rowling",
"AuthorId": 3,
"GenreId": 3,
"ISBN": "85R"
},
{
"title": "A Storm of Swords",
"author": "George Martin",
"AuthorId": 2,
"GenreId": 1,
"ISBN": "37F"
}
]

// genres

[{
"genre": "Fantasy"
},
{
"genre": "Science Fiction"
},
{
"genre": "Magic"
}]


// authors
[{
"author": "Brian Jacques"
},
{
"author": "George Martin"
},
{
"author": "JK Rowling"
},
{
"author": "Frank Herbert"
}]