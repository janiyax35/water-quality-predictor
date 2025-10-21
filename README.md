<div align="center">
  <img src="https://img.icons8.com/?size=100&id=13101&format=png&color=000000" alt="Water Quality Logo"/>
  
  # 💧 AquaTest: Water Quality Predictor 💧
  
  [![GitHub stars](https://img.shields.io/github/stars/janiyax35/Water_Quality_Prediction?style=social)](https://github.com/janiyax35/Water_Quality_Prediction)
  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
  [![Python](https://img.shields.io/badge/Python-3.9+-blue?logo=python&logoColor=white)](https://www.python.org/)
  [![Flask](https://img.shields.io/badge/Flask-2.x-blue?logo=flask)](https://flask.palletsprojects.com/)
  [![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-FF6F00?logo=tensorflow)](https://www.tensorflow.org/)
  [![Scikit-learn](https://img.shields.io/badge/Scikit--learn-1.x-orange?logo=scikit-learn)](https://scikit-learn.org/)
  [![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple?logo=bootstrap)](https://getbootstrap.com/)

</div>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-features">Features</a> •
  <a href="#-final-outcome">Demo</a> •
  <a href="#-technologies">Technologies</a> •
  <a href="#-model-training--preprocessing">Model Training</a> •
  <a href="#-model-performance--analysis">Model Performance</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-about-me">About Me</a>
</p>

## 🌊 Overview

**AquaTest** is a full-stack web application that uses a deep learning model to predict water potability. Users can enter 9 key chemical parameters to receive an instant prediction on whether the water is safe for human consumption.

This project was built to explore the entire machine learning pipeline: from data preprocessing and EDA to training, tuning, and deploying a neural network with a Flask backend and a modern UI.

The model analyzes 9 key parameters: **pH, Hardness, Solids (TDS), Chloramines, Sulfate, Conductivity, Organic Carbon, Trihalomethanes, and Turbidity.**

<div align="center">
  <img src="https://plus.unsplash.com/premium_photo-1710628263718-367b1cf5828f?q=80&w=1170&auto=format&fit=crop&ixlib-rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Water Banner" width="800"/>
</div>

## ✨ Features

- 🧠 **Deep Learning Model**: Built with **TensorFlow/Keras** for accurate, non-linear predictions.
- 🔍 **Full 9-Parameter Analysis**: Evaluates all critical water quality parameters from the standard Kaggle dataset.
- 📊 **Dynamic Visual Results**: Provides an instant "Safe" / "Unsafe" status with a confidence gauge.
- 📱 **Fully Responsive UI**: Modern frontend built with Bootstrap 5, Particles.js, and AOS animations.
- 🛡️ **Safety-First Recommendations**: Provides actionable advice, especially for "Unsafe" predictions.
- 💫 **Modern UI**: Beautiful animations and user-friendly interface
- 🔬 **Comparative Model Training**: Includes two separate training scripts to demonstrate the impact of hyperparameter tuning on model safety and accuracy.

## 🎬 Demo

<div align="center">
  <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGJraXZ3ZDdyZXJhd2lpem9tbXNycnZybGs3dnExM3Ywc3ZucGZsZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JIX9t2j0ZTN9S/giphy.gif" alt="Demo Animation" width="500"/>
</div>

## 🛠️ Technologies

- **Backend**:
  - Python 3.9+
  - Flask (for the web server and API)
  - **TensorFlow / Keras** (for building the deep learning model)
  - **Scikit-learn** (for data preprocessing, `KNNImputer`, `StandardScaler`)
  - **Imbalanced-learn** (for `SMOTE` to handle class imbalance)
  - Pandas & NumPy (for data manipulation)
    
- **Frontend**:
  - HTML5 / CSS3 / JavaScript
  - Bootstrap 5.3
  - Particles.js (Background animations)
  - AOS Animation Library
  - Font Awesome (Icons)
  - Google Fonts

## 📥 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/janiyax35/Water_Quality_Prediction.git
   cd Water_Quality_Prediction
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv venv

   # On Windows:
   venv\Scripts\activate

   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Setup environment variables** (if needed):
   ```bash
   # Create a .env file
   touch .env
   
   # Add necessary environment variables
   echo "SECRET_KEY=your_secret_key_here" >> .env
   ```

## 🚀 Usage

1. **Start the application**:
   ```bash
   python app.py
   ```

2. **Access the web interface**:
   Open your browser and navigate to `http://localhost:5000`

3. **Enter water parameters**:
   - Input all 9 water quality parameters
   - Click on the "Predict" button
   - View the results and recommendations

4. **Interpreting results**:
   - Green: Water is safe to drink
   - Yellow: Water quality is questionable
   - Red: Water is not potable
   - 
## 💡 Final Outcome
<div align="center">
  <img src="https://github.com/janiyax35/Water_Quality_Prediction/blob/main/assets/SS01.png" alt="Application Screenshot" width="700"/>
  <img src="https://github.com/janiyax35/Water_Quality_Prediction/blob/main/assets/SS02.png" alt="Application Screenshot" width="700"/>
  <img src="https://github.com/janiyax35/Water_Quality_Prediction/blob/main/assets/SS03.png" alt="Application Screenshot" width="700"/>
  <img src="https://github.com/janiyax35/Water_Quality_Prediction/blob/main/assets/SS04.png" alt="Application Screenshot" width="700"/>
</div>

## 📁 Project Structure

```
Water_Quality_Prediction/
├── app.py                  # Main Flask application file
├── water_quality_model.pkl # Trained machine learning model
├── static/
│   ├── css/                # Stylesheet files
│   ├── js/                 # JavaScript files
├── templates/
│   ├── index.html          # Main application page
├── water_potability.csv # Training dataset
├── requirements.txt        # Project dependencies
└── README.md               # Project documentation
```

## 🔬 Model Training & Preprocessing

The core of this project is a robust preprocessing pipeline to handle the notoriously difficult *Water Potability* dataset. Our pipeline addresses three major challenges:

1.  **Handling Missing Data:** The dataset has many missing values. We use `KNNImputer` to fill these gaps by analyzing the nearest neighbors of each sample, which is far more accurate than using a simple mean.
2.  **Class Imbalance:** There are significantly more "Not Potable" samples than "Potable" ones. We use **SMOTE** (Synthetic Minority Over-sampling Technique) on the training data to create a balanced dataset, preventing the model from just "guessing" the majority class.
3.  **Feature Scaling:** The features have vastly different scales (e.g., `pH` from 0-14, `Solids` in the 10,000s). We use `StandardScaler` to normalize all features, which is essential for a neural network to train effectively.

## 📊 Model Performance & Analysis

A key goal for this project was to demonstrate how hyperparameter tuning affects model reliability, especially concerning **False Positives** (the model predicts "Safe" when the water is actually "Unsafe").

We trained two separate models on the *exact same* preprocessed data:

| Feature | Model 1 (Base Model) | Model 2 (Alternative) |
| :--- | :--- | :--- |
| **Model Architecture** | `Dense(64) -> Dense(128) -> Dense(64)` | `Dense(32) -> Dense(32)` |
| **Dropout** | `0.3` | `0.2` |
| **Learning Rate** | `0.001` | `0.01` (Much higher) |
| **Callbacks (Patience)** | `20` (EarlyStopping) | `10` (EarlyStopping) |
| | | |
| **Test Accuracy** | ~67% | ~64% |
| **Precision (Safe)** | **~65%** | ~58% |
| **False Positives** | **~76** | ~89 |

### Analysis

This comparison clearly shows that the **Base Model** is superior. The *Alternative Model's* high learning rate and simpler architecture made it less stable and less precise, resulting in 13 *more* dangerous False Positive predictions than the Base Model.

**This analysis proves that "Accuracy" is a misleading metric for this problem.** A high Precision score and a low False Positive count are far more important for user safety. Both models show that this tool should **only be used for educational purposes** and is not a substitute for a professional lab test.

## 🧪 Data Sources

The model was trained using the Water Quality dataset from Kaggle, which contains water quality metrics for 3276 different water bodies. The dataset includes:

- pH value (0 to 14)
- Hardness (mg/L)
- Total dissolved solids (ppm)
- Chloramines (ppm)
- Sulfate (mg/L)
- Conductivity (μS/cm)
- Organic carbon (ppm)
- Trihalomethanes (μg/L)
- Turbidity (NTU)
- Potability (target variable)

## 🔮 Future Enhancements

- [ ] Implement real-time data collection with IoT sensors
- [ ] Add user accounts for saving and tracking water quality over time
- [ ] Develop a mobile application for field testing
- [ ] Integrate with geographic mapping for regional water quality visualization
- [ ] Add more advanced ML models (ensemble methods, deep learning)

## 👨‍💻 About Me

Hi! I'm Janith Deshan, a passionate about cybersecurity, network systems, secure application development and web developer interested in using technology to solve environmental challenges. This project combines my interest in machine learning with my concern for clean water access.

Feel free to connect with me:

<div align="center">
  <a href="https://github.com/janiyax35"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
  <a href="https://www.linkedin.com/in/janithdeshan/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>
  <a href="mailto:janithmihijaya123@gmail.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"/></a>
</div>

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

<div align="center">
  <p>💧 Making clean water detection accessible through technology 💧</p>
  <p>© 2025 Janith Deshan - All Rights Reserved</p>
</div>
