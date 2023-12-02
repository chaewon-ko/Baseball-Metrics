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
	min_isop, max_isop, min_XHpH, max_XHpH, min_slg, max_slg, min_hr, max_hr, min_avg, max_avg, min_spd, max_spd = 0.032, 0.306, 8.2, 46.1, 0.251, 0.671, 0, 31, 0.203, 0.365, 1.4, 7.9

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

def evDefense(name):
	RAAdef = float(value.loc[value["이름"]==name]["수비RAA_종합"].iloc[0])

	maxRAAdef, minRAAdef = 15.6, -17.6
	p = (RAAdef - minRAAdef)/(maxRAAdef - minRAAdef)

	return 100 * p

def evBE(name):
	be = float(PA.loc[PA["이름"]==name]["2S후선구%"].iloc[0])
	bb = float(basic.loc[basic["이름"]==name]["볼넷"].iloc[0])

	maxbe, minbe = 51.0, 0.0
	maxbb, minbb = 88, 0

	p1 = (be - minbe)/(maxbe - minbe)
	p2 = (bb - minbb)/(maxbb - minbb)

	w1 = 5
	w2 = 5

	p = (w1*p1+w2*p2)/(w1+w2)

	return 100 * p


def evMental(name):
	avg = float(basic.loc[basic["이름"]==name]["타율"].iloc[0])
	isavg = float(clutch.loc[clutch["이름"]==name]["득점권타율"].iloc[0])
	cl = float(clutch.loc[clutch["이름"]==name]["Clutch"].iloc[0])

	maxavg, minavg = 1.000, 0
	maxisavg, minisavg = 1.000, 0
	diff = avg-isavg
	maxdiff, mindiff = 1.000, -1.000
	maxcl, mincl = 1.88, -1.26

	p1 = (diff-mindiff)/(maxdiff-mindiff)
	p2 = (cl - mincl)/(maxcl - mincl)

	w1 = 3
	w2 = 7

	p = (w1*p1+w2*p2)/(w1+w2)

	return 100 * p

def evSpeed(name):
	spd = float(exp.loc[exp["이름"]==name]["Spd"].iloc[0])

	maxspd, minspd = 7.9, 0.1

	p = (spd - minspd)/(maxspd-minspd)

	return 100 * p


# 상위 100명 타자 출력
top_hr_player = basic.head(100)
for name in top_hr_player['이름']:
	print(name,'Power:' ,int(evPower(name)),' Contact:', int(evContact(name)), ' Defense:', int(evDefense(name)), ' Batting Eyes:', int(evBE(name)), ' Mentality:', int(evMental(name)), ' Speed:', int(evSpeed(name)))

