Final Report
============

Description
-----------
Virtual Pedigree allows users to quickly view and edit geneological data, without having to switch contexts.  They can import a gedcom file to import existing data into our system.  They can search across all user data, and this search.

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
This table consist of data for an individual person.  It links their children and spouse(s) to them as well.

Contributions
-------------
Ryan - I built the core Virtual Pedigree algorithm in JavaScript and AngularJS, as well as built most of the front end of the web page. Pretty much everything that is sent to the client was written by me, with the exception of public/js/core/vp-mapPoint.js and other mapPoint or miniMap code, which was written by Adam.

Jason -

Cameron - Almost all of my work occured on the back end of the server.  Our first goal was to get our protocol working so we could add, update, and detele User and Person data from the database.  User data represented someone logging into the webapp.  Person data represented the geneological data for an individual person.  Jason implemented the individual actions here, and then I got the batch actions working (so we could delete/add/update multliple users/person data objects with just a single request).  I also modified our protocol.js test page to allow us to test some of those batch actions.  After some time we realised our protocol wasn't sufficient for what we needed.  We needed to be able to represent families and all of the data associated with them.  Once we realised this, Jason and I worked together simultaneously to make the appropriate changes.  Jason then tested and debuged those changes on his own, while I started working on OAuth using Google.  I implemented google's OAuth into our application by hardcoding it (was later changed to using passportjs).  I also created each of the reports for submission.

Adam -


Future Work
- [ ] topological dates
- [ ] speed up gui
- [ ] real time updates across users