# backend-python/advanced_train.py
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import LabelEncoder, StandardScaler
from xgboost import XGBClassifier
import joblib
import os

print("🌱 Generating realistic onion data...")
np.random.seed(42)
data = []
for _ in range(10000):
    temp = np.random.normal(18, 5)
    temp = np.clip(temp, 0, 30)

    hum = np.random.normal(75, 15)
    hum = np.clip(hum, 40, 98)

    ethylene = np.random.gamma(2, 2)
    ethylene = np.clip(ethylene, 0.01, 10)

    co2 = np.random.normal(800, 300)
    co2 = np.clip(co2, 400, 2500)

    otype = np.random.choice(['red', 'white', 'small', 'large'], p=[0.3, 0.25, 0.25, 0.2])

    risk = (temp/30)*0.3 + (hum/100)*0.25 + (ethylene/10)*0.2 + (co2/2500)*0.15
    if otype == 'white': risk += 0.1
    if otype == 'small': risk -= 0.05
    risk += np.random.normal(0, 0.05)
    risk = np.clip(risk, 0, 1)

    condition = 'good' if risk < 0.35 else 'risky' if risk < 0.7 else 'spoiled'
    data.append([temp, hum, ethylene, co2, otype, condition])

df = pd.DataFrame(data, columns=['temperature','humidity','ethylene','co2','onion_type','condition'])
os.makedirs("data", exist_ok=True)
df.to_csv("data/onion_data.csv", index=False)

# Prepare data
le_type = LabelEncoder()
df['onion_type_encoded'] = le_type.fit_transform(df['onion_type'])

le_cond = LabelEncoder()
df['condition_encoded'] = le_cond.fit_transform(df['condition'])

X = df[['temperature','humidity','ethylene','co2','onion_type_encoded']]
y = df['condition_encoded']

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.15, stratify=y, random_state=42)

# Train super AI (XGBoost)
print("🧠 Training super AI...")
model = XGBClassifier(random_state=42, eval_metric='mlogloss')
model.fit(X_train, y_train)

# Test
acc = model.score(X_test, y_test)
print(f"🏆 Accuracy: {acc*100:.2f}%")

# Save
os.makedirs("models", exist_ok=True)
joblib.dump(model, "models/xgb_model.pkl")
joblib.dump(le_cond, "models/le_condition.pkl")
joblib.dump(le_type, "models/le_type.pkl")
joblib.dump(scaler, "models/scaler.pkl")

print("✅ Robot brain saved!")