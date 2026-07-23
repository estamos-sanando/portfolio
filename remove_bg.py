import sys
from PIL import Image

def remove_green(image_path, output_path):
    img = Image.open(image_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # Check if the pixel is mostly green
        # R < 100, G > 150, B < 100
        if item[1] > 100 and item[0] < item[1] - 50 and item[2] < item[1] - 50:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")
    print("Done")

if __name__ == "__main__":
    remove_green(sys.argv[1], sys.argv[2])
