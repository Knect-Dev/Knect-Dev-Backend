# Knect.dev

<div id="top"></div>


<!-- PROJECT SHIELDS -->
<!--
*** Template us "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
<!-- [![LinkedIn][linkedin-shield]][linkedin-url] -->



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Knect-Dev/Knect-Dev-Backend">
    <img src="img/knect-logo.png" alt="Logo" width="300" height="220">
  </a>

<h3 align="center">Knect.Dev</h3>

  <p align="center">
    Knect.Dev description
    <br />
    <a href="https://github.com/Knect-Dev/Knect-Dev-Backend"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Knect-Dev/Knect-Dev-Backend">View Demo</a>
    ·
    <a href="https://github.com/Knect-Dev/Knect-Dev-Backend/issues">Report Bug</a>
    ·
    <a href="https://github.com/Knect-Dev/Knect-Dev-Backend/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#uml">UML</a></li>
    <li><a href="#data-models">Data Models</a></li>
     <ul>
        <li><a href="#user-model">User Model</a></li>
        <li><a href="#job-model">Job Model</a></li>
        <li><a href="#company-model">Company Model</a></li>
        <li><a href="#company-model">Contact Model</a></li>
      </ul>
    <li><a href="#access-control-list">Access Control List</a></li>
    <li><a href="#routes">Routes</a></li>
         <ul>
        <li><a href="#user-routes">User Routes</a></li>
        <li><a href="#job-routes">Job Routes</a></li>
        <li><a href="#company-routes">Company Routes</a></li>
        <li><a href="#auth">Auth</a></li>
      </ul>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[Deployed Page](https://www.knect.dev/home)
<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

This project currently implements phase one (backend) of a two phase project (full web application deployment).

The Goal of this project is to create a Targeted Companies & High-Volume Tracking List that allows those seeking jobs to effectively document the jobs they have applied for as well as thier most up to date interactions. Phase one, the backend of this project, focused on building and deploying a reliable backend with robust schemas and database models. Phase two, the frontend portion, focused on building a user-friendly interface in React with and Ionic framework to streamline data input as well as visualize metrics in real time of your job search.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

General:
* [JavaScript](https://www.javascript.com/)
* [Git](https://git-scm.com/)
* [GitHub](https://github.com/)
* [ThunderClient](https://www.thunderclient.com/)
* [Postman](https://www.postman.com/)

Frontend:
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Ionic](https://ionicframework.com/)
* [Sass](https://sass-lang.com/)

Backend:
* [node.js](https://nodejs.org/en/)
* [jest](https://jestjs.io/docs/getting-started)
* [aws-sdk](https://aws.amazon.com/sdk-for-javascript/)
* [base-64](https://www.base64decode.org/)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [dotenv](https://github.com/motdotla/dotenv)
* [PostgreSQL](https://www.postgresql.org/)
* [express](https://expressjs.com/)
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
* [nanoid](https://github.com/ai/nanoid)

Hosted On:
* [heroku](https://id.heroku.com/)
* [netlify](https://www.netlify.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

This project uses npm node package manager to install the required modules.

### Installation: Backend

1. Clone the repo
   ```sh
   git clone https://github.com/Knect-Dev/Knect-Dev-Backend.git
   ```
2. Install NPM packages
   ```sh
   npm install i
   ```
3. Enter your API in `.env`
   ```js
    PORT = 3000
    API_KEY = 'ENTER YOUR API';
    SECRET = 'YOUR SECRET';
   
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

### Installation: Frontend

1. Clone the repo
   ```sh
   git clone https://github.com/Knect-Dev/Knect-Dev-Frontend.git
   ```
2. Install NPM packages
   ```sh
   npm install i
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

1. Create a new user account or sign in to an existing account.

2. Upon signing in for the first time, the Jobs list will be blank, so click on the green (+) button in the upper right corner to open up the form for adding a new Job opportunity to your collection.

3. In the form that pops up, click the padlock icon in the bottom left corner to unlock the form for and begin editing.

4. `Job Title` and `Company` are required fields; all others are optional.

5. To add or change the company, type part of `search companies` to see if the company already exists in the database. 


<!-- _For more examples, please refer to the [Documentation](https://example.com)_ -->

<p align="right">(<a href="#top">back to top</a>)</p>

## UML

![uml](img/knectdev.PNG)

<p align="right">(<a href="#top">back to top</a>)</p>

## Data Models
This project utilized dynamoose and DynamoDB and the following data models...
* Users, contains all information for the user (essentially a user profile), this is created at /signup, and the id and email must be unique for each user.
* Jobs, these objects contain information about a specific job position at a company and are owned by the user who creates it
* Companies, these objects provide general company information, anyone can create one, and update it with the most recent information. The thought process here is that there is only one company ever created, and can be updated for everyone with the most information.

### User Model
``` Javascript
'Users' {
  id: PRIMARY KEY, required,
  name: STRING, required,
  password: STRING, required,
  token: STRING, required,
  email: STRING, required,
  role: STRING, required,
}
```
<p align="right">(<a href="#top">back to top</a>)</p>

### Job Model
``` Javascript
'Jobs' {
  id: PRIMARY KEY, required,
  company: STRING, required,
  title: STRING, required,
  jobId: STRING,
  jobUrl: STRING,
  appliedDate: DATE,
  stage: STRING, required,
  status: BOOLEAN, required,
  openPositions: INTEGER,
  location: STRING,
  technologies: STRING,
  targeted: BOOLEAN, required,
  offer: INTEGER,
  notes: STRING(1250),
}
```
<p align="right">(<a href="#top">back to top</a>)</p>

### Company Model
``` Javascript
'Companies' {
  id: PRIMARY KEY, required,
  name: STRING, required,
  logo: STRING,
  leader: STRING,
  founded: STRING,
  hq: STRING,
  size: INTEGER,
  product: STRING,
  clients: STRING,
  mission: STRING(500),
  companyUrl: STRING,
  careersUrl: STRING,
}
```

<p align="right">(<a href="#top">back to top</a>)</p>

### Contact Model
``` Javascript
'Contacts' {
  id: PRIMARY KEY, required,
  name: STRING, required,
  company: STRING,
  position: STRING,
  email: STRING,
  linkedIn: STRING,
  phone: STRING,
  photo: STRING,
  notes: STRING,
}
```
<p align="right">(<a href="#top">back to top</a>)</p>


## Data Associations and User Experience

We decided early on that we wanted to use a relational database model for a few reasons:
1. We wanted our Users to have a unique user experience, and allow them to create Jobs that were unique to them
  - We did this by setting UserId within the Job record on creation, establishing a One-to-Many association between Users and Jobs. 
  - Upon logging in, the User's unique jobs will render to the screen.
2. We also wanted our Companies to be community based, meaning a Company is created once, then edited by all
  - Companies also have a unique id, and Job records utilize this when created or edited, and create an association within the database.
  - When a change is made to a company by a User, the database is updated and the new info is propogated to all other Users.
3. The Jobs are the crux of the application, in functionality as well as associations
  - Jobs, as mentioned before, contain both a UserId and a CompanyId which establish associations between all three models.
  - These associations are then used to conditionally render the Company associated to the job, and the Contacts related to both the Job and the Company
4. Lastly, Contacts are related to all three of the previous models
  - The Contacts are rendered based on UserId, JobId, and CompanyId.

<p align="right">(<a href="#top">back to top</a>)</p>

## Access Control List
- `admin`
  - read, create, update, and delete
  - can't create jobs
  - can't create users (must be done through /signup)
  - can't maintain their own job list
- `user`
  - read, create, update, and delete, their own jobs
  - can't delete companies
  - can't create users (must be done through /signup)

<p align="right">(<a href="#top">back to top</a>)</p>

## Routes

### User Routes
- GET by Id
  - requires: token, user id
  - returns: status 200, object containing user information
  - admin: can do this for any user
  - user: can do this for only themselves
- GET (all)
  - requires: token
  - returns: status 200, list of all user objects
  - admin: has access
  - user: access denied
- PUT
  - requires: token, user id
  - returns: status 202, update user object
  - admin: access to update any user
  - user: acces to update their own information
- DELETE
  - requires: token, user id
  - returns: status 200
  - admin: access to delete any user
  - user: access to delete their own information

<p align="right">(<a href="#top">back to top</a>)</p>

### Job Routes
- GET by Id
  - requires: token, job id
  - returns: status 200, object containing job information
  - admin: can do this for any job
  - user: can only do this for jobs they own
- GET (all)
  - requires: token
  - returns: status 200, list of all job objects
  - admin: access to all jobs
  - user: can only do this for jobs they own
- CREATE
  - requires: token
  - returns: status 201, created job object
  - admin: cannot create jobs
  - user: create thier own jobs
- PUT
  - requires: token, job id
  - returns: status 202, update user object
  - admin: access to all jobs
  - user: can only do this for jobs they own
- DELETE
  - requires: token, jobs id
  - returns: status 200
  - admin: access to all jobs
  - user: can only do this for jobs they own

<p align="right">(<a href="#top">back to top</a>)</p>

### Company Routes
- GET by Id
  - requires: token, company id
  - returns: status 200, object containing company information
  - admin: can do this for any company
  - user: can do this for any company
- GET (all)
  - requires: token
  - returns: status 200, list of all company objects
  - admin: access to all companies
  - user: access to all companies
- CREATE
  - requires: token
  - returns: status 201, created company object
  - admin: can create a company
  - user: can create a company
- PUT
  - requires: token, company id
  - returns: status 202, update user object
  - admin: can update all companies
  - user: can update all companies
- DELETE
  - requires: token, companies id
  - returns: status 200
  - admin: can delete all companies
  - user: cannot delete companies

<p align="right">(<a href="#top">back to top</a>)</p>

### Contact Routes
- GET by Id
  - requires: token, contact id
  - returns: status 200, object containing contact information
  - admin: can do this for any contact
  - user: can only do this for contacts they own
- GET (all)
  - requires: token
  - returns: status 200, list of all contact objects
  - admin: access to all contacts
  - user: can only do this for contacts they own
- CREATE
  - requires: token
  - returns: status 201, created contact object
  - admin: cannot create contacts
  - user: create thier own contacts
- PUT
  - requires: token, contact id
  - returns: status 202, update user object
  - admin: access to all contacts
  - user: can only do this for contacts they own
- DELETE
  - requires: token, contacts id
  - returns: status 200
  - admin: access to all contacts
  - user: can only do this for contacts they own

<p align="right">(<a href="#top">back to top</a>)</p>

### Auth
- POST `/signup` creates new user requiring first name, last name, email, and password
- POST `/signin` requires email and password (basic authentication)

<p align="right">(<a href="#top">back to top</a>)</p>


## Roadmap

- [x] Full CRUD Users w/bearer authentication
- [x] Full CRUD Jobs
- [x] Full CRUD Companies
- [x] Front End Ionic/React Interface


See the [open issues](https://github.com/Knect-Dev/Knect-Dev-Backend/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>


## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

## License

Distributed under the MIT License. See [`LICENSE`](/LICENSE) for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

Spencer Tower - [Github](https://github.com/SpencerTower) - [Linkedin](https://linkedin.com/in/spencertower/)

Kellen Linse - [Github](https://github.com/Kellen-Linse) - [Linkedin](https://www.linkedin.com/in/kellen-linse/)

Matt Miguel - [Github](https://github.com/jamiguel23) - [Linkedin](https://www.linkedin.com/in/jamiguel23/)

Erik Savage - [Github](https://github.com/eriksavage) - [Linkedin](linkedin.com/in/erikksavage)

Chris Harden - [Github](https://github.com/HardenChris) - [LinkedIn](linkedin.com/in/hardenchristopher00)

Project Link: [https://github.com/Knect-Dev/Knect-Dev-Backend](https://github.com/Knect-Dev/Knect-Dev-Backend)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* Jacob Knaack
* The Squad
* Family and Friends
* README.md template provided by [othneildrew](https://github.com/othneildrew/Best-README-Template)


<p align="right">(<a href="#top">back to top</a>)</p>

## Resources

- [Choosing the Right DynamoDB Partition Key](https://aws.amazon.com/blogs/database/choosing-the-right-dynamodb-partition-key/)
- [Dynamoose Getting Started](https://dynamoosejs.com/getting_started/Introduction)
- [DynamoDB Docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html)
- [Object references and copying](https://javascript.info/object-copy)
- [MDN Web Docs](https://developer.mozilla.org/en-US/)
- [jest documentation](https://jestjs.io/docs/getting-started)
- [stackoverflow](https://stackoverflow.com/)



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Knect-Dev/Knect-Dev-Backend.svg?style=for-the-badge
[contributors-url]: https://github.com/Knect-Dev/Knect-Dev-Backend/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Knect-Dev/Knect-Dev-Backend.svg?style=for-the-badge
[forks-url]: https://github.com/Knect-Dev/Knect-Dev-Backend/network/members
[stars-shield]: https://img.shields.io/github/stars/Knect-Dev/Knect-Dev-Backend.svg?style=for-the-badge
[stars-url]: https://github.com/Knect-Dev/Knect-Dev-Backend/stargazers
[issues-shield]: https://img.shields.io/github/issues/Knect-Dev/Knect-Dev-Backend.svg?style=for-the-badge
[issues-url]: https://github.com/Knect-Dev/Knect-Dev-Backend/issues
[license-shield]: https://img.shields.io/github/license/Knect-Dev/Knect-Dev-Backend.svg?style=for-the-badge
[license-url]: https://github.com/Knect-Dev/Knect-Dev-Backend/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
