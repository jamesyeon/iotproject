from urllib import parse
import urllib.request
import xml.etree.ElementTree as etree


    #서울공공데이터사용
key = "LdBPoK4T0XB%2BXZWUgViP82aRquJXJMyk4Jy2BmTJrR78aLnpRWnUkb4tyrm8z8TTDO%2FhnK%2F%2BvuqTpUbtrP1m5Q%3D%3D"
url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureSidoLIst?sidoName=%EC%84%9C%EC%9A%B8&searchCondition=DAILY&pageNo=1&numOfRows=10&ServiceKey=LdBPoK4T0XB%2BXZWUgViP82aRquJXJMyk4Jy2BmTJrR78aLnpRWnUkb4tyrm8z8TTDO%2FhnK%2F%2BvuqTpUbtrP1m5Q%3D%3D'
    #url = 'http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoInqireSvc/getNearbyMsrstnList?tmX=244148.546388&tmY=412423.75772&pageNo=1&numOfRows=10&ServiceKey=LdBPoK4T0XB%2BXZWUgViP82aRquJXJMyk4Jy2BmTJrR78aLnpRWnUkb4tyrm8z8TTDO%2FhnK%2F%2BvuqTpUbtrP1m5Q%3D%3D'
    
data = urllib.request.urlopen(url).read()

filename = "sample2.xml"
f = open(filename, "wb") #다른 사람들의 예제처럼 "w"만 해서 했더니 에러가 발생
f.write(data)
f.close()


import xml.etree.ElementTree as ET
tree = ET.parse('sample2.xml')
root = tree.getroot()

found=False
done=False
pm10=''
pm25=''
# all items data
#print('Start:')

for elem in root:
   for subelem in elem:
       for subsubelem in subelem:
           for subsubsubelem in subsubelem:
               #print(subsubsubelem.tag)
               #print(subsubsubelem.text)
               if done == True:
                   break
               if subsubsubelem.tag == "cityName" and subsubsubelem.text == "노원구":
                  #print(subsubsubelem.text)
                   found=True
              
               if subsubsubelem.tag == "pm10Value" and found==True:
                   #print(subsubsubelem.tag, subsubsubelem.text)
                   pm10=subsubsubelem.text
               if subsubsubelem.tag == "pm25Value" and found==True:
                   #print(subsubsubelem.tag, subsubsubelem.text)
                   pm25=subsubsubelem.text
                   done=True
print(pm10, pm25)

#!/usr/bin/python
import MySQLdb

#Open database connection
db=MySQLdb.connect("localhost","sensor","mypassword","data")

#prepare a cursor object using cursor() method
cursor=db.cursor()

#Prepare SQL query to INSERT a record into the database.
sql='INSERT INTO public_dust(pm10,pm25) VALUES('+pm10+', '+pm25+')'

try:
#Execute the SQL command 
	cursor.execute(sql)
#Commit your changes in the database
	db.commit()

except: 
#Rollback in case there is any error
    db.rollback()

#disconnect from server
db.close()
            
               
