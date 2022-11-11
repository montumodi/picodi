# Find all the videos in a particular folder and save image height and width in a json
exiftool -q -r -j -if '$MIMEType =~ m{^video/}' -ImageWidth -ImageHeight -VideoFrameRate -MIMEType . > list.json

# data1.filter(i => (i.ImageWidth <= 1080 || i.ImageWidth <= 1920) && (i.ImageHeight <= 1080 || i.ImageHeight <= 1920))

# command to copy all files from subfolders to a folder
# find ~/Downloads/\ Photos/ -type f -print -exec mv {} ~/Downloads/google_flattened/ \;

