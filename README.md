Virtual Pedigree™
======

What need does this application meet?
-------------------------------------
Genealogists everywhere struggle with current genealogical applications. They tend to be behind in their technologies and user interface design, and successful research requires many context switches between different pages and views. This frustrates genealogists and limits their ability to research because they have to focus on the software rather than their research. In addition, many of the leading software applications are only Windows compatible, expensive, or both. This application solves these problems by providing a seamless interface for all a user's genealogical data.

Why will anyone want to use it?
-------------------------------
Experienced genealogists will want to use it because it will make their research easier. We intend to give Virtual Pedigree™ a low learning curve so everyone can learn to use it.

Also, new and hobbyist genealogists will want to use it for the same reasons. Most importantly, however, the visual appeal of the application and its ease of use will draw younger people to it, greatly
expanding the number of people doing their genealogy and bringing the natural technological talent that the younger generation has.

Description
-----------
I propose to build a free web compatibility of the current applications. Elastic Paper™ is a new framework for interactive, application for anyone to use that will resolve the constant context switching and lacking seamless GUIs for hierarchical data - perfect for genealogy. The app will allow a user to build their family history and a few basic features that will help them visualize their family history, including Topological Dates™, Pedigree Perspectives™, and a mini-map of their entire recorded genealogy.

Features
--------
- [ ] Mini map*: Since users' trees can be very big and only a portion of the tree can fit on-screen at a time, we are building a mini-map that shows where the user is in relation to the whole tree. It will be interactive, allowing the user to click a spot to instantly scroll their screen to that position.
- [ ] Topological Dates*: Visualize ancestors' birth- and death-dates relative to one another using "topological" lines to show who was born or died in chronological proximity to one another.
- [ ] Import GEDCOM file*: A GEDCOM file is a universal genealogical data file. By importing it, we can allow users to easily transport their genealogy data from other services.
- [ ] Searchable*: User can search for people in their tree using name, birth-date, birth-place or any other identifying information. Possible results will be highlighted in the mini-map, allowing the user to click in that region and find the highlighted results.
- [ ] Persistent user data*: The user can edit their tree information and the changes will be saved in our database.
- [ ] Pedigree Perspectives: Select person and time to show all known information for that person at that time and hide all other extraneous information.
- [ ] Interconnected Family Trees
- [ ] Real time updates

*implemented this semester

Architecture
------------
* Database: RethinkDB
* Back-end: Node.js
* Front-end: AngularJS

Application Layout
------------------
http://54.201.103.45:8000/overview

Milestones
----------
12/2/13 https://github.com/camhart/webapp/blob/master/Milestone%2012.2.13.md <br/>
12/9/13 https://github.com/camhart/webapp/blob/master/Milestone%2012.9.13.md