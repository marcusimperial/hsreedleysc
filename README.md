# SC Website (hsreedleysc) v1.0.0 Release

This is the repository and codebase for the [Reedley International School High School Student Council SY 2021-2022's Website](https://www.hsreedleysc.com). 

---

## Technologies

This project generally uses technologies from the [JavaScript MERN stack](https://www.geeksforgeeks.org/mern-stack) and operates through the [Google Cloud Platform](https://cloud.google.com). They are as follows:

* Database: [MongoDB](https://www.mongodb.com)
* Server Framework: [ExpressJS](https://expressjs.com)
* Frontend Framework: [ReactJS](https://reactjs.org)
* Engine Framework: [NodeJS](https://nodejs.org)
* Authentication Provider: [Google Firebase Auth](https://firebase.google.com/products/auth)
* Hosting Service: [Google App Engine](https://cloud.google.com/appengine)
* Storage Service: [Google Cloud Storage](https://cloud.google.com/storage)
* Others: [Git](https://git-scm.com/), [Node-fetch](https://www.npmjs.com/package/node-fetch), & [Dotenv](https://www.npmjs.com/package/dotenv)

## General Features

This project works as a Full-Stack application meaning that both the backend and the frontend code are unified under one codebase. 


### Routes and Auth System

When users visit the site, they are automatically brought to the **/login** route, the only unprotected route, if the user is not logged in. Authentication is only available through Google Sign-In and access to the website is restricted to users within a specific domain (risfamily.com). This means that **users with google accounts that do not end with this domain will not be granted access**.

Upon a successful login, firebase generates a token that is then sent to the backend. If the token is verified, it sets a JWT as a cookie to the user. **This is the same JWT token that the server will look for in verifying a user's access to all protected routes**. All routes created on the frontend through react-router are matched on the backend through express. 

### Pages and Admin Interface

The website allows for the creation of **"pages"** through the admin interface. **This specific route is only accessible by a specific list of individuals**. Essentially, the interface works as a form wherein the user has to input specific information that is recorded in the database. If media is added, it is also uploaded to the storage. 

Every time the website is visited, react sends an api request to the backend which, in turn, returns the data of the page requested based on the route (for example: /project). React will asynchronously send a request to the backend for *ALL* pages to optimize loading time on other pages. 

Finally, specific components will serve content or **"posts"** based on the data that it receives. This is supported by a custom CSS framework to ensure that the post follows the website theme. There is also a built-in algorithm that sorts the design styles based on both the number of posts and the number of available layouts. These posts are also available at the Home page of the website, sorted chronologically in descending order.

## Testing in a Local Environment

In cloning any NodeJS project, ensure that you type **npm install** in the command prompt or terminal to ensure that all dependencies are installed.

    npm install

Create a build of the react project to create the website.

    npm run build

In order to test the codebase in a local environment, you must first create a .env file and ensure that all firebase configuration variables (REACT_APP_FIREBASE_XX) of the frontend app, the MONGODB_URI of the database, and the GOOGLE_APPLICATION_CREDENTIALS of the service account for the firebase admin app are set. 

Since this project relies on **Google's Application Default Credentials (ADC)**, you must perform the following commands in order to ensure all of google's services are authenticated.

    gcloud auth application-default login --impersonate-service-account=[FIREBASE SERVICE ACCOUNT EMAIL]

    gcloud auth application-default login --impersonate-service-account=[CLOUD STORAGE SERVICE ACCOUNT EMAIL]

Once this is complete, run **npm start** to start the server. It will run at http://localhost:3001 unless otherwise specified. 

    npm start

## Current Issues or Upcoming Features

It is important to note that **the issues or features listed here are non-critical and neither pose any vulnerabilities to the project nor security risks**. These items are primarily visual or functionality related and are only necessary for either streamlining the codebase or further improving the website. 

### CSS Code Consolidation

The CSS for the frontend is currently unorganized as most components have their own separated files. This makes it significantly more difficult to create new components and features as there are no standard references to work with. 

### Admin Interface Updates

As it stands, the only features available in the admin interface are being able to create a page and being able to add a post.

#### Delete Option

The ability to delete both pages and posts through their IDs. For pages, the route serves as its ID. For posts, an ID should be generated.

#### Page/Post Stacking

The ability to create multiple pages and posts in one request or form submission. Inversely, the ability to delete muliple pages and posts at once. In both operations, users should have the ability to add or delete an instance of a form (for page or post) in case they accidentally create either too many or too little stacked forms. 

#### File and Data Submission Tracking

As it stands, the size of both attached files and data are neither restricted nor tracked. Files should be restricted to 5MB and data to 1MB. 

#### Google Drive to Google Cloud Storage File Integration

The ability to let a user select files in Google Drive and programmatically upload it into Cloud Storage. 


### Feedback Page Addition

There is currently no official medium in the website to formally provide feedback, send inquiries, or make suggestions. 


### Home Page Updates

Compared to earlier releases in testing, there is no section listing the organization's members or contributors/designers. This should include their actual image, name, position, and an optional description. 