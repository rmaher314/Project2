import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import pandas as pd
from config import username, password
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
Race_Stats = Base.classes.race_stats

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
@app.route("/api/ironman")
def race_stats():
    # create our session(link) from python to the SQL DB
    session = Session(engine)

    # Perform necessary queries (reference 10.3)
    # need to figure out why the Race_Stats table is not saving 

if __name__ == '__main__':
    app.run(debug=True)
