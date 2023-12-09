import pandas as pd

def abilCompare(type, name1, name2):
    if(type == "batter"):
        abil = pd.read_csv("../data/Abill/battersAbill.csv")
        basic = pd.read_csv("../data/battersData/battersBasic.csv")
        geo1 = abil.loc[abil["이름"] == name1].values.tolist()
        geo2 = abil.loc[abil["이름"] == name2].values.tolist()
        bar1 = basic.loc[basic["이름"] == name1]
        bar2 = basic.loc[basic["이름"] == name2]
        bar1 = bar1.loc[:,"득점" : "WPA"].values.tolist()
        bar2 = bar2.loc[:,"득점" : "WPA"].values.tolist()
    else :
        abil = pd.read_csv("../data/Abill/pitchersAbill.csv")
        basic = pd.read_csv("../data/pitchersData/pitchersBasic.csv")
        geo1 = abil.loc[abil["이름"] == name1].values.tolist()
        geo2 = abil.loc[abil["이름"] == name2].values.tolist()
        bar1 = basic.loc[basic["이름"] == name1]
        bar2 = basic.loc[basic["이름"] == name2]
        bar1 = bar1.loc[:,"승":"WPA"].values.tolist()
        bar2 = bar2.loc[:,"승":"WPA"].values.tolist()
    
    return geo1[0], geo2[0], bar1[0], bar2[0]


