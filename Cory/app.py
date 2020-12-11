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
            FROM race_stats Order by Division", conn).to_json(orient='records')


# need to update route to look for selectedItem in the dropdown
# create route for bar chart data
@app.route("/api/bar_chart/<selectedItem>")
def bar_chart_api(selectedItem):
    return f'SelectedItem: {selectedItem}'
    # create gender variable for filtering
    genderLetter = 'M'
    if selectedItem.startswith('F'):
        genderLetter = 'F'
    # connect to our database
    conn = engine.connect()
    # return query results
    return pd.read_sql("select Division, avg(Swim) as Swim, avg(Bike) as Bike, avg(Run) as Run FROM race_stats WHERE Division LIKE '%g' GROUP BY Division ORDER BY Division" %genderLetter, conn).to_json(orient='records')

    # if selectedItem.startswith('F'):
    #     # connect to our database
    #     conn = engine.connect()
    #     # return query results
    #     return pd.read_sql("select Division, avg(Swim) as Swim, avg(Bike) as Bike, avg(Run) as Run FROM race_stats WHERE Division LIKE 'F%' GROUP BY Division ORDER BY Division", conn).to_json(orient='records')
    # else:
    #     # connect to our database
    #     conn = engine.connect()
    #     # return query results
    #     return pd.read_sql("select Division, avg(Swim) as Swim, avg(Bike) as Bike, avg(Run) as Run FROM race_stats WHERE Division LIKE 'M%' GROUP BY Division ORDER BY Division", conn).to_json(orient='records')

@app.route("/api/bar_chart/initial")
def init_bar_chart():

    # connect to our database
    conn = engine.connect()
    # return query results
    return pd.read_sql("select Division, avg(Swim) as Swim, avg(Bike) as Bike, avg(Run) as Run FROM race_stats WHERE Division LIKE 'F%' GROUP BY Division ORDER BY Division", conn).to_json(orient='records')

@app.route("/api/top_ten_table/<selectedItem>")
def table_api(selectedItem):
    # connect to our database
    conn = engine.connect()
    # return query results
    return pd.read_sql("SELECT Division_Rank, Division, First_Name, Last_Name, Country, Gender, Overall, Overall_Rank FROM race_stats WHERE Division = '%s' AND Division_Rank < 11 ORDER BY Division_Rank" %selectedItem, conn).to_json(orient='records')
   

if __name__ == '__main__':
    app.run(debug=True)
