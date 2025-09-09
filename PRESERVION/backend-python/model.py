# model.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score
import joblib

print("🔍 Loading data...")
df = pd.read_csv('data.csv')

# Features
X = df[['temperature', 'humidity', 'ethylene', 'co2']]

# Encode onion_type
le_onion = LabelEncoder()
X['onion_type'] = le_onion.fit_transform(df['onion_type'])

# Encode condition (good, risky, spoiled)
le_condition = LabelEncoder()
y = le_condition.fit_transform(df['condition'])

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
print("🧠 Training AI model...")
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Test accuracy
y_pred = model.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"✅ Model trained! Accuracy: {acc:.2f}")

# Save model and encoders
joblib.dump(model, 'trained_model.pkl')
joblib.dump(le_condition, 'label_encoder.pkl')
joblib.dump(le_onion, 'onion_encoder.pkl')

print("💾 Model and encoders saved!")