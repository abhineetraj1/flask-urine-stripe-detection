import os
from flask import *
from flask import render_template
import cv2
import numpy as np

def get_colours(filename):
    image = cv2.imread(filename)
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    num_stripes = 10
    stripe_height = image_rgb.shape[0] // num_stripes
    colors = []
    for i in range(num_stripes):
        roi = image_rgb[i*stripe_height: (i+1)*stripe_height, :, :]
        average_color = np.mean(roi, axis=(0, 1))
        average_color_rgb = tuple(map(int, average_color))
        colors.append(average_color_rgb)
    n=0
    y=[["URO",""],["BIL",""],["KET",""],["BLD",""],["PRO",""],["NIT",""],["LEU",""],["GLU",""],["SG",""],["PH",""]]
    for idx, color in enumerate(colors, start=1):
        y[n][1] = str(color)
        n=n+1
    return y

app = Flask(__name__, static_folder="static", template_folder="templates")

@app.route("/", methods=["GET","POST"])
def index():
    if request.method == "GET":
        return render_template("index.html")
    else:
        try:
            w=request.files["file"]
            w.save(w.filename)
            values=get_colours(w.filename)
            os.remove(w.filename)
            return render_template("result.html", values=values)
        except Exception as a:
            open("Error","a").write(str(a))
            return render_template("index.html")


if __name__ == '__main__':
    app.run(debug=True)