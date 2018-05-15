from urllib import parse
import urllib.request
import xml.etree.ElementTree as etree

def main():

    #서울공공데이터사용
    key = "LdBPoK4T0XB%2BXZWUgViP82aRquJXJMyk4Jy2BmTJrR78aLnpRWnUkb4tyrm8z8TTDO%2FhnK%2F%2BvuqTpUbtrP1m5Q%3D%3D"
    url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureSidoLIst?sidoName=%EB%85%B8%EC%9B%90%EA%B5%AC&searchCondition=DAILY&pageNo=1&numOfRows=10&ServiceKey=LdBPoK4T0XB%2BXZWUgViP82aRquJXJMyk4Jy2BmTJrR78aLnpRWnUkb4tyrm8z8TTDO%2FhnK%2F%2BvuqTpUbtrP1m5Q%3D%3D'
    #url = 'http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoInqireSvc/getNearbyMsrstnList?tmX=244148.546388&tmY=412423.75772&pageNo=1&numOfRows=10&ServiceKey=LdBPoK4T0XB%2BXZWUgViP82aRquJXJMyk4Jy2BmTJrR78aLnpRWnUkb4tyrm8z8TTDO%2FhnK%2F%2BvuqTpUbtrP1m5Q%3D%3D'
    
    data = urllib.request.urlopen(url).read()

    filename = "sample2.xml"
    f = open(filename, "wb") #다른 사람들의 예제처럼 "w"만 해서 했더니 에러가 발생
    f.write(data)
    f.close()

    #파싱하기
    #tree = etree.parse(filename)
    #root = tree.getroot()

    #for a in root.findall('row'):
    #    print(a.findtext('TITLE'))
    #    print(a.findtext('START_DATE'))
    #    print(a.findtext('PLACE_NAME'))
    #    print(a.findtext('TICKET_INFO'))
    #    print('----------------------')

if __name__ == "__main__":
    main()

