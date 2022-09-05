# Purchases project for ID.me by Chana Cohn

## How to Run the Code

```shell
npm start
```
Please run this in Chrome if possible.

To see the mobile view, make the browser less than 768px width and refresh the page.
To see the desktop view, make the browser full screen (or almost full screen) and refresh the page.

## To run the tests
```shell
npm test
```

## Overview

I made some assumptions:
- I read the price in pennies and then converted it to dollars. Another way to do this would be to assume the prices were already in dollcars and then add ".00" after fetching. Either way, some conversion is required in order to display what was shown in the figma. I went with the first option since the figma showed values in the pennies.

## Things I Did That I Would Prefer To Change
I used window size to check for mobile rendering. This is not the best since someone could take a laptop, make the browser window smaller, and they're not really a mobile user at that point. However, I thought it would be easier to review the code on a laptop, rather than spinning up a simulator to get the true mobile experience. I arbitrarily set 768px width as the breakpoint for a mobile vs. desktop experience, as tablets often go to 768px width. Unfortunately, since I couldn't get my resize event listener working properly, the user has to refresh the page if they are changing to more than or less than 768px width.

It would be nice to have some pagination or a "See more" button rather than a wall of purchases.

I also did not get to interpreting the unicode characters that showed up in the descriptions. (Not sure if that was something I should be trying to do.)

## Accessibility
I did my best to conform to semantic html standards. One place that could stand improvment was that I used spans on the mobile cards. I couldn't find a great semantic-compliant way of implementing spans in order to keep text inline and formatted according to the design.

Dark mode would be great to add, too, but I did not get to that.


## Things I Didn't Get To
I'd prefer to add an event listener for changing screensizes if another method will not be used to determine mobile rendering.

I could not figure out how to pass in colors to the styling elements based on where they were in the array. I have some logic that assigns colors by category, and that does work. However, passing them in to a style on the element or in CSS was not at all working for me. I would need to get more info on this.

I'd like to add more tests.

The Purchases component got pretty big. I'd prefer to have child components for the mobile and desktop renders. I started attempting that, but it would take me too long to pass all the props down and get everything working great in both mobile and desktop versions.

Nothing on either mobile or desktop is clickable at the moment. I wasn't sure if I was supposed to add some functionality for the three vertical dots on desktop.