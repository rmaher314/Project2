import numpy as np
import datetime as dt
import sqlalchemy
from sqlalchemy import create_engine, func
import pandas as pd
from flask import Flask, jsonify, render_template, url_for
import json


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///data/ironman.sqlite")


#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################
@app.route("/")
def home():
    return render_template('index.html')

# this is how we send data to javascript
@app.route("/api/race_stats")
def race_stats_api():
    # connect to our database
    conn = engine.connect()
    # return query results
    return pd.read_sql("select BIB, Last_Name, First_Name, Country, Gender, Division, Swim, Bike, Run,\
        Overall, Division_Rank, Gender_Rank, Overall_Rank, Latitude_average, Longitude_average\
            FROM race_stats", conn).to_json(orient='records')

# display with time on y or normalize to who comleted 
# divide everything by the fastest time ever

# create route for bar chart data
@app.route("/api/bar_chart")
def bar_chart_api():
    # connect to our database
    conn = engine.connect()
    # return query results
    return pd.read_sql("select Division, avg(Swim), avg(Bike), avg(Run) FROM race_stats GROUP BY Division ORDER BY Division", conn).to_json(orient='records')


if __name__ == '__main__':
    app.run(debug=True)