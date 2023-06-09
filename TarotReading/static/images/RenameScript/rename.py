import os
import re

folder_path = "static/images"  # Specify the relative path to the folder containing the images

# Get the absolute path to the folder
folder_path = os.path.abspath(folder_path)

# Get a list of all files in the folder
file_list = os.listdir(folder_path)

# Define the renaming pattern regex
pattern = r"\d{2}-(.*?)-img-\d+x\d+-\d+\.(jpg|jpeg)"

# Iterate over each file in the folder
for filename in file_list:
    # Create the current file path by joining the folder path and the filename
    current_file_path = os.path.join(folder_path, filename)

    # Check if the current item is a file
    if os.path.isfile(current_file_path):
        # Extract the new file name
        match = re.search(pattern, filename)
        if match:
            new_file_name = match.group(1)
            new_file_name = new_file_name.replace("-card", "") + ".jpg"

            # Create the new file path by joining the folder path and the new file name
            new_file_path = os.path.join(folder_path, new_file_name)

            # Rename the file
            os.rename(current_file_path, new_file_path)
