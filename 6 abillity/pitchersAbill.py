import pandas as pd

# 경로 위치 수정해야할 것 같긴 함.
import pandas as pd

# 파일 경로 수정
pitcherData_all = pd.read_csv('../data/pitchersData/pitchersAll.csv')

condition = pitcherData_all['이닝'] > 25

pitcherData = pitcherData_all[condition]
# 160? 162명?


# 구위, 구속, 체력, 멘탈, 제구, 변화?

def movement(name):
		swing_str = str(pitcherData.loc[pitcherData["이름"]==name]["S헛스윙"].iloc[0]).strip()
		cut_str = str(pitcherData.loc[pitcherData['이름']==name]["2S후커트%"].iloc[0]).strip()

		swing = float(swing_str) if swing_str.replace('.', '', 1).isdigit() else 0.0
		cut = float(cut_str) if cut_str.replace('.', '', 1).isdigit() else 0.0

		max_swing, min_swing = 24.3, 7.2
		min_cut, max_cut = 100 - 89.7, 100 - 62.1

		p1 = (swing - min_swing)/(max_swing - min_swing)
		p2 = ((100-cut)-min_cut)/(max_cut - min_cut)

		w1 = 4
		w2 = 6

		p = (w1*p1+w2*p2)/(w1+w2)

		return 100*p;


top_hr_player = pitcherData.head(162)
count = 1
for name in top_hr_player['이름']:
	print(count, name, 'Movement: ', int(movement(name)))
	count+=1

