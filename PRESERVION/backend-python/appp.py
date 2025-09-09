# backend-python/app.py
from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
from recommendations import get_recommendation

app = Flask(__name__)

# Load models
model = joblib.load("models/xgb_model.pkl")
le_cond = joblib.load("models/le_condition.pkl")
le_type = joblib.load("models/le_type.pkl")
scaler = joblib.load("models/scaler.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        temp = float(data['temperature'])
        hum = float(data['humidity'])
        ethylene = float(data['ethylene'])
        co2 = float(data['co2'])
        otype = data['onion_type'].lower()

        # Encode
        otype_encoded = le_type.transform([otype])[0]

        # Scale
        X = np.array([[temp, hum, ethylene, co2, otype_encoded]])
        X_scaled = scaler.transform(X)

        # Predict
        pred = model.predict(X_scaled)[0]
        condition = le_cond.inverse_transform([pred])[0]

        # Get recommendation
        recs = get_recommendation(condition, temp, hum, ethylene, co2, otype)

        # Risk level
        risk_map = {'good': 33, 'risky': 66, 'spoiled': 100}
        risk = risk_map[condition]

        return jsonify({
            'condition': condition,
            'risk_level': risk,
            'recommendations': recs,
            'confidence': float(model.predict_proba(X_scaled).max())
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("🚀 Starting AI Server at http://localhost:5000")
    app.run(port=5000, debug=True)