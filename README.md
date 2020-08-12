# Let's Talk - A Forum Client Application

Let's Talk is a full stack application that allows users to make posts on a variety of topics. Users can see posts by all other users, and interact with them in the comments section. Let's Talk provides a rich user experience and draws inspiration from mainstream forum websites such as Reddit.

## Links

- Deployed Client Application: [https://areeshz.github.io/forum-client/](https://areeshz.github.io/forum-client/)
- Deployed Forum API: [https://forum-server-capstone.herokuapp.com/](https://forum-server-capstone.herokuapp.com/)
- Back-End Repository: [https://github.com/areeshz/forum-server](https://github.com/areeshz/forum-server)

## Technologies Used

Front End
- React
- Bootstrap
- HTML / CSS

Back End
- Python
- Django
- Django REST Framework
- PostgreSQL

## Images
### App Screenshots
<img width="1268" alt="Screen Shot 2020-08-11 at 10 26 25 PM" src="https://media.git.generalassemb.ly/user/27946/files/d1cb1400-dc21-11ea-9fb6-9150aa1cdf8f">
<br/>
<img width="1271" alt="Screen Shot 2020-08-11 at 10 24 11 PM" src="https://media.git.generalassemb.ly/user/27946/files/e60f1100-dc21-11ea-8eed-24cbf250acb3">
<br/>
<img width="1264" alt="Screen Shot 2020-08-11 at 10 24 56 PM" src="https://media.git.generalassemb.ly/user/27946/files/03dc7600-dc22-11ea-82e2-454581090aa1">

## Planning and Execution
Development of this application came in several iterations, each adding another feature to the Let's Talk forum application. After initial planning and the development of an Entity Relationship Diagram (ERD), the models and views were created on the back end for the 'Posts' resource. Next, 'Posts' were implemented on the front end, first with a form to allow a user to create a post, then adding functionality for viewing, editing, and deleting. A similar process was then followed for the 'Comments' resource. Finishing touches included adding separate views on the front end for different forum topics and adding styling to the application.

## Wireframes and User Stories

### Wireframes
![IMG_4544](https://user-images.githubusercontent.com/64225299/89854152-2490c700-db61-11ea-8ade-2cfff0181101.jpg)

## User Stories
1. As a user, I can add a post to the forum
2. As a user, I can edit or remove my post from the forum
3. As a user, I can see all of my posts and other users' posts on the forum
4. As a user, I can add a comment on any post
5. As a user, I can edit or remove my comments from any post
6. As a user, I can see a summary of all my actions on the forum

## Next Steps
Future goals for this application include additional features present on mainstream forum websites, such as allowing a user to create a new forum topic, to comment on a comment (create threads), and to add images to posts. Adding images would present the greatest challenge as it may require use of an additional service such as Amazon S3 to store the image files.

## Setup Steps
1. [Fork and clone](https://git.generalassemb.ly/ga-wdi-boston/meta/wiki/ForkAndClone) this repository.
2. Run `npm install` to install all dependencies.
3. Use `npm start` to serve the application on your local server.
