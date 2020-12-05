import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import pandas as pd
# from config import username, password
from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///data/ironman.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
race_stats = Base.classes.race_stats

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
    # create our session(link) from python to the SQL DB
    #session = Session(engine)

    # Perform necessary queries (reference 10.3)
    # need to figure out why the Race_Stats table is not saving 
     # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of race_stats data """
    # Query all race_stats
    results = session.query(race_stats.BIB, race_stats.Last_Name, race_stats.First_Name, race_stats.Country,
    race_stats.Gender, race_stats.Division, race_stats.Swim, race_stats.Bike, race_stats.Run,
    race_stats.Overall, race_stats.Division_Rank, race_stats.Gender_Rank, race_stats.Overall_Rank,
    race_stats.Latitude_average, race_stats.Longitude_average ).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_race_stats
    all_race_stats = []
    for BIB, Last_Name, First_Name, Country, Gender, Division, Swim, Bike, Run, Overall, \
        Division_Rank, Gender_Rank, Overall_Rank, Latitude_average,  Longitude_average in results:
        race_stats_dict = {}
        race_stats_dict["BIB"] = BIB
        race_stats_dict["Last_Name"] = Last_Name
        race_stats_dict["First_Name"] = First_Name
        race_stats_dict["Country"] = Country
        race_stats_dict["Gender"] = Gender
        race_stats_dict["Division"] = Division
        race_stats_dict["Swim"] = Swim
        race_stats_dict["Bike"] = Bike
        race_stats_dict["Run"] = Run
        race_stats_dict["Overall"] = Overall
        race_stats_dict["Division_Rank"] = Division_Rank
        race_stats_dict["Gender_Rank"] = Gender_Rank
        race_stats_dict["Overall_Rank"] = Overall_Rank
        race_stats_dict["Latitude_average"] = Latitude_average
        race_stats_dict["Longitude_average"] = Longitude_average

        all_race_stats.append(race_stats_dict)

    return jsonify(all_race_stats)

if __name__ == '__main__':
    app.run(debug=True)
