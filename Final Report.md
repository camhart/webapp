Final Report
============

Description
-----------
Virtual Pedigree allows users to quickly view, edit, and search genealogical data without having to switch contexts.  You can import a gedcom file to populate existing data into our system.  The minimap gives an overview of where you are in the tree.  Changes occur in real time and are saved to the user's account.

Database Schema
---------------
User Table
```
[
  {
    "email": camhart73@gmail.com, »
    "gender":  "male" ,
    "googleid":  "############" ,
    "id":  "#########################" ,
    "name":  "Cam Hart"
  },...
]
```
The email and the id are the unique identifiers for this document.  Each time someone logs in with a new oauth it will search based on the email and link any existing accounts.  Name represents the name of the user.  Each oauth id (googleid, twitterid, facebookid, etc) represents the id to their account.

Data Table
```
[
  {
    "children": [
      "1_19M8-PB"
    ] ,
    "husband":  "1_19M7-33" ,
    "id":  "1_00016465" ,
    "marriage": {
      "date":  "4 NOV 1816" ,
      "place":  "Sandy, Bedfordshire, England"
    } ,
    "wife":  "1_19M7-48"
  } ,...
```
This table consist of genealogical data for an individual person.  It links their children and spouse(s) to them as well.

Contributions
-------------
Ryan - I built the core Virtual Pedigree algorithm in JavaScript and AngularJS, as well as built most of the front end of the web page. Pretty much everything that is sent to the client was written by me, with the exception of public/js/core/vp-mapPoint.js and other mapPoint or miniMap code, which was written by Adam. I also wrote most of the GEDCOM parser.

Jason - I spent most my time working on the backend. We decided to use NodeJS (with Express) and Rethinkdb. Having never previously used these technologies, it was a learning experience. I set up the initial app, linked all the pieces together, and provided a framework for the team to easily build upon. Furthermore, I developed the initial REST API and a gui to test our API. With the help of Ryan I added sessions. After Cameron had done some initial work with using Google's OAuth, I implemented login with OAuth for Twitter, Facebook, FamilySearch, Github, and Google using a NodeJS module. (Note: Login with FamilySearch has a redirect URI registered for localhost. However, our current (temporary) server is not registered as a valid redirect uri)

Cameron - Almost all of my work occured on the back end of the server.  Our first goal was to get our protocol working so we could add, update, and detele User and Person data from the database.  User data represented someone logging into the webapp.  Person data represented the geneological data for an individual person.  Jason implemented the individual actions here, and then I got the batch actions working (so we could delete/add/update multliple users/person data objects with just a single request).  I also modified our protocol.js test page to allow us to test some of those batch actions.  After some time we realised our protocol wasn't sufficient for what we needed.  We needed to be able to represent families and all of the data associated with them.  Once we realised this, Jason and I worked together simultaneously to make the appropriate changes.  Jason then tested and debuged those changes on his own, while I started working on OAuth using Google.  I implemented google's OAuth into our application by hardcoding it (was later changed to using passportjs).  I also created each of the reports for submission.

Adam -


Future Work
- [ ] topological dates
- [ ] speed up gui
- [ ] real time updates across users

Link to site
virtualpedigree.no-ip.org
virtualpedigree.byu.edu
(both point to same server)

Link to github
https://github.com/camhart/webapp