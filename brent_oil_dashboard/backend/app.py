from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load data
df = pd.read_csv('/content/drive/My Drive/Brent Oil Price Analysis/data/BrentOilPrices.csv')
df['Date'] = pd.to_datetime(df['Date'])
df.set_index('Date', inplace=True)

# Load additional model metrics and results
model_metrics = {
    "ARIMA": {"RMSE": 0.5, "MAE": 0.4, "R2": 0.8},
    "LSTM": {"RMSE": 0.3, "MAE": 0.25, "R2": 0.85},
    "GARCH": {"Volatility": "Conditional volatility calculated"}
}

# Endpoint for historical oil price data
@app.route('/api/data', methods=['GET'])
def get_data():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    data = df.copy()
    if start_date and end_date:
        data = data[(data.index >= start_date) & (data.index <= end_date)]
    return jsonify(data.reset_index().to_dict(orient='records'))

# Endpoint for model forecasts (e.g., ARIMA, LSTM)
@app.route('/api/forecasts', methods=['GET'])
def get_forecasts():
    # Example forecasts (replace with actual model predictions)
    forecasts = [{"date": "2023-01-01", "price": 78.5}, {"date": "2023-01-02", "price": 79.0}]
    return jsonify(forecasts)

# Endpoint for model metrics
@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    return jsonify(model_metrics)

if __name__ == '__main__':
    app.run(debug=True)
