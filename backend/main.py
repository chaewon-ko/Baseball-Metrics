from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List,Dict
import sys, os
from page import *
from compare import *
sys.path.append(os. path.dirname(os.path. abspath(os.path.dirname(__file__))))
from result import *


import warnings
warnings.filterwarnings('ignore')



app = FastAPI()

ordered_player = []
pinch_player =[]

data = [0,0,0,0,0,0,0]
pitcher = ""

score = [0,0,0,0,0,0,0,0,0]
inning = 0;

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


class Team(BaseModel) :
    team : str

class Compare(BaseModel) :
    type : str
    player1 : str
    player2 : str


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
    for i in range(7):
        data[i] = 0
    for i in range(9):
        score[i] = 0
     
@app.get("/play")
async def play():
    if(data[2] == 3):
        data[2] %= 3
        data[6] += 1
        data[1] = 0

    
    res, data[1], data[2] = hit_K_BB(ordered_player[data[0]], pitcher, data[1], data[2])
    data[0] = (data[0] + 1) % 9
    tmp = data[3]
    data[1], data[3] = Score(data[1],data[3])
    score[data[6]] += data[3] - tmp

    if(res == '사사구') :
        data[5] += 1
    if(res == '홈런' or res == '2루타' or res == '2루타, 추가진루' or res == '3루타' or res == '내야안타' or res == '안타' or res == '안타, 추가진루'):
        data[4] += 1

    if(data[2] == 3): 
        data[1] = 0
    print(data[0],data[1],data[2],data[3],data[4],data[5])
    print(score[data[6]])
    return {"result":res, "base":data[1],"out":data[2], "score":data[3], "hit":data[4], "BB" : data[5], "inningScore" : score}

@app.get("/bunt")
async def bunt():
    if(data[2] == 3):
        data[2] %= 3
        data[6] += 1
        data[1] = 0
    
    res, data[1], data[2] = Bunt(ordered_player[data[0]], data[1], data[2])
    data[0] = (data[0] + 1) % 9
    tmp = data[3]
    data[1], data[3] = Score(data[1],data[3])
    score[data[6]] += data[3] - tmp

    if(data[2] == 3):
        data[1] = 0

    return {"result":res, "base":data[1],"out":data[2], "score":data[3], "hit":data[4], "BB" : data[5], "inningScore" : score}


@app.post("/page")
async def page(page : Page):
    PageData(page.page, page.sort)
    return 1

@app.post("/teampage")
async def teampage(team : Team):
    FilterTeam(team.team)
    return 1


@app.post("/compare")
async def compare(compare:Compare) :
    geo1, geo2, bar1, bar2 = abilCompare(compare.type, compare.name1, compare.name2)
    return {"geo1" : geo1, "geo2" : geo2, "bar1": bar1, "bar2" : bar2 }

