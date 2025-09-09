# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS  # ← This fixes React connection
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # Allow React (localhost:5173) to call this API

# Load model and encoders
print("🔁 Loading AI model...")
model = joblib.load('trained_model.pkl')
le_condition = joblib.load('label_encoder.pkl')

# Get class labels
classes = le_condition.classes_.tolist()  # ['good', 'risky', 'spoiled']

def get_action(condition, temp, humidity, ethylene):
    """
    Give smarter recommendations based on exact sensor values
    """
    if condition == 'good':
        return "✅ All conditions optimal. Maintain storage."

    elif condition == 'risky':
        actions = []
        if temp > 15:
            actions.append("🌡️ Turn on cooling for 20 mins")
        if humidity > 70:
            actions.append("💧 Activate dehumidifier or ventilation")
        if ethylene > 1.5:
            actions.append("🧪 Use plasma treatment to reduce gas")
        if not actions:
            actions.append("⚠️ Monitor closely — early signs of spoilage")
        return "🟡 Do this: " + " | ".join(actions)

    else:  # spoiled
        return "🔴 Remove spoiled onions immediately to prevent rot spread!"
    
def get_shelf_life(condition, temp, humidity, ethylene):
    """
    Predict shelf life in days based on severity
    """
    if condition == 'good':
        base = 60
        # Deduct days based on stress
        deduction = 0
        if temp > 14: deduction += (temp - 14) * 3
        if humidity > 65: deduction += (humidity - 65) * 2
        if ethylene > 1.0: deduction += (ethylene - 1.0) * 5
        return f"{int(base - deduction)}–{int(base - deduction + 5)} days"

    elif condition == 'risky':
        base = 15
        if temp > 16: base -= 3
        if humidity > 75: base -= 4
        if ethylene > 2.5: base -= 5
        return f"{max(2, base - 3)}–{max(1, base)} days"

    else:
        return "0–2 days (urgent action needed)"


@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data
        data = request.json

        # Extract values
        temp = float(data['temperature'])
        humidity = float(data['humidity'])
        ethylene = float(data['ethylene'])
        co2 = float(data['co2'])
        onion_type = data['onion_type'].lower()

        # Supported types
        valid_types = ['red', 'white', 'yellow']
        if onion_type not in valid_types:
            return jsonify({'error': f'onion_type must be one of {valid_types}'}), 400

        # Encode onion_type (alphabetically: red=2, white=1, yellow=0)
        onion_encoded = valid_types.index(onion_type)

        # Make input array
        X = np.array([[temp, humidity, ethylene, co2, onion_encoded]])

        # Predict
        pred = model.predict(X)[0]
        proba = model.predict_proba(X)[0]

        # Decode prediction
        predicted_condition = classes[pred]

        # Extract for smart logic
        temp = float(data['temperature'])
        humidity = float(data['humidity'])
        ethylene = float(data['ethylene'])

        #  Get action and shelf life
        action = get_action(predicted_condition, temp, humidity, ethylene)
        shelf_life = get_shelf_life(predicted_condition, temp, humidity, ethylene)
        confidence = float(np.max(proba))

        # Send response
        return jsonify({
            'condition': predicted_condition,
            'action': action,
            'shelf_life': shelf_life,
            'confidence': confidence,
            'probabilities': {
                'good': float(proba[classes.index('good')] if 'good' in classes else 0),
                'risky': float(proba[classes.index('risky')] if 'risky' in classes else 0),
                'spoiled': float(proba[classes.index('spoiled')] if 'spoiled' in classes else 0)
            }
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'AI server is running!'})

if __name__ == '__main__':
    print("🚀 Starting AI Server at http://localhost:5000")
    app.run(port=5000, debug=True)