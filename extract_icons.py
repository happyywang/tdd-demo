#!/usr/bin/env python3
"""
Extract individual icons from pyramid.png
"""
from PIL import Image
import os

# Open the pyramid image
img = Image.open('public/pyramid.png')
width, height = img.size

print(f"Image size: {width}x{height}")

# Based on the pyramid.png layout, estimate icon positions
# The image shows three icons vertically aligned
# Top: E2E icon (clipboard with checkmark)
# Middle: Integration icon (overlapping squares)
# Bottom: Unit test icon (grid with pointer)

# These coordinates are estimates and may need adjustment
icons = {
    'e2e-icon.png': {
        'box': (185, 35, 235, 85),  # (left, top, right, bottom)
        'description': 'E2E clipboard icon'
    },
    'integration-icon.png': {
        'box': (185, 135, 235, 185),
        'description': 'Integration overlapping squares icon'
    },
    'unit-test-icon.png': {
        'box': (180, 230, 240, 290),
        'description': 'Unit test grid icon'
    }
}

# Extract and save each icon
for filename, info in icons.items():
    icon = img.crop(info['box'])
    output_path = os.path.join('public', filename)
    icon.save(output_path)
    print(f"Saved {filename} - {info['description']}")
    print(f"  Size: {icon.size}")

print("\nDone! Icons extracted to public/ folder")
