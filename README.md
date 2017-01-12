#myGarden
___
####GA WDI Final Project<br>
#####Elliot Mountford-Brock<br>
See myGarden [here](https://my-garden-app.herokuapp.com/#!/)

---
![Imgur](http://i.imgur.com/FPEExl6.png)
<br>
###Overview
The brief for the final project was to create a fully authenticated full stack web application using Ruby-on-Rails and PostGreSQL on the back-end with JavaScript and AngularJS on the front-end. There was a specific focus on relationships between multiple models in the database. I chose to build a platform for garden designers to share their project ideas, flesh out their ideas and designs online and receive feedback and ratings from other users in the community.



###Aim
* To build a full stack application from scratch, using Ruby-on-Rails, PostgreSQL, JavaScript, AngularJS, HTML and SCSS
* To include multiple relationships and CRUD actions for at least two models
* To implement thoughtful planning and wire-framing to achieve satisfactory user journey and determine MVP
* To have a working app by deadline, deployed to Heroku
* To present my project to the rest of the group, explaining how the app functions and my working process

###Process
* First I fleshed out a few choices from a shortlist of initial possible ideas
* Once I had my project decided, I began wireframing and figured out what my MVP would be
* Next I created a Trello board to plan my steps, ordered by priority using a traffic light system
* I worked on my ERDs to decide what fields would be on each model and how each model was related
* Next I created my back-end using Ruby-on-Rails and PostGreSQL
* Once the back-end was complete, I tested RESTful routes were all working (with authentication) using Insomnia
* Next I began to build the front-end using JavaScript and AngularJS. I caught the front-end up to the back-end functionality
* Once I had a basic CRUD app working on the front-end I could add some extra functionality. Around here I added multiple image upload, the garden designs grids, AWS integration as well as likes and comments
* I added Bootstrap UI and began to style the site
* I spent the last day adding finishing touches to styling and bug-fixing/testing

###Biggest wins
* Writing the functionality for the grid design in AngularJS and figuring out how to store this in the database and re-display it to the user
* Incorporating the Amazon product advertising API to get real information on plants and materials to be added when users are uploading a project to the site

###Challenges faced
* The biggest challenge I faced was writing the garden design grid. I had done something similar when building Battleships in jQuery but had to rethink how to do certain things with Angular. It took me a while to figure out how to allow a second image to be overlaid over the background of each tile as well
* I had not consumed an external API using Ruby before but by using the HTTParty gem, it was fairly straightforward in the end

###Steps for improvement
* I plan to improve the design grid at some point to allow plants to take up multiple squares. I did play with this while building the project but had to abandon it due to time restrictions
* I initially planned to include more of a project planing element where users could input information using turf, soil, aggregate calculators. The idea is that these costs could be added to the plants and materials in each project and a final build cost could be attached to each design. This is something I would like to integrate in the future
