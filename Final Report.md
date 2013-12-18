Final Report
============

Description
-----------
Virtual Pedigree allows users to quickly view and edit geneological data, without having to switch contexts.  They can import a gedcom file to import existing data into our system.  They can search across all user data, and this search.

Database Schema
---------------
User Table
'''
[
{
"email": camhart73@gmail.com, »
"gender":  "male" ,
"googleid":  "106105613198083240886" ,
"id":  "5f4f7ea8-6b19-4b00-89d1-dc9db74e05c5" ,
"name":  "Cameron Hartmann"
}
]
'''
<br>
Data Table
'''
put stuff here
'''

Contributions
-------------
&nbsp;&nbsp;&nbsp;&nbsp;Ryan - 
<br>
&nbsp;&nbsp;&nbsp;&nbsp;Jason - 
<br>
&nbsp;&nbsp;&nbsp;&nbsp;Cameron - Almost all of my work occured on the back end of the server.  Our first goal was to get our protocol working so we could add, update, and detele User and Person data from the database.  User data represented someone logging into the webapp.  Person data represented the geneological data for an individual person.  Jason implemented the individual actions here, and then I got the batch actions working (so we could delete/add/update multliple users/person data objects with just a single request).  I also modified our protocol.js test page to allow us to test some of those batch actions.  After some time we realised our protocol wasn't sufficient for what we needed.  We needed to be able to represent families and all of the data associated with them.  Once we realised this, Jason and I worked together simultaneously to make the appropriate changes.  Jason then tested and debuged those changes on his own, while I started working on OAuth using Google.  I implemented google's OAuth into our application by hardcoding it (was later changed to using passportjs).  I also created each of the reports for submission.
<br>
&nbsp;&nbsp;&nbsp;&nbsp;Adam - 
<br>

Future Work
- [ ] topological dates
- [ ] speed up gui
- [ ] real time updates across users