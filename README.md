Express MVC
=======
## Versions ##
 1. **npm** - *current stable build*
 2. **master** - *old stable build*
 3. **edge** - *current development build*

## Features ##

 1. Advanced routing
 2. Controllers
 3. Access logging
 4. Error bubbling
 5. Views w/ EJS
 6. Static Resources
 7. Middleware


----------


## Getting Started ##

**Install the app**:  `npm install express_mvc`

**Create a basic mvc bootstrap**:
```
var ExpressMVC = require('express_mvc'), //create mvc object
emvc = new ExpressMVC({ //initialize mvc object + options
    access_logging: true, //turn on access logging
    access_log_dir: './logs', //set logs directory
    bubble_unhandled: true, //bubble errors
                            //& crash app
    parse_body: { //allow body parsing
        json: true, //json in body, okay
        urlencoded: { //urlencoded body, okay
            extended: true
        }
    }
}),
router = new emvc.Router, //create router instance
app = emvc.App; //access express app proxy instance
```

**Build your first route**:
```
/**
 *
 * Add Index Route
 */
router.addRoute('Home', 'GET', '/', function(req, res){
    res.write("It's your homepage!");
    res.end();
});
```

**Special Routing**:
You are not required to provide a callback function to `.addRoute`, in fact, there are two alternate options...

 

 1. Controller path
 2. **Magic** Controller's

## Advanced Routing ##
All controllers are assumed to be in the app root in a directory called, `controllers`, this is the only restriction of controllers locations.

**Controller Path**:
Look for `./controllers/Home.js`
```
router.addRoute('Home', 'GET', '/', '/Home.js');
```

**Magic Controllers**:
Magic controllers follow a special syntax based on your route... the last segment denotes the file name and any subsequent segments are a subfolder structer. Parameters are stripped in this context.  **"/" Defaults to Home.js**

Examples
```
//controllers/User.js
router.addRoute('User', 'GET', '/user');

//controllers/User/Profile.js
router.addRoute('User Profile', 'GET', '/user/profile');

//controllers/User/Profile.js
router.addRoute('Other User Profile', 'GET', 'user/profile/:uid');
```

## Controllers ##
Controllers are created in the same way as an express controller using the `function(req, res)` syntax, with 1 subtle difference... method grouping.

Take for example, the following routing setup
```
router.addRoute('Get User', 'GET', '/user');
router.addRoute('Create User', 'POST', '/user');
router.addRoute('Delete User', 'DELETE', '/user');
```

All of the routes above will share the same magic controller...so **HOW** do we determine functionality for each method? Lets see below...

*controllers/User.js*
```
module.exports = {
    'GET': function(req, res){},
    'POST': function(req, res){},
    'DELETE': function(req, res){}
}
```

You now have all methods for an api group in one convenient controller, with all of the standard express usage available in your request and response objects. It's that simple!

If you want all methods to go through a single function you can do the following...

*controllers/User.js*
```
module.exports = function(req, res){};
```

Both syntax will work without any configuration by you!

## Access Logging ##
Access logging is managed by [morgan](https://github.com/expressjs/morgan%20morgan)

Currently access logging does not offer much customization, but more may be added upon request

## Error Bubbling ##
One of the minor annoyances that can be experienced with Express.JS is errors getting printed out to  your screen and your app not crashing. If this bothers you, simply turn on `bubble_unhandled` in your app options object. This will allow you to grab these errors with the [uncaughtException](https://nodejs.org/api/process.html#process_event_uncaughtexception) event. You can then observe the error and make final decisions before crashing your app, or simply just let your app crash and recover.

**NOTE**: *Many developers believe that using the uncaughtException event is unsafe and may leave your app in and unstable state. Please be sure you know what you are doing before persisting an app in this state.*

## Views w/ EJS ##
Currently Express MVC is set up to work with EJS by default and we've made it quite easy to do. Simply add the following to your app...
```
app.set('view engine', 'ejs');
```

You can then render views stored in `./views`
```
res.render('view', {foo: 'bar'});
```

## Static Resources ##
You can easily set up static resources for your app as follows
```
app.static('static/css', '/css'); //./static/css -> /css
app.static('static/images', '/images'); //./static/images -> /images
app.static('static/fonts', '/fonts'); //./static/fonts -> /fonts
app.static('static/icons', '/icons'); //./static/icons -> /icons
app.static('static/js', '/js'); //./static/js -> /js
app.static('static/libs', '/libs'); //./static/libs -> /libs
app.static('static/views', '/views'); //./static/views -> /views
```

## Middleware ##
We have simply exposed the standard middleware implementation from Express.JS and you can use it as you normally would...
```
app.use(function(req, res, next){
    //do middleware stuff here...
    next();
});
```

## Questions, Comments ##
We hope this documentation is sufficient to get you started with Express MVC. However, if you have any questions or require help please open a ticket on [GitHub](https://github.com/the-letter-e-production/Express-MVC)


----------


Built under the [ISC](http://opensource.org/licenses/ISC) License
