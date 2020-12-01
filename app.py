# import Flask
from flask import Flask

# Create an app, being sure to pass __name__
app = Flask(__name__)

@app.route("/")
def home():
    print('Server received request for Home page...')
    return "Ironman Analysis"