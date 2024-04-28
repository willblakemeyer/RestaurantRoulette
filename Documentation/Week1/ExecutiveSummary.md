# Executive Summary
---

## An Overview (problem statement)
Our application, Restaurant Roulette, will be used to remedy the challenging decision of where to go out to eat. By constructing a list of local restaurants and selecting one for the user at random, we can solve their dilemma and provide them with a unique dining experience, guaranteed. The selection criteria will vary based on their Google reviews, where a higher-rated business
(4.5/5 stars) will be selected more often than a lower-rated business (3/5 stars). This will make it less likely (but certainly not impossible) for the user to visit a more questionable restaurant. But hey, that's part of the fun.

## Our Approach (proposed solution and deliverables)
In order to provide users with this application, we will be going for a web-based design. We will build a simple webpage in HTML, CSS, and JavaScript and host it on GitHub Pages. Said webpage will get necessary information from a visitor, such as their approximate location, and send it to Google's API to determine where they would be on a map, as well as what restaurants are in the area for them. We will restrict which restaurants appear in the list based on their proximity to the user, likely with a hard limit of a certain number of miles away. Once this is done, we will take that list, convert each restaurant entry into an array that stores relevant information about the restaurant (such as its name) as well as an integer representing the "desirability" of visiting said restaurant (based on Google ratings for now). We will then randomly select a restaurant from the list by taking the desirability into account for each restaurant and then provide that restaurant's information to the user. Once that is done, the user may make their trip or do what they wish with the option we've provided them with.

## Adjusted Agile Method
To ensure the quality of our application, we as a team have decided to adjust the length of the sprints. Standups will now only occur during every other class period (ex. Stand up on Monday and then our next stand up on Friday). This allows us to use an entire class period as a standup and a full class period for the sprint. We do increase the workload during each sprint but now we have enough time to implement the required features from each standup. 

## Security Considerations (security concerns)
Please see [Security_Statements](https://github.com/willblakemeyer/RestaurantRoulette/blob/master/Documentation/Security_Statements/Initial_Statement.md) section of our documentation.
