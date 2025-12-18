
import cv2
import numpy as np
import os
import sys

def crop_author_image(input_path, output_path):
    print(f"Processing {input_path} -> {output_path}")
    try:
        img = cv2.imread(input_path)
        if img is None:
            print(f"Error: Could not read image {input_path}")
            return

        # Convert to HSV to detect yellow
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

        # Yellow range (approximate)
        lower_yellow = np.array([15, 100, 100])
        upper_yellow = np.array([45, 255, 255])

        mask = cv2.inRange(hsv, lower_yellow, upper_yellow)
        
        # Find contours
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        largest_contour = None
        max_area = 0
        
        for cnt in contours:
            area = cv2.contourArea(cnt)
            if area > max_area:
                max_area = area
                largest_contour = cnt
        
        if largest_contour is not None and max_area > 1000:
            x, y, w, h = cv2.boundingRect(largest_contour)
            # Crop exactly the rect
            crop = img[y:y+h, x:x+w]
            
            # Resize
            crop_resized = cv2.resize(crop, (500, 500), interpolation=cv2.INTER_AREA)
            
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            cv2.imwrite(output_path, crop_resized)
            print("Successfully cropped based on yellow circle.")
        else:
            print("Yellow circle not found, falling back to right-side crop.")
            # Fallback
            h, w, c = img.shape
            crop_w = int(w * 0.45)
            center_x = int(w * 0.75)
            center_y = int(h / 2)
            
            side = min(crop_w, h)
            x1 = max(0, center_x - side // 2)
            y1 = max(0, center_y - side // 2)
            x2 = min(w, x1 + side)
            y2 = min(h, y1 + side)
            
            crop = img[y1:y2, x1:x2]
            crop_resized = cv2.resize(crop, (500, 500), interpolation=cv2.INTER_AREA)
            
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            cv2.imwrite(output_path, crop_resized)

    except Exception as e:
        print(f"Exception processing {input_path}: {e}")

# Mapping
# Only one image provided: uploaded_image_1766066258641.jpg for Seyyid Ali Ayaz
mapping = [
    ("/Users/hilalahamd/.gemini/antigravity/brain/d7a6dcf3-3a57-44e0-8bbc-963275221110/uploaded_image_1766066258641.jpg", "public/images/authors/seyyid-ali-ayaz.jpg")
]

for inp, out in mapping:
    crop_author_image(inp, out)
