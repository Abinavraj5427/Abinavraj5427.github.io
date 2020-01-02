# Scrollie

Scrollie is a simple and lightweight jQuery plugin that will allow you to call your own function when an element comes into view. This plugin will only tell you when your element is in view and let you run whatever animation you can come up with.

I created this because I was playing around with a parallax scrolling styled site and found that animating all the elements at all times would cause performance issues. So after much playing around I found that if you only perform your action when its in view, or when its containing element in view you would have less moving parts and as a result better performance.

## Examples
If you have used the plugin please send me a link to add to the example list

* Change Background while scrolling down the page - [demo on CodePen](http://codepen.io/Funsella/pen/yLfAG)

## Usage

#### Dependencies

Its a jQuery plugin so you will need jQuery for this plugin.
```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
```

#### HTML

Include the .js file after your jQuery include
```html
<script src="js/jquery.scrollie.min.js"></script>
```

#### JavaScript

Use the plugin as follows:

```js
$('.selector').scrollie({
    direction : 'both',
    scrollOffset : 0,
    scrollRatio : 2,
    scrollingInView : function(elem, offset, direction, coords, scrollRatio, thisTop, winPos){

        /* your code in here */

    },
    scrollingToTheTop : function(elem, offset, direction, coords, scrollRatio, thisTop, winPos){

        /* your code in here */

    },
    scrollingOutOfView : function(elem, offset, direction, coords, scrollRatio, thisTop, winPos){

        /* your code in here */

    },
    scrolledOutOfView : function(elem, offset, direction, coords, scrollRatio, thisTop, winPos){

        /* your code in here */

    }
});
```

`scrollingInView`, `ScrollingToTheTop`, `ScrollingOutOfView`, `scrolledOutOfView` are all callback functions that will be called at different points in time. 

The options for `scrollOffset` and `speed` can also be set by using a data attribute `data-scrollie-offset` and `data-scrollie-speed`. This will allow you to set the offset on the fly or if you have multiple sections on the page that need different offsets or speed variations


### Options

| Property      |Default        | Description                                                                      |
| ------------- |:-------------:|:--------------------------------------------------------------------------------:|
| direction     | both          | Set the direction for the scroll callback function activation. Can be set to "both", "down", or "up". |
| scrollOffset  | 0             | The distance from below the window that the scroll callback function activation  |
| scrollRatio   | 2             | this is a ratio setting that you can use to move an element, set to `1` to move 1px for every pixel scrolled |


### Callback Functions

| Property            | Description                                                                      |
| ------------------- |:--------------------------------------------------------------------------------:|
| scrollingInView     | Will run from the point the element enters the window till the bottom of the element exits the top of the window	|
| scrollingToTheTop   |	Will run from the point the element enters the window and stops when it reaches the top 	|
| scrollingOutOfView  |	Will run from the point the element reaches the top of the window and stops when it is out of the window	|
| scrolledOutOfView   |	Will run from the point the element is completely out of the window	 |

All the callback functions will have a set of properties that you can use inside of each call back function

| Property            | Description                                                                      |
| ------------------- |:--------------------------------------------------------------------------------:|
| elem     			  | The current element	|
| offset              | The offset value	|
| direction		  | The direction that is being scrolled, will return 'up' or 'down'	|
| coords              | The current position in pixels of the element from the bottom of the screen. Will be `0` as it enters the the bottom of the window and will increase as it moves to the top of the screen 	|
| scrollRatio         | The calculated ratio of the element. Will start at `0` as the element enters from the bottom and will increase as the element moves up the window	|
| thisTop             | The distance of the element to the very top of the page (not the browser window).	|
| winPos              | The position of the element relative to the window	|


## Contributing to Scrollie

Your contributions to the project are very welcome. This is my first project on GitHub so I don't have a process for this yet. So please feel free to add, fix, optimize on a branch and then submit a pull request and I will do my best to include your additions to the plugin.  

## Author
JP Nothard / [@funsella](https://twitter.com/Funsella)


## Changelog

#### 1.0.1 (23 Dec 2013)
Initial Commit and plugin day one






