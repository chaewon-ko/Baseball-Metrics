from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List,Dict
from page import *
import sys, os
sys.path.append(os. path.dirname(os.path. abspath(os.path.dirname(__file__))))
from result import *


import warnings
warnings.filterwarnings('ignore')



app = FastAPI()

ordered_player = []
pinch_player =[]

data = [0,0,0,0]
pitcher = ""

class Player(BaseModel) :
    name : str


class Result(BaseModel) :
    result : str
    out : int
    base : int
    score : int

class Page(BaseModel) :
    page : int
    sort : str


origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
async def main():
    return {"hello goodbye"}


@app.post("/selectplayer")
async def select_player(player: Player):
    ordered_player.append(player.name)
    for i in ordered_player:
        print(i)

@app.post("/selectpinch")
async def select_pinch(player: Player):
    pinch_player.append(player.name)
    for i in pinch_player:
        print(i)

@app.post("/selectpitcher")
async def select_pitcher(player: Player):
    pitcher = player.name
    print(pitcher)
     
@app.get("/play")
async def play():
    if(data[2] == 3):
        data[2] %= 3
    
    res, data[1], data[2] = hit_K_BB(ordered_player[data[0]], pitcher, data[1], data[2])
    data[0] = (data[0] + 1) % 9

    data[1], data[3] = Score(data[1],data[3])

    return {"result":res, "base":data[1],"out":data[2], "score":data[3]}

@app.get("/bunt")
async def bunt():
    if(data[2] == 3):
        data[2] %= 3
    
    res, data[1], data[2] = Bunt(ordered_player[data[0]], data[1], data[2])

    data[1], data[3] = Score(data[1],data[3])

    return {"result" : res, "base":data[1], "out":data[2], "score":data[3]}


@app.post("/page")
async def page(page : Page):
    PageData(page.page, page.sort)
    return 1

@app.post("/teampage")
async def teampage(page : Page):
    Filterteam(page.sort)
    return 1