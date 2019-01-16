# Tee Times App
## Origin Story
My partner, Collin Argo, Co-founder of Tee Times and I both realized we had a passion not only for web developing, but also when it came to golfing. We came up with this idea thanks to Hoover Country Club based in Birmingham, Alabma. Hoover Country Club currently does not have a way to set a tee time's online so we jumped at the opportunity of trying to make that possible. This app allows for users to log in, set and edit teetimes with specific options(walk/ride, etc) to choose from. This app also allows for users to add other members as friends and add them to future tee times.

## Stack
- We used a MERN stack to develop this app
- Built using Redux and React bootstrapped with create-react-app 
- React used to update multiple values on the scorecard simultaneously
- Uses Redux to track overall status of the game and to integrate with a planned future backend. 
- Includes React Router to navigate the app and to select holes to edit.
- MongoDB, Express was what we used for our databas. 

## Development
- This was our final Capstone Project as we finish up at Digital Crafts full stack immersive bootcamp.
- Developed through a series of iterative development cycles.
- Began with a list of features we wanted and as well as possible issues that might arrive.
- Addressed each of them one by one on seperate git branches.
- We would then start the same cycle again after merging the changes to master.

### How It Works
- User is brought to a login page where they can register if needed.
- From there the user will be brought to their dashboard. 
- At this point the user can see if they have any upcoming tee times.
- The user then has the option of clicking on a nav bar at the top of the page where they can go to their edit profile page, set a tee time page or the friends page where they can add other members in their club as friends so they can schedule future tee times together.

### Guts
#### Redux
- Entire state of the app is maintained at the top level of the app
- State passed down to scorecard components
- Store mostly setup to hold all of the user's rounds and courses as well as the current round and course
- For the MVP, these are the same.

#### React Router
- Sits at the top of the app
- Directs traffic to components appropriately
- Eventually will be helpful in sending the user to a login page and displaying different courses or holes
- Right now employed to select holes to add shots or edit par
- Involves a combination of route paraments and dynamic links.

## Deployment
- Available as a live demo at 
https://evanprocter.com
- Registered with Google Domains and is hosted on an AWS server
- PM2 is used to run the app continuously
- nginx directs network traffic to it
- certbot was used to generate SSL certificates for the site

## Challenges
- different perspectives on certain features and ideas
- paradox of choice
- learning new technology(MongoDB)
- time

## Future Plans
- include Country Club reservations and calendar for dinner and future events
- integrate Collin's scorecard app which can be found: https://scorecard.collinargo.com 
- make it accessible to tennis players as well and other sports like swimming along with golf and allowing these users to set times for lessons and other events.