from flask import Flask, render_template, request, jsonify
import joblib
import pandas as pd
import numpy as np
import os

# --- NEW IMPORTS (Required for the custom classes) ---
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.preprocessing import FunctionTransformer
from scipy.stats.mstats import winsorize
# --- END OF NEW IMPORTS ---

app = Flask(__name__)

# --- NEW CUSTOM CLASS/FUNCTION DEFINITIONS ---
# These must be defined *before* joblib.load()

# The 9 features the model expects
FEATURE_ORDER = [
    'ph', 'Hardness', 'Solids', 'Chloramines', 'Sulfate', 
    'Conductivity', 'Organic_carbon', 'Trihalomethanes', 'Turbidity'
]

class Winsorizer(BaseEstimator, TransformerMixin):
    """A custom transformer to cap outliers."""
    def __init__(self, limits=(0.05, 0.05)):
        self.limits = limits
    
    def fit(self, X, y=None):
        return self
        
    def transform(self, X):
        X_winsorized = np.copy(X)
        if isinstance(X, pd.DataFrame):
            X_winsorized = X.values.copy()
            
        for i in range(X_winsorized.shape[1]):
            X_winsorized[:, i] = winsorize(X_winsorized[:, i], limits=self.limits)
        
        if isinstance(X, pd.DataFrame):
            return pd.DataFrame(X_winsorized, columns=X.columns)
        return X_winsorized

def _engineer_features(X_in):
    """A custom function to create new features."""
    if isinstance(X_in, pd.DataFrame):
        df = X_in.copy()
    else:
        # Assumes X is a numpy array with columns in FEATURE_ORDER
        df = pd.DataFrame(X_in, columns=FEATURE_ORDER)
    
    df['ph_hardness'] = df['ph'] * df['Hardness']
    df['chloramines_sulfate_ratio'] = df['Chloramines'] / (df['Sulfate'] + 1e-6)
    
    # Return all columns (original + new)
    return df.values

# --- END OF NEW DEFINITIONS ---


# --- Load the Production-Ready Pipeline ---
PIPELINE_PATH = "water_quality_pipeline.joblib"
pipeline = joblib.load(PIPELINE_PATH)
print("✅ Model pipeline loaded successfully.")

# --- Route to Serve the HTML Page ---
@app.route('/')
def home():
    return render_template('index.html')

# --- Route to Handle Predictions ---
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.form
        feature_dict = {}
        for feature in FEATURE_ORDER:
            feature_dict[feature] = float(data[feature])

        input_data = pd.DataFrame([feature_dict], columns=FEATURE_ORDER)
        
        prediction = pipeline.predict(input_data)
        probabilities = pipeline.predict_proba(input_data)
        
        potability = int(prediction[0])
        confidence = round(probabilities[0][potability] * 100, 2)
        
        response = {
            "potability": potability,
            "probability": confidence,
            "message": "Analysis complete."
        }
        
        return jsonify(response)

    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 400

# --- Run the App ---
if __name__ == '__main__':
    app.run(debug=True)