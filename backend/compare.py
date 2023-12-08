import pandas as pd





def abilCompare(type, name1, name2):
    if(type == "pithcer"):
        abil = pd.read_csv("../data/Abill/battersAbill.csv")
        basic = pd.read_csv("../data/battersData/battersBasic.csv")
    else :
        abil = pd.read_csv("../data/Abill/pitchersAbill.csv")
        basic = pd.read_csv("../data/pitcherssData/pitchersBasic.csv")
    geo1 = abil.loc[abil["이름"] == name1].values.tolist()
    geo2 = abil.loc[abil["이름"] == name2].values.tolist()
    bar1 = basic.loc[abil["이름"] == name1].values.tolist()
    bar2 = basic.loc[abil["이름"] == name2].values.tolist()
    return geo1, geo2, bar1, bar2


print(abilCompare("batter", "양의지","홍창기"))