import pandas as pd

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

def getpowerdata(name):
	isop = float(power.loc[power["이름"]==name]["IsoP"].iloc[0])
	XHpH = float(power.loc[power["이름"]==name]["XH/H"].iloc[0])
	slg = float(basic.loc[basic["이름"]==name]["장타"].iloc[0])
	hr = float(basic.loc[basic["이름"]==name]["홈런"].iloc[0])
	avg = float(basic.loc[basic["이름"]==name]["타율"].iloc[0])
	spd = float(exp.loc[exp["이름"]==name]["Spd"].iloc[0])

	min_isop = 0.032
	max_isop = 0.306

	min_XHpH = 8.2
	max_XHpH = 46.1

	min_slg = 0.251
	max_slg = 0.671

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

	w1 = 5
	w2 = 7
	w3 = 10
	w4 = 0

	p = (w1*p1+w2*p2+w3*p3+w4*p4)/(w1+w2+w3+w4)

	return 100 * p;

top_hr_player = basic.head(100)
for name in top_hr_player['이름']:
	print(name, int(getpowerdata(name)))

