Angular-Friends
==============


##Objectives
Learn Basic Angular Concepts by creating a searchable, filterable list of friends

###Step 1: Install Angular
The angular script has already been included in the project.
In step one you will create an app variable and your FriendController. We have already provided the appropriate files and outlined a structure for you.
* Create an app variable for your angular app in app.js (this should be one line). You can name your app whatever your want
* Create a FriendController in the FriendController.js file
* Add the ng-app and ng-controller attributes to index.html in order to attach your controller to your html
* Test your controller by adding a scope variable called 'test' with the value 'Hello World' and then bind the variable in index.html {{test}} to see if your controller is working

###Step 2: Load the friend Information
In step two we will paste the fake data into our application
* In the FriendController copy the data from friend-data.json into a scope variable called 'friends' in your FriendController
* Add a {{friends}} to the html page and refresh so that you can see all of your friend data show up.
* Delete {{friends}} from your html

###Step 3: Display friend information
* Use ng-repeat to create a new li for each person in the person array
* use `{{variable.property}}` bindings to fill the user's picture and data into the li content

###Step 4: Add a search filter on the friends
Let's add a filter that will take a user inputted string and only display models that contain that string.
Note that the filter searches all attributes of the model recursively.
* Use ng-model (on the input) to add an attribute called searchTerm to your FriendController scope to store the value of the search term inputted by the user
* Add a filter to your ng-repeat attribute to filter on the search term

###Step 5: Split the filters into 2: name and location
Let's make our search more specific. Our input from Step 4 will now search only the name.
We will also create a location search input.
* Refactor the search you implemented in Step 4 to only search on a friend's name
* Create a second input and searchTerm variable for a friend's location
* Add the location specific filter

###Step 6: Make the list sortable
* Create two variables in your friend controller, one for the attribute to sort on and another boolean for an ascending vs descending sort
* Add a value="" to each item in the list of options. This value needs to equal the value of the property, on each object, in your array that you want to sort by
* Bind the variables to their respective select elements using ng-model
* Add the ordering logic to your filter
** Sample syntax      | orderBy: propertyName : isReversed
** See https://docs.angularjs.org/api/ng/filter/orderBy

###Step 7: Black Diamond
* Use ng-options and an array to create the filter options

##Resources
* Controller scopes http://jsfiddle.net/8pX7p/
* ng-repeat http://jsfiddle.net/PhCUk/1/
* Filter http://jsfiddle.net/WS8gS/1/
* http://docs.angularjs.org/guide/concepts
