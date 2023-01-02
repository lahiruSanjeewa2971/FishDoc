import json , time
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
import requests
import shutil
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import load_img , img_to_array
from keras.models import load_model
from tensorflow.keras.preprocessing import image

def get_prediction_fish(filename):
    model = load_model('fish_model.h5')
    classes = ["Betta-Delta","Betta-Rosetail","Betta-Spadetail","GoldFish-Bubble eye","GoldFish-Common goldfish","GoldFish-veiltail","Guppy-Delta tail","Guppy-Double sword","Guppy-Top sword"]
    img_ = image.load_img(filename, target_size=(228, 228))
    img_array = image.img_to_array(img_)
    img_processed = np.expand_dims(img_array, axis=0)
    img_processed /= 255.
    
    prediction = model.predict(img_processed)
    index = np.argmax(prediction)
    
    return str(classes[index]).title() , str(round(np.amax(prediction)*100, 2))

app = Flask(__name__)
@app.route('/fish', methods=['POST'])
def fish():
    
    request_data = request.get_json()

    print(request_data['img_url'])

    image_url = str(request_data['img_url'])
    filename = image_url.split("/")[-1]
    filename = filename.split("?alt=media&token")[0]
    filename = filename.split("-")[0]
    filename = filename.split("%")[1]+'.jpg'

    r = requests.get(image_url, stream = True)

    if r.status_code == 200:
        r.raw.decode_content = True
        
        with open('downloads/'+filename,'wb') as f:
            shutil.copyfileobj(r.raw, f)
            
        print('Image successfully Downloaded: ','downloads/'+filename)
        fish , accuracy =get_prediction_fish('downloads/'+filename)

        json_dump = json.dumps({"main":fish.split("-")[0],"sub":fish.split("-")[1],"accuracy":accuracy,"success":"true","message":"successful"})

        return json_dump
    else:
        print('Image Couldn\'t be retrieved')
        json_dump = json.dumps({"fish":"","sub":"","accuracy":"","success":"false","message":"Image Download Error!"})

        return json_dump

if __name__ == '__main__':
	app.run(host="127.0.0.1", port=9999)