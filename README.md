# Write Cafe
A web-based English writing assistant with automatic grammar error correction (GEC) and example sentence suggestion.

### Tech Stack
  - Frontend: sass, es6, react, redux, webpack.
  - Backend: nodejs for webserver, python flask for GEC business logic.
  - Special credits: GEC functionality is based on Linggle API (A web-scale linguistics search engine), which is developed by NTHU NLPLAB.

### Get Started

- Assume that you've installed python virtual environment package - `virtualenv`. You'll need to first create a new virtual environment, then activate it. By doing this to prevent installing python packages required by this project in global space.
```
>> virtualenv venv (create 'venv' folder whereever place you want)
```
```
>> source server/env/bin/activate (activate virtual environment)
```
- Install python packages required by this project from requirements.txt. If there's any error, you can run `python server/app.py` to see what packages are required, then install them by `pip install <package>` one by one.
```
>> pip install -r requirements.txt
```
- Assume that you've installed nodejs and npm. Run `npm install` to install nodejs packages required by this project
```
>> npm install
```
- Since this project runs two different servers, one is nodejs for routings, the other is python flask API for GEC. Please enter the following two commands in seperate terminal taps, this will help you get the app started.
```
>> python server/app.py (Start python flask api server)
```
```
>> npm start (Start node web server)
```

### Problem Shooting
If there's any problem, please open an issue or send me an email.
