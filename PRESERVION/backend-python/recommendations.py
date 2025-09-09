# backend-python/recommendations.py
def get_recommendation(condition, temp, hum, ethylene, co2, otype):
    recs = []
    if condition == "spoiled":
        recs.append("❌ Remove spoiled onions NOW")
        recs.append("🌀 Maximize ventilation")
        if temp > 20: recs.append("❄️ Cool down storage")
        if hum > 80: recs.append("💧 Use dehumidifier")
        if ethylene > 5: recs.append("🧪 Activate ethylene scrubber")
    elif condition == "risky":
        recs.append("⚠️ Risk of spoilage — act now!")
        if temp > 18: recs.append("🌬️ Increase airflow")
        if hum > 75: recs.append("💧 Wipe moisture")
        if co2 > 1200: recs.append("🚪 Open vents 15 min/hour")
    else:
        recs.append("✅ All good! Keep current settings.")
        recs.append("🌙 Keep in darkness")
    return recs