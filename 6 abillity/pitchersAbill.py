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

def ballspeed(name):
	fb_str = str(pitcherData.loc[pitcherData['이름']==name]['평균구속_직구'].iloc[0]).strip()
	sink_str = str(pitcherData.loc[pitcherData['이름']==name]['평균구속_싱커'].iloc[0]).strip()
	
# 직구를 구사하지 않는 투수들 -> 싱커로 대체(싱커가 구속 제일 빠름)
	fbspeed = float(fb_str) if fb_str.replace('.','',1).isdigit() else 0.0
	sinkspeed = float(sink_str) if sink_str.replace('.','',1).isdigit() else 0.0
	speed = max(fbspeed, sinkspeed)

	max_fb, min_fb = 153.0, 132.9
	max_sink, min_sink = 149.9, 123.0

	p1 = (speed-min_sink)/(max_fb-min_sink)

	return 100*p1

# 선발투수와 구원투수의 갭 해결해야 함
def health(name):
	IP_str = str(pitcherData.loc[pitcherData['이름']==name]['이닝'].iloc[0]).strip()

	IP = float(IP_str) if IP_str.replace('.','',1).isdigit() else 0.0

	max_IP, min_IP = 192, 25.2

	p1 = (IP-min_IP)/(max_IP-min_IP)

	return 100*p1
	
def mental(name):
	return 100


def command(name):
	return 100


top_player = pitcherData.head(162)
results = []
for name in top_player['이름']:
	result={
		'이름': name,
		'구위': int(movement(name)),
		'구속': int(ballspeed(name)),
		'체력': int(health(name)),
		'멘탈': int(mental(name)),
		'제구': int(command(name))
	}
	results.append(result)

results_df = pd.DataFrame(results)

results_df.to_csv('pitchersAbill.csv', index=False)

