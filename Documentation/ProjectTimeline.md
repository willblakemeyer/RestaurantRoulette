# Restaurant Roulette Timeline

## Week 1
### Monday - Wednesday
- Design layout for both the main page and the wheel spinning page.
- Create basic main page and wheel page .html files.
- Add buttons to both pages and link them to functions.
- Research Google's API and see what data we're able to pull.
- Create basic class to get necessary user information.
### Wednesday - Monday
- Create .css file and settle on a color-scheme for our pages.
- Implement Google's API to pull map data, start figuring out how to pull other data.
- Integrate Google's API methods with API controller.
- Add redirect buttons / menu for navigating between main page and wheel page.
- Ensure both main page and wheel page have functioning buttons to allow for basic user input.
- Develop method to pass information from index.html to wheel.html (such as user's location or restaurant array). [See This Link](https://stackoverflow.com/questions/27765666/passing-variable-through-javascript-from-one-html-page-to-another-page)
- Develop style for buttons that matches proposed layout style.
- Create "Restaurant Roulette" banner / text.
- Import usable pngs from design into project (banner, parts of homePage.png, etc.).

## Week 2
### Monday - Wednesday
- Pull data from Google Maps & grab nearby locations (potentially restrict to just restaurants if it's not too much work).
- Ensure background colors from .css match design.
- Continue importing pngs and styles from designs into index.html and wheel.html.
- Make code to generate wheel on JavaScript canvas (wheel.html).
- Do code review, ensure code is well-commented.
### Wednesday - Monday
- Incorporate chosen navigation method between index.html and wheel.html into layout design.
- Ensure we can pull relevant restaurant data (location, rating, etc.) and place them into accessible variables.
- Put relevant restaurant data into usable formats.
- Make wheel generation code generate "slices" of itself based on numerical input (will eventually be from restaurants and their stars).
- Use method designed to pass information between index.html and wheel.html to share restaurant data if/when necessary.
- Begin adapt wheel's style to fit theme.
- Make wheel spin when button is clicked.
- Make restaurant data be pulled when index.html "Let's Eat" button is clicked.

## Week 3
### Monday - Wednesday
- Do code review, ensure code is well-commented.
- Continue improving aesthetics.
- Ensure wheel is populated according to restaurant data and provided with space according to their # of stars from Google reviews. Potentially implement color coding at this point.
- Focus on debugging, work out what we couldn't accomplish in previous tasks.
### Wednesday - Monday
- Consider implementing basic sound design if we have time (crunch sound when button is pressed, relaxing background music, etc.).
- Debug anything that's left to debug.
- Ensure aesthetics are where we want them to be.
- Adapt to any design or functionality changes.
- Address technical debt.
- Consider adding light animations when buttons are clicked or when elements move (besides the wheel, as that should already be done at this point).
- Do code review, ensure code is well-commented.