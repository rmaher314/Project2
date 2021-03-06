import sqlalchemy
from sqlalchemy import create_engine
import pandas as pd
from config import username, password

# Read in race stats csv and convert it to a dataframe
csv_file = "data/2019_Ironman_World_Championship_Results.csv"
race_stats_df = pd.read_csv(csv_file)

# Read in countries csv and convert it to a dataframe
csv_file = "data/countries_codes_and_coordinates.csv"
countries_df = pd.read_csv(csv_file)

# merge both dataframes into one dataframe on country code
merged_df = pd.merge(race_stats_df, countries_df, left_on="Country", right_on="Alpha_3_code")

# Remove unnecessary columns and rename columns
merged_df = merged_df[['BIB', 'Last_Name', 'First_Name', 'Country_x', 'Country_y', 'Gender', 'Division', 'Swim', 'Bike', 'Run', 'Overall', 'Division_Rank', 'Gender_Rank', 'Overall_Rank', 'T1', 'T2', 'Latitude_average', 'Longitude_average']]
merged_df = merged_df.rename(columns={"Country_x":"Alpha_3_code", "Country_y":"Country"})

# Create connection to postgresql
rds_connection_string = f"{username}:{password}@localhost:5432/ironman"
# save this to sqllite
engine = create_engine("sqlite:///ironman.sqlite")
