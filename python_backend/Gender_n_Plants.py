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

size=224

def get_classes_betta(data):
  model = load_model('Betta_Gender.h5')
  prob = model.predict(data)[0][0]
  if prob<=0.5:
    return 'Bettta Female', round((1 - prob)*100,2)
  else:
    return 'Betta Male', round(prob*100,2)

def get_prediction_betta(img_path):
  img = load_img(img_path, target_size=(224, 224, 3))
  img = img_to_array(img)
  img = img/255.0
  img = img.reshape(1, 224, 224, 3)
  pred, prob = get_classes_betta(img)
  return pred, prob

def get_classes_goldfish(data):
    models = load_model('GoldFish_Gender.h5')
    prob = models.predict(data)[0][0]
    if prob<=0.5:
        return 'GoldFish Female', round((1 - prob)*100,2)
    else:
        return 'GoldFish Male', round(prob*100,2)

def get_prediction_goldfish(img_path):
    img = load_img(img_path, target_size=(size, size, 3))
    img = img_to_array(img)
    img = img/255.0
    img = img.reshape(1, size, size, 3)
    pred, prob = get_classes_goldfish(img)
    return pred, prob

def get_classes_guppy(data):
    models = load_model('Guppy_Gender.h5')
    prob = models.predict(data)[0][0]
    if prob<=0.5:
        return 'Guppy Male', round((1 - prob)*100,2)
    else:
        return 'Guppy Female', round(prob*100,2)

def get_prediction_guppy(img_path):
    img = load_img(img_path, target_size=(size, size, 3))
    img = img_to_array(img)
    img = img/255.0
    img = img.reshape(1, size, size, 3)
    pred, prob = get_classes_guppy(img)
    return pred, prob

def get_prediction_plants(filename):
    model = load_model('plants_model.h5')
    classes = ["Anubias","Cryptocoryne Parva","Java Moss","Micranthemum Monte Carlo"]
    img_ = image.load_img(filename, target_size=(228, 228))
    img_array = image.img_to_array(img_)
    img_processed = np.expand_dims(img_array, axis=0)
    img_processed /= 255.
    
    prediction = model.predict(img_processed)
    index = np.argmax(prediction)
    
    return str(classes[index]).title() , str(round(np.amax(prediction)*100, 2))

app = Flask(__name__)
@app.route('/plants', methods=['POST'])
def plants():
    
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
        plant , accuracy =get_prediction_plants('downloads/'+filename)

        json_dump = json.dumps({"plant":plant,"accuracy":accuracy,"success":"true","message":"successful"})

        return json_dump
    else:
        print('Image Couldn\'t be retrieved')
        json_dump = json.dumps({"plant":"","accuracy":"","success":"false","message":"Image Download Error!"})

        return json_dump

@app.route('/betta', methods=['POST'])
def betta():
    
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
        gender , accuracy =get_prediction_betta('downloads/'+filename)

        json_dump = json.dumps({"gender":gender.split(" ")[1],"accuracy":accuracy,"success":"true","message":"successful"})

        return json_dump
    else:
        print('Image Couldn\'t be retrieved')
        json_dump = json.dumps({"gender":"","accuracy":"","success":"false","message":"Image Download Error!"})

        return json_dump

@app.route('/guppy', methods=['POST'])
def guppy():
    
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
        gender , accuracy =get_prediction_guppy('downloads/'+filename)

        json_dump = json.dumps({"gender":gender,"accuracy":accuracy,"success":"true","message":"successful"})

        return json_dump
    else:
        print('Image Couldn\'t be retrieved')
        json_dump = json.dumps({"gender":"","accuracy":"","success":"false","message":"Image Download Error!"})

        return json_dump

@app.route('/goldfish', methods=['POST'])
def goldfish():
    
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
        gender , accuracy =get_prediction_goldfish('downloads/'+filename)

        json_dump = json.dumps({"gender":gender,"accuracy":accuracy,"success":"true","message":"successful"})

        return json_dump
    else:
        print('Image Couldn\'t be retrieved')
        json_dump = json.dumps({"gender":"","accuracy":"","success":"false","message":"Image Download Error!"})

        return json_dump

if __name__ == '__main__':
	app.run(host="127.0.0.1", port=8888)


#using this type
#   http://127.0.0.1:8888/betta
#   raw json data
#   {
#   "img_url": "https://firebasestorage.googleapis.com/v0/b/fishapp-78072.appspot.com/o/Copy%20of%2020220827_123513.jpg?alt=media&token=db80d618-7e4d-44a3-93df-5bd54e0e32a8"
#   }