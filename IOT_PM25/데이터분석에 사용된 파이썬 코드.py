import warnings
warnings.filterwarnings("ignore")
import pandas as pd
pd.core.common.is_list_like = pd.api.types.is_list_like
import pandas_datareader.data as web
import numpy as np
import matplotlib.pyplot as plt

from fbprophet import Prophet
from datetime import datetime
'''
path = "c:/Windows/Fonts/D2coding/ttf"
import platform
from matplotlib import font_manager, rc
if platform.system()=='Darwin':
    rc('font', family = 'AppleGothic')
elif platform.system() == 'Windows':
    font_name = font_manager.FontProperties(fname=path).get_name()
    rc('font', family = font_name)
else:
    print('Unknown system ... sorry~~~~')
        
plt.rcParams['axes.unicode_minus']=False
'''
pm10_web = pd.read_csv('10.31~.csv', encoding = 'utf-8', 
                       names = ['date', 'number'], index_col=0)
pm10_web = pm10_web[pm10_web['number'].notnull()]
print(pm10_web.head())

#error 확인

time = np.arange(0,len(pm10_web))
traffic = pm10_web['number'].values
fx = np.linspace(0, time[-1], 1000)

def error(f, x, y):
    return np.sqrt(np.mean((f(x)-y)**2))

fp1 = np.polyfit(time, traffic, 1)
f1 = np.poly1d(fp1)

f2p = np.polyfit(time, traffic, 2)
f2 = np.poly1d(f2p)

f3p = np.polyfit(time, traffic, 3)
f3 = np.poly1d(f3p)

f15p = np.polyfit(time, traffic, 15)
f15 = np.poly1d(f15p)

print(error(f1,time,traffic))
print(error(f2,time,traffic))
print(error(f3,time,traffic))
print(error(f15,time,traffic))

# 에러 그래프 표현

plt.figure(figsize=(10,6))
plt.scatter(time, traffic, s=10)

plt.plot(fx, f1(fx), lw=4, label='f1')
plt.plot(fx, f2(fx), lw=4, label='f2')
plt.plot(fx, f3(fx), lw=4, label='f3')
plt.plot(fx, f15(fx), lw=4, label='f15')

plt.grid(True, linestyle='-', color = '0.75')
plt.legend(loc=2)
plt.show()

#prophet 모듈 이용, forecast 예측

df = pd.DataFrame({'ds':pm10_web.index, 'y':pm10_web['number']})
df.reset_index(inplace=True)
df['ds']=pd.to_datetime(df['ds'], format='%Y-%m-%d %H:%M')
del df['date']

m = Prophet(yearly_seasonality=True)
m.fit(df);

future = m.make_future_dataframe(periods=7)
print(future.head())

forecast = m.predict(future)
print(forecast[['ds','yhat','yhat_lower','yhat_upper']].tail())
print(m.plot(forecast))
print(m.plot_components(forecast))