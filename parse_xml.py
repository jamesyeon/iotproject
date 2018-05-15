import xml.etree.ElementTree as ET
tree = ET.parse('response.xml')
root = tree.getroot()

# all items data
print('Start:')

for elem in root:
   for subelem in elem:
       for subsubelem in subelem:
           for subsubsubelem in subsubelem:
               #print(subsubsubelem.tag)
               #print(subsubsubelem.text)
               if subsubsubelem.tag == "pm10Value":
                   print(subsubsubelem.tag, subsubsubelem.text)
               if subsubsubelem.tag == "pm25Value":
                   print(subsubsubelem.tag, subsubsubelem.text)
               
      

