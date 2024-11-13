import cv2
import numpy as np

# Load the pre-trained emotion detection model
# You can replace 'emotion_model.onnx' with your chosen model file
emotion_model = cv2.dnn.readNetFromONNX("emotion_model.onnx")
emotion_classes = [
    "Happy",
    "Sad",
    "Angry",
    "Surprised",
    "Neutral",
]  # Sample emotion classes


def detect_emotions(frame):
    # Preprocess the image
    blob = cv2.dnn.blobFromImage(
        frame, scalefactor=1.0, size=(64, 64), mean=(104, 117, 123)
    )
    emotion_model.setInput(blob)
    predictions = emotion_model.forward()

    # Get emotion with highest score
    emotion_index = np.argmax(predictions)
    emotion = emotion_classes[emotion_index]
    return emotion


# Start camera feed
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    emotion = detect_emotions(frame)
    cv2.putText(
        frame,
        f"Emotion: {emotion}",
        (10, 30),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 255, 0),
        2,
    )
    cv2.imshow("Emotion Detection", frame)

    # Press 'q' to quit the window
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()
