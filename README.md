# Pack&Paddle

## Description

_Duration: 2 Week Sprint_

Packing for any outdoor adventure without a proper list can be a challenge that leaves you deep into the woods with at least one item you should not have forgotten. Pack&Paddle is designed to help make sure that does not happen on your next trip to the Boundary Waters Canoe Area. 

Pack&Paddle helps you create packing lists for gear, food, and helps generate a shopping list for your pre-adventure trips to the store. You can also assign packing responsibilities to other paddlers on the trip. Keeping your multiple trips seperate is easy with each outing being assigned to you entry point and entry date.

To see the fully functional site, please visit: [DEPLOYED VERSION OF APP](https://packpaddle-f52fc12a411d.herokuapp.com/#/home)

## Screen Shot

![Screenshot 2024-09-02 at 8 00 59 PM](https://github.com/user-attachments/assets/0b0b8a8d-9149-4f7c-96c0-74e4b8065423)

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- [Postico](https://eggerapps.at/postico2/)
- [Postgres](https://www.postgresql.org/)

## Installation

How do you get your application up and running? This is a step by step list for how another developer could get this project up and running. The good target audience in terms of knowledge, would be a fellow Primer from another cohort being able to spin up this project. Note that you do not need a paragraph here to intro Installation. It should be step-by-step.

1. Create a database named `paddle`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage
How does someone use this application? Tell a user story here.

1. Create a username and password, or log in if you already have an account.
2. On the trip page, you will be able to revisit previously created trips or click a button on the bottom to create a new trip.
3. If creating a new trip, select your entry point and entry date from the drop downs, then proceed to the next page. Add the other paddlers who will be joining on the trip.
4. The dashboard gives you access to the lists via accordian dropdowns. Clicking on meal list or gear list will expand the accordian, displaying the list and the button to navigate to the page where new items are added.



## Built With

React, Redux, Node.js, Express, Postgress, Material UI
## License
[MIT](https://choosealicense.com/licenses/mit/)


## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. More specifically, thank you to Andrew Harasymiw, Chris Black, Julian Chatterton, and Noah Seo for helping with idea generation and in-depth questions.

