import sqlalchemy
from sqlalchemy import create_engine
import pandas as pd
import datetime as dt
from datetime import time

# Read in race stats csv and convert it to a dataframe
csv_file = "2019_Ironman_World_Championship_Results.csv"
race_stats_df = pd.read_csv(csv_file)

# Read in countries csv and convert it to a dataframe
csv_file = "countries_codes_and_coordinates.csv"
countries_df = pd.read_csv(csv_file)

# merge both dataframes into one dataframe on country code
merged_df = pd.merge(race_stats_df, countries_df, left_on="Country", right_on="Alpha_3_code")

# Convert race times to total seconds
merged_df['Swim'] = ((merged_df['Swim_h'] * 3600) + (merged_df['Swim_m'] * 60) + merged_df['Swim_s']) / 3600
merged_df['Bike'] = ((merged_df['Bike_h'] * 3600) + (merged_df['Bike_m'] * 60) + merged_df['Bike_s']) / 3600
merged_df['Run'] = ((merged_df['Run_h'] * 3600) + (merged_df['Run_m'] * 60) + merged_df['Run_s']) / 3600
merged_df['Overall'] = ((merged_df['Overall_h'] * 3600) + (merged_df['Overall_m'] * 60) + merged_df['Overall_s']) / 3600
merged_df['T1'] = ((merged_df['T1_h'] * 3600) + (merged_df['T1_m'] * 60) + merged_df['T1_s']) / 3600
merged_df['T2'] = ((merged_df['T2_h'] * 3600) + (merged_df['T2_m'] * 60) + merged_df['T2_s']) / 3600

# Remove unnecessary columns and rename columns
ironman_df = merged_df.loc[:, ['BIB', 'Last_Name', 'First_Name', 'Country_x', 'Country_y', 'Gender', 'Division', 'Swim', 'Bike', 'Run', 'Overall', 'Division_Rank', 'Gender_Rank', 'Overall_Rank', 'T1', 'T2', 'Latitude_average', 'Longitude_average']].dropna()
ironman_df = ironman_df.rename(columns={"Country_x":"Alpha_3_code", "Country_y":"Country"})

# Convert strings to datetime values
# ironman_df.loc[:, 'Swim'] = pd.to_datetime(ironman_df.loc[:, 'Swim'], format='%H:%M:%S')
# ironman_df.loc[:, 'Bike'] = pd.to_datetime(ironman_df.loc[:, 'Bike'], format='%H:%M:%S')
# ironman_df.loc[:, 'Run'] = pd.to_datetime(ironman_df.loc[:, 'Run'], format='%H:%M:%S')
# ironman_df.loc[:, 'Overall'] = pd.to_datetime(ironman_df.loc[:, 'Overall'], format='%H:%M:%S')

# convert time strings into floats
# ironman_df.loc[:, 'Swim'] = pd.to_numeric(ironman_df.loc[:, 'Swim'], errors='coerce')
# ironman_df.loc[:, 'Bike'] = pd.to_numeric(ironman_df.loc[:, 'Bike'], errors='coerce')
# ironman_df.loc[:, 'Run'] = pd.to_numeric(ironman_df.loc[:, 'Run'], errors='coerce')

# ironman_df.loc[:, 'Swim'] = ironman_df.loc[:, 'Swim'].astype(float)
# ironman_df.loc[:, 'Bike'] = ironman_df.loc[:, 'Bike'].astype(float)
# ironman_df.loc[:, 'Run'] = ironman_df.loc[:, 'Run'].astype(float)

# split datetime into 2 columns
# ironman_df['Swim_Time'] = [d.time() for d in ironman_df['Swim']]
# ironman_df['Bike_Time'] = [d.time() for d in ironman_df['Bike']]
# ironman_df['Run_Time'] = [d.time() for d in ironman_df['Run']]
# ironman_df['Overall_Time'] = [d.time() for d in ironman_df['Overall']]

# save this to sqllite
engine = create_engine("sqlite:///ironman.sqlite")
ironman_df.to_sql(name='race_stats', con=engine, if_exists='replace', index=False)
