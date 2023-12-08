#!/usr/bin/env python
# coding: utf-8

# In[2]:


import pandas as pd
import random as r
import math as m


basic = pd.read_csv('./data/battersBasic.csv')
clutch = pd.read_csv('./data/battersClutch.csv')
exp = pd.read_csv('./data/battersExp.csv')
PA = pd.read_csv('./data/battersPA.csv')
value = pd.read_csv('./data/battersValue.csv')
hit1 = pd.read_csv('./data/battersHit1.csv')
hit2 = pd.read_csv('./data/battersHit2.csv')
team1 = pd.read_csv('./data/battersTeambat1.csv')
team2 = pd.read_csv('./data/battersTeambat2.csv')

def sigmoid(average, vsAverage, num):
    return average - (average-vsAverage)/(1+m.exp(-0.5*(num-8)))




#k, bb, 홈런, 내야, 외야_안타
    


# In[3]:


def hit_K_BB(name, pitcher, base, outcount):
    playerK = exp.loc[exp["이름"] == name]['K%'] * 10
    playerBB = exp.loc[exp["이름"] == name]['BB%'] * 10
    
    
    # vs 결과가 5푼 정도 차이가 날 때
    playerK = sigmoid(playerK, playerK + 50 , 15)
    playerBB = sigmoid(playerBB, playerBB - 50 , 15)
    
    
    playerhit = 1000 - playerK - playerBB
    
    selector = r.randrange(1,1001)
    
    if (selector <= int(playerK)) :
        outcount += 1
        return '삼진아웃', base, outcount
    elif (selector <= int(playerK + playerBB)) :
        if base&1 == 1:
            base += 1
        elif base&1 == 1 and base&2 == 2:
            base += 3
        elif base&1 == 1 and base&2 == 2 and base&4 == 4:
            base += 7
        base += 1
        return '사사구', base, outcount
    else :
        return isHomerun(name,pitcher,base,outcount)


# In[13]:


#타격이 진행된 횟수를 어떻게 구할 것인지 -> inp% 지표를 활용하여 타석수에서 해당 지표를 곱해준다
#외야 타구에 홈런이 포함되어 있는데 어떻게 처리할 것인지 -> 홈런 내야 비율을 따지고 1에서 뺀다
#

def isHomerun(name,pitcher,base,outcount):
    playerHit1 = hit1.loc[hit1["이름"] == name]
    playerHrNum = basic.loc[basic["이름"] == name]['홈런']
    playerInp = playerHit1['InP%']
    playerInp = playerInp.astype(float)
    playerPA = playerHit1['타석']
    playerHitNum = int(playerInp * playerPA / 100)
    playerHrRatio = playerHrNum/playerHitNum
    playerHrRatio *= 1000
    
    playerInfieldRatio = playerHit1['방향_내야%']
    playerInfieldRatio = playerInfieldRatio.astype(float)
    playerInfieldRatio *= 10
    

    #homerun vs 결과가 5푼 정도 차이 날 때
    playerHrRatio = sigmoid(playerHrRatio,playerHrRatio+50,10)
    
    #infieldRatio 비교는 비율로 계산
    playerInfieldRatio = (playerInfieldRatio*2 + (playerInfieldRatio+50)*3)/5
    
    playerOutfieldRatio = 1000 - playerInfieldRatio.values[0] - playerHrRatio.values[0]
    
    selector = r.randrange(1,1001)
    
    
    if(selector <= int(playerHrRatio)) :
        base = base << 4
        base += 8
        return '홈런' , base, outcount
    elif(selector <= playerHrRatio.values[0] + playerInfieldRatio.values[0]):
        return infield(name,base,outcount)
    else:
        return outfield(name,pitcher,base,outcount)
    


# In[5]:


def outfield(name,pitcher,base,outcount):
    playerOutfieldBA = float(hit1.loc[hit1["이름"] == name]['타율_외'].values[0])
    playerBA = float(basic.loc[basic["이름"] == name]['타율'].values[0])
    selector = r.randrange(1,1001)
    playerOutfieldBA *= 1000
    playerBA *= 1000
    
    #고민사항, 외야시 안타 비율로 안타 계산하는데 어떻게 할것인지
    # -> 일단 그냥 타율 비교하여 차이 구하고 그걸로 조정
    playerOutfieldBA += sigmoid(playerBA, playerBA+50, 15) - playerBA
    
    
    if(selector <= playerOutfieldBA):
        return outfieldHit(name,pitcher,base,outcount)
    else:
        return outfieldFO(name,base,outcount)
    


# In[6]:


# 희생 플라이의 경우를 어떻게 생각할 것인지 => 주자 3루의 경우 무조건 희생타 & 주자 2루인 경우 타구의 방향 계산하고 진루타 결정

def outfieldFO(name, base, outcount):
    if(outcount == 2):
        outcount += 1
        return '외야뜬공',base,outcount
    outcount += 1
    
    playerOutfieldCourse = float(hit2.loc[hit2["이름"] == name]['타구방향%_우'].values[0])
    playerOutfieldCourse *= 10
    
    course = 0
    selector = r.randrange(1,1001)
    
    if(selector <= playerOutfieldCourse):
        course = 1
    
    result = '외야뜬공,진루'
    
    if(base & 4  == 4):
        base += 4
        result += '3루->홈'
    if((base & 2 == 2) and (course)):
        base += 2
        result += '2루->3루'
        
    return result, base, outcount
    
    


# In[27]:


# 1루타, 2루타, 3루타 어떻게 결정할 것인가 => n루타(안타 개수 - 내야 안타)
# 안타를 쳤을 때 추가진루는? => H+% 지표 활용하여 추가진루 결정
# 다만 H13(안타시 1루주자 3루 진루)의 경우는 코스 고려하여 결정

def outfieldHit(name,pitcher, base,outcount):
    playerHitNum = int(basic.loc[basic["이름"] == name]['안타'].values[0])
    playerHitNum -= int(hit1.loc[hit1["이름"] == name]['내야안타_개수'].values[0])
    playerHitRight = float(hit2.loc[hit2["이름"] == name]['타구방향%_우'].values[0])
    playerHitLeft = float(hit2.loc[hit2["이름"] == name]['타구방향%_좌'].values[0])
    playerHitCenter = 100 - playerHitRight - playerHitLeft
    playerHitLeft *= 10
    playerHitRight *= 10
    playerHitCenter *= 10
    player2B = int(basic.loc[basic["이름"] == name]['2루타'].values[0])
    player3B = int(basic.loc[basic["이름"] == name]['3루타'].values[0])
    player1B = playerHitNum - player2B - player3B
    
    playerHitplus = float(team2.loc[team2["이름"] == name]['H+_%'].values[0])
    playerHitplus *= 10
    
    
    
    player1BRatio = 1000 * player1B/playerHitNum
    player2BRatio = 1000 * player2B/playerHitNum
    player3Bratio = 1000 * player3B/playerHitNum
    

    
    selector = r.randrange(1,1001)
    selector2 = r.randrange(1,1001)
    selector3 = r.randrange(1,1001)
    

    
    course = 0
    
    # course = 2 left, course = 1 right, course = 0 center
    
    if(selector2 <= playerHitLeft) :
        course = 2
    elif(selector2 <= playerHitLeft + playerHitRight) :
        course = 1
    else :
        course = 0
    
    
    if(selector <= int(player1BRatio)):
        if(course == 1):
            base = base << 2
            base += 1
            return '안타, 추가진루', base, outcount
        else:
            base = base << 1
            base += 1
            return '안타', base, outcount
        
    elif(selector <= int(player1BRatio + player2BRatio)):
        if(selector3 <= int(playerHitplus)):
            base = base << 3
            base += 2
            return '2루타, 추가진루', base, outcount
        else:
            base = base << 2
            base += 2
            return '2루타', base, outcount

    else:
        base = base << 3
        base += 3
        return '3루타', base, outcount


# In[15]:


def infield(name,base,outcount) :
    
    playerInfieldFONum = int(hit1.loc[hit1["이름"] == name]['내야뜬공_개수'].values[0])
    playerHitInp = float(hit1.loc[hit1["이름"] == name]['InP%'].values[0])
    playerPA = int(hit1.loc[hit1["이름"] == name]['타석'].values[0])
    playerInfieldRatio = float(hit1.loc[hit1["이름"] == name]['방향_내야%'].values[0])
    playerHitNum = int(playerHitInp * playerPA / 100)
    playerInfieldNum = int(playerInfieldRatio * playerHitNum / 100)
    playerInfieldGround = playerInfieldNum - playerInfieldFONum
    playerInfieldFORatio = playerInfieldFONum/playerInfieldNum
    
    playerInfieldFORatio *= 1000
    
    selector = r.randrange(1,1001)
    
    if(selector <= playerInfieldFORatio):
        return '내야뜬공', base,outcount
    else:
        return groundBall(name,base,outcount,playerInfieldGround)
    
    


# In[25]:


# 주자 상황별 고려사항이 많음 => 이거는 함수 보여주면서 하나하나 설명해야 할듯..


def groundBall(name,base,outcount,playerInfieldGround):
    
    playerInfieldHitNum = int(hit1.loc[hit1["이름"] == name]['내야안타_개수'].values[0])
    playerInfieldHitRatio = playerInfieldHitNum/playerInfieldGround
    playerInfieldHitRatio *= 1000
    playerForceOutNum = int(hit1.loc[hit1["이름"] == name]['포스o출루'].values[0])
    
    playerOutPlusRatio = float(team2.loc[team2["이름"] == name]['O+_%'].values[0])
    playerOutPlusRatio *= 10
    
    playerDORatio = float(team1.loc[team1["이름"] == name]['병살타%'].values[0])
    playerDORatio *= 10
    
    
    if outcount == 2 or base == 0:
        selector = r.randrange(1,1001)
        if(selector <= int(playerInfieldHitRatio)):
            base = base<<1
            base += 1
            return '내야안타',base,outcount
        else :
            outcount += 1
            return '내야땅볼', base, outcount
    elif base & 1 == 0:
        selector = r.randrange(1,1001)
        if(selector <= int(playerInfieldHitRatio)):
            base = base<<1
            base += 1
            return '내야안타', base, outcount
        else:
            selector2 = r.randrange(1,1001)
            if(selector2 <= int(playerOutPlusRatio)):
                base = base << 1
                outcount += 1
                return '진루타', base, outcount
            else:
                outcount += 1
                return '내야땅볼', base, outcount
    else:
        selector = r.randrange(1,1001)
        if(selector <= int(playerInfieldHitRatio)):
            base = base<<1
            base += 1
            return '내야안타', base, outcount
        elif(selector <= int(playerInfieldHitRatio + playerDORatio)):
            base -= 1
            base = base<<1
            outcount += 2
            return '병살', base, outcount
        else:
            selector2 = r.randrange(1,1001)
            if(selector2 <= int(playerOutPlusRatio)):
                base = base << 1
                outcount += 1
                return '진루타', base, outcount
            else:
                outcount += 1
                return '내야땅볼', base, outcount
            
        

def Bunt(name, base, outcount):
    success = 850
    selector = r.range(1,1001)
    if(selector < success):
        base = base << 1
        outcount += 1
        return 'Bunt+', base, outcount
    else:
        outcount += 1
        return 'Buntx', base, outcount
    


def Score(base,score):
    for i in range(4):
        score += int(not(not(base & (1 << (3+i)))))
        if(not(not(base & (1 << (3+i))))):
            base ^= (1 << (3+i))
    return base, score