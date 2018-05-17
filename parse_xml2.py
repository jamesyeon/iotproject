# coding=utf8
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
sql="INSERT INTO public_dust(pm10,pm25) VALUES("+pm10+", "+pm25+")"

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
            
               
