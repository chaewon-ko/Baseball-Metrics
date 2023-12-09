import pandas as pd


all = pd.read_csv('./data/battersAll.csv')

def PageData(i,sort):
    all2 = all.sort_values(by=[sort], ascending=False)[(i-1)*30:i*30]
    all2 = all2[["이름","팀/포지션","타율","볼넷","삼진","병살","장타","출루","득점권타율","phLI","FO/GO", "BB/K"]]
    all2.to_csv('../data/response/response.csv',index=False)


def FilterTeam(team):
    all2 = all.dropna(subset=['팀/포지션'], how ='any', axis=0)
    filtering = all2['팀/포지션'].str.contains(team)
    all2 = all2[filtering]
    all2 = all2.sort_values(by=['타율'], ascending=False)
    all2 = all2[["이름","팀/포지션","타율","볼넷","삼진","병살","장타","출루","득점권타율","phLI","FO/GO", "BB/K"]]
    all2.to_csv('../data/response/response.csv', index=False)


PageData(1,'타율')


