# train_cnn.py
import os
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Dense, Flatten, Dropout
from tensorflow.keras.optimizers import Adam

print("🧠 Training CNN Model for Onion Health...")

# Image size for training
img_size = (128, 128)
batch_size = 4
epochs = 5  # Low for demo — increase later

# Check if training data exists
train_dir = 'training_data'
if not os.path.exists(train_dir):
    print("❌ Folder 'training_data' not found!")
    print("👉 Please create:")
    print("   backend-python/training_data/healthy/")
    print("   backend-python/training_data/spoiled/")
    print("👉 Add a few onion images in each folder.")
    exit()

# Data generator with train/validation split
datagen = ImageDataGenerator(rescale=1./255, validation_split=0.2)

train_gen = datagen.flow_from_directory(
    train_dir,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='binary',
    subset='training'
)

val_gen = datagen.flow_from_directory(
    train_dir,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='binary',
    subset='validation'
)

# Save class mapping
class_labels = {v: k for k, v in train_gen.class_indices.items()}
print("🎯 Classes found:", class_labels)

# Build CNN Model
model = Sequential([
    Conv2D(32, (3,3), activation='relu', input_shape=(128,128,3)),
    MaxPooling2D(2,2),
    
    Conv2D(64, (3,3), activation='relu'),
    MaxPooling2D(2,2),
    
    Conv2D(128, (3,3), activation='relu'),
    MaxPooling2D(2,2),
    
    Flatten(),
    Dense(512, activation='relu'),
    Dropout(0.5),
    Dense(1, activation='sigmoid')  # Binary: healthy (0) or spoiled (1)
])

model.compile(optimizer=Adam(learning_rate=0.001),
              loss='binary_crossentropy',
              metrics=['accuracy'])

# Train the model
print("🚀 Starting training...")
history = model.fit(
    train_gen,
    epochs=epochs,
    validation_data=val_gen,
    verbose=1
)

# Save the trained model
model.save('cnn_model.h5')
print("✅ CNN Model saved as 'cnn_model.h5'")