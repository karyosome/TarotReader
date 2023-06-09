import os
import re

folder_path = "/workspaces/codespaces-blank/TarotReading/static/images"  # Specify the path to the folder containing the image files

# Get a list of all files in the folder
file_list = os.listdir(folder_path)

# Iterate over each file in the folder
for filename in file_list:
    # Create the current file path by joining the folder path and the filename
    current_file_path = os.path.join(folder_path, filename)

    # Check if the current item is a file
    if os.path.isfile(current_file_path):
        # Extract the new file name
        new_file_name = re.sub(r"[-\s]tarot", "", filename, flags=re.IGNORECASE).lower()

        # Create the new file path by joining the folder path and the new file name
        new_file_path = os.path.join(folder_path, new_file_name)

        # Rename the file
        os.rename(current_file_path, new_file_path)
