# Backend
Contains the Django database. The database app itself is called `Database`. Make sure to run the venv environment with `source venv/bin/activate`. 

##### Models.py
This file defines the database structure. If you edit this, you need to run `python manage.py makemigrations database` and then `python manage.py migrate` to propagate the changes. 

##### Serializers.py
Contains the serializers, which convert things into JSON for React. We redefine the fields in order to allow blank fields. It also contains the serializer for the slug, even though it's not all that necessary.

##### Urls.py
Contains the list of urls, all in `api/` format. Note that the order matters, with the request searching from the top to bottom. 

##### Views.py
Contains the views for the JSON requests. These are fairly self-documenting. It'd be nice to have an algorithmic slug generator instead of the current, slightly crude way I've implemented so far.

##### Notes
The `corsheaders` were very important to add to the settings files, as well as making sure to whitelist `localhost:3000`.

# Frontend
To get the dependencies, run `npm install package.json`. Odds are you'll still get errors when you first start things, so you'll have to play around with things a bit to make sure you have all the proper packages. 

##### App.js
Contains the main app. Note the use of Router with Switch to deal with the routing.

##### Splash.js
Contains the front page of the site. Currently, the React is all barebones, but note the use of Formik in order to deal with all the `handleChange` and `handleSubmit`, as it's a horrible pain to write separate handlers for each of them. The page automatically pulls a slug on startup, generated server-side, and uses that to do the redirects.

##### Viewer.js
Shows all the data, and will contain the grid. Not that much right now. 

# Some Samples

![some image](/readme_img/demo.png)