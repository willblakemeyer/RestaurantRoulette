# Initial Security Statement
> Our project idea will be creating a website that is able to show the local Restaurants around the user's general locations,
> giving a list of all that are in a general range, putting them into a wheel, and returning a random restaurant.
>
> This security statement will tell the potential security concerns as well as the general idea of how we as a team plan to mitigate concerns.
> - The application will be hosted by GitHub pages. GitHub pages enforces https by default.
> - The application will only be sending information to Google Maps API and with https, the location of the user will be secure.
> - If we are not able to figure out the geolocation API built into each browser we will need to implement security on input. Security measures must include:
> - - Defense against brute force attacks (Avoiding overloading the web-application)
>   - Ensuring defense + error handeling of potential blacklisted words. Include a parser that will attempt to filter out words that may break the API. 
