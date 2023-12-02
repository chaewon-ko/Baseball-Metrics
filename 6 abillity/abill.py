import pandas as pd

# 경로 위치 수정해야할 것 같긴 함.
basic = pd.read_csv('../data/battersBasic.csv')
clutch = pd.read_csv('../data/battersClutch.csv')
exp = pd.read_csv('../data/battersExp.csv')
PA = pd.read_csv('../data/battersPA.csv')
value = pd.read_csv('../data/battersValue.csv')
hit1 = pd.read_csv('../data/battersHit1.csv')
hit2 = pd.read_csv('../data/battersHit2.csv')
team1 = pd.read_csv('../data/battersTeambat1.csv')
team2 = pd.read_csv('../data/battersTeambat2.csv')
power = pd.read_csv('../data/battersPower.csv')
run = pd.read_csv('../data/battersRun.csv')
steal = pd.read_csv('../data/battersSteal.csv')

def evPower(name):
	isop = float(power.loc[power["이름"]==name]["IsoP"].iloc[0])
	XHpH = float(power.loc[power["이름"]==name]["XH/H"].iloc[0])
	slg = float(basic.loc[basic["이름"]==name]["장타"].iloc[0])
	hr = float(basic.loc[basic["이름"]==name]["홈런"].iloc[0])
	avg = float(basic.loc[basic["이름"]==name]["타율"].iloc[0])
	spd = float(exp.loc[exp["이름"]==name]["Spd"].iloc[0])

# 규정타석 50% 기준으로 min, max value 설정함
	min_isop = 0.032
	max_isop = 0.306

	min_XHpH = 8.2
	max_XHpH = 46.1

	min_slg = 0.251
	max_slg = 0.671
# hr/g으로 바꿔야할듯. 부상 등으로 경기출장 적을수도
	min_hr = 0
	max_hr = 31

	min_avg = 0.203
	max_avg = 0.365

	min_spd = 1.4
	max_spd = 7.9

	p1 = (isop-min_isop)/(max_isop-min_isop)
	p2 = (XHpH-min_XHpH)/(max_XHpH-min_XHpH)
	p3 = (hr-min_hr)/(max_hr-min_hr)
	p4 = (spd-min_spd)/(max_spd-min_spd)

# 가중치 수정해서 결과 변경 가능
	w1 = 5
	w2 = 7
	w3 = 10
	# 부정적인 영향을 주고 싶은데, 음수를 가중치로 설정하면 음수인 점수가 생김(김지찬..) 그래서 찾아보니 좋은 방식은 아니라고 함.
	w4 = 0 

	p = (w1*p1+w2*p2+w3*p3+w4*p4)/(w1+w2+w3+w4)

	return 100 * p;

def evContact(name):
		contact = float(PA.loc[PA["이름"]==name]["컨택%"].iloc[0])
		cut = float(PA.loc[PA["이름"]==name]["2S후커트%"].iloc[0])
		avg = float(basic.loc[basic["이름"]==name]["타율"].iloc[0])

		min_contact = 60.8
		max_contact = 94.3

		min_cut = 58.6
		max_cut = 92.5

		min_avg = 0.203
		max_avg = 0.365


		p1 = (contact-min_contact)/(max_contact-min_contact)
		p2 = (cut-min_cut)/(max_cut-min_cut)
		p3 = (avg-min_avg)/(max_avg-min_avg)

		w1 = 2
		w2 = 3
		w3 = 1

		p = (w1*p1+w2*p2+w3*p3)/(w1+w2+w3)

		return 100 * p


# 상위 100명 타자 출력
top_hr_player = basic.head(100)
for name in top_hr_player['이름']:
	print(name,'Power:' ,int(evPower(name)),' Contact', int(evContact(name)))

