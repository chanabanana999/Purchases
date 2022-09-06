# Purchases project for ID.me by Chana Cohn

## How to Run the Code
This app was created using React v. 18.2 and Javascript. To run this app, you may have to run `npm ci`.
To start the app in a browser.

```shell
npm start
```
Please run this in Chrome if possible. (Ideally, this should run in all supported browsers, but this was the one I used.)
- If the app does not open automatically, please browse to `http://localhost:3000`
- To see the mobile view, make the browser less than 768px width and refresh the page.
- To see the desktop view, make the browser full screen (or almost full screen) and refresh the page.

## To run the tests
Tests were created using the react testing library. From a command prompt run:

```shell
npm test
```

There are not a lot of tests. With more time, I would add a test for a failed fetch and to verify that products are rendered on the page. There can also be tests added for checking that styling displays correctly at different window widths (per the requirements).

## Overview

Project instructions: https://www.dropbox.com/s/dncrz21vx6983lo/Frontend-Interview.pdf?dl=0
Project Figma design: https://www.figma.com/file/h3G2z8II4ZRM1gv3CCUHTq/Data-Table?node-id=0%3A1

This app reads in data from an API and creates a json. The displays in a table on the desktop and in cards if the window width is 768 or less. Formatting is provided by App.css.

I made some assumptions:
- I read the price in pennies and then converted it to dollars. Another way to do this would be to assume the prices were already in dollcars and then add ".00" after fetching. Either way, some conversion is required in order to display what was shown in the figma. I went with the first option since the figma showed values in the pennies.

- I also made the assumption that nothing is interactive in this iteration because nothing was shown to be interactive in the Figma design.

- I had a few issues determining text color because it was not completely clear to me which color values were being used. Usually when I see a Figma design, I can also see the color values, font sizes and weights, etc. I just made my best guess with my near-sighted eyes. :)

- This does not render perfectly at all sizes - more work would have to be done to make this look awesome for all mobile and desktop resolutions.

- The page needs to be refreshed when changing the 768px width threshhold to see the table v. cards. This is not ideal, more on that below.

## Things I Did That I Would Prefer To Change
- I used window size to check for mobile rendering. This is not the best since someone could take a laptop, make the browser window smaller, and they're not really a mobile user at that point, it's just a smaller window. However, I thought it would be easier to review the code on a laptop, rather than spinning up a simulator to get the true mobile experience. I arbitrarily set 768px width as the breakpoint for a mobile vs. desktop experience, as tablets often go to 768px width. Unfortunately, since I couldn't get my resize event listener working properly, the user has to refresh the page if they are changing to more than or less than 768px width.

- It would be nice to have some pagination or a "See more" button rather than a wall of purchases. That would take a bit more time but look nicer.

- I also did not get to interpreting the unicode characters that showed up in the descriptions. (Not sure if that was something I should be trying to do.) For now I left those as is.

## Accessibility
- I did my best to conform to semantic html standards. One place that could stand improvment was that I used spans on the mobile cards. I couldn't find a great semantic-compliant way of implementing spans in order to keep text inline and formatted according to the design. This may require more investigation.

- Dark mode would be great to add, too, but I did not get to that.

## Things I Didn't Get To
- I'd prefer to add an event listener for changing screensizes if another method will not be used to determine mobile rendering, such as max touchpoints or checking the browser for device type.

- I could not figure out how to pass in colors to the styling elements based on where they were in the array. I have some logic that assigns colors by category, and that does work. However, passing them in to a style on the element or in CSS was not at all working for me. I would need to get more info on this. I thought I could create an array of styles and bring those in, but that will take more time. This part of the design I was not able to accomplish in the timeframe.

- I'd like to add more tests. Right now I'm checking that the section renders and that a fetch is called. I'd like to add a check for failure conditions that are in the code, such as if the fetch fails or if something else goes wrong in reading the data.

- The Purchases component got pretty big. I'd prefer to have child components for the mobile and desktop render versions. I started attempting that, but it got cumbersome trying to pass all the props down and get everything working great in both mobile and desktop versions.

- It might have been cool to make the three vertical dots be clickable and then to display a message. (I didn't do this.)

## Conclusion
This was an enjoyable and challenging project. I did my best to hit all the concepts I thought the Figma and the requirements were driving toward, although I would prefer to be more thorough, such as in testing or getting the category colors to change.

I appreciate all the time it takes to review candidates' code. Thank you for your consideration on this project.