import pandas as pd

def abilCompare(type, name1, name2):
    if(type == "batter"):
        abil = pd.read_csv("../data/Abill/battersAbill.csv")
        basic = pd.read_csv("../data/battersData/battersBasic.csv")
    else :
        abil = pd.read_csv("../data/Abill/pitchersAbill.csv")
        basic = pd.read_csv("../data/pitchersData/pitchersBasic.csv")
    geo1 = abil.loc[abil["이름"] == name1].values.tolist()
    geo2 = abil.loc[abil["이름"] == name2].values.tolist()
    bar1 = basic.loc[basic["이름"] == name1].values.tolist()
    bar2 = basic.loc[basic["이름"] == name2].values.tolist()
    return geo1, geo2, bar1, bar2


