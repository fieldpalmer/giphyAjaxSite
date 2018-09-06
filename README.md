# giphyAjaxSite

### Overview

This web app uses the the giphy API to display gifs based on my own personal interests as well as those of the user. 

### Further Explorations

1. Allow users to request new gifs from each topic by clicking again.

2. Create a similar project using OMDB displaying info and movie posters. Potentially link to sell them?

3. Include a 1-click download button for each gif

4. The `favorites` section could use some improvement
        - A means of removing gifs from favorites would be nice
        - After returning to the page, the user's new favorites overwrite their old favorites
        - On small screens, I'd like the gifs to display inline horizontally with a scrollbar

5. When the user adds many gifs to the page, they're more than likely going to have scrolled all the way to the bottom. However, new gifs get loaded at the top. Issues with solving this:
        -I tried the obvious use of `append` rather than `prepend` and it completely wrecked things. My add to favorites button no longer worked. 

### Author
    - Field Palmer
