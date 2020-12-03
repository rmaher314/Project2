## I created our tables in Postgresql and imported the csv files into them

CREATE TABLE race_stats(
  BIB INT PRIMARY KEY,
  Last_Name VARCHAR,
  First_Name VARCHAR,
  country VARCHAR,
  gender VARCHAR,
  division VARCHAR,
  swim VARCHAR,
  bike VARCHAR,
  run VARCHAR,
  overall VARCHAR,
  Division_Rank VARCHAR,
  Gender_Rank VARCHAR,
  Overall_Rank VARCHAR,
  T1 VARCHAR,
  T2 VARCHAR
);

SELECT * FROM RACE_STATS

CREATE TABLE countries(
  country VARCHAR PRIMARY KEY,
  alpha_2_code VARCHAR,
  alpha_3_code VARCHAR,
  numeric_code VARCHAR,
  latitude_average VARCHAR,
  longitude_average VARCHAR
);

SELECT * FROM countries

SELECT * FROM race_stats r
join countries c on r.country = c.alpha_3_code