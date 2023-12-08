import pandas as pd

abil = pd.read_csv("../data/Abill/battersAbill.csv")
abil = abil
basic = pd.reas_csv("../data/battersData/battersBasic.csv")
geo1 = abil.loc[abil["이름"] == "양의지"].values.tolist()
geo2 = abil.loc[abil["이름"] == "홍창기"].values.tolist()

bar1 = basic.loc[abil["이름"] == "양의지"].values.tolist()
bar2 = basic.loc[abil["이름"] == "홍창기"].values.tolist()



def abilCompare(type, name1, name2):
    abil = pd.read_csv("../data/Abill/battersAbill.csv")
    abil = abil
    basic = pd.reas_csv("../data/battersData/battersBasic.csv")
    geo1 = abil.loc[abil["이름"] == name1].values.tolist()
    geo2 = abil.loc[abil["이름"] == name2].values.tolist()
    bar1 = basic.loc[abil["이름"] == name1].values.tolist()
    bar2 = basic.loc[abil["이름"] == name2].values.tolist()
    return geo1, geo2, bar1, bar2