import requests
import re
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from accounts import *

def getRecipients(userDistrict) -> list[dict[str, str]]:
    # Parse content from full Nebraska Legislature Senators page
    url = "https://nebraskalegislature.gov/senators/senator_list.php"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    # Get all senators
    table = soup.find("ul", class_="name_list")
    senators = table.find_all("li", class_="sen-list-item")[0:]
    # Scrape each senator's information
    allSenators = []
    for senator in senators:
        name = senator.find(class_="col-9").text
        splitName = name.split(", ")
        firstName = splitName[1]
        lastName = splitName[0]
        district = int(senator.find(class_="col-3").text)
        senatorHref = senator.find("a")["href"]
        senatorUrl = f"https://nebraskalegislature.gov{senatorHref}"
        senatorResponse = requests.get(senatorUrl)
        senatorSoup = BeautifulSoup(senatorResponse.content, "html.parser")
        image = senatorSoup.find('img', id='sen-image')['src']
        senatorRow = senatorSoup.find("address", class_="feature-content").text
        lines = [line.lstrip() for line in senatorRow.splitlines()]
        room = lines[1]
        email = lines[5][7:]
        senatorInfo = {
            "firstName": firstName,
            "lastName": lastName,
            "district": district,
            "image": image,
            "email": email,
            "room": room
        }
        allSenators.append(senatorInfo)
    # Sort the senators array by districts closest to the user district
    sorted_senators = sorted(allSenators, key=lambda x: abs(x['district'] - userDistrict))
    return sorted_senators

def findUserRepresentative(userInfo):
    # Parse content from US House of Representatives find your representative
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    driver = webdriver.Chrome(options=chrome_options)
    driver.get('https://www.house.gov/representatives/find-your-representative')
    inputZip = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, 'Find_Rep_by_Zipcode')))
    inputZip.send_keys(userInfo["address"]["zip"])
    button = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, 'submit')))
    button.click()
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, 'RepInfo')))
    repDiv = driver.find_element(By.ID, 'RepInfo')
    repP = repDiv.find_element(By.TAG_NAME, 'p')
    repName = repP.find_element(By.TAG_NAME, 'a').text
    pattern = r"\([^()]*\)"
    cleaned_text = re.sub(pattern, "", repName)
    return cleaned_text

def findUserDistrict(userInfo):
    # Parse content from Nebraska Legislature find user district
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    driver = webdriver.Chrome(options=chrome_options)
    driver.get('https://nebraskalegislature.gov/senators/senator_find.php')
    inputZip = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, 'senators-search')))
    inputZip.send_keys(userInfo["address"]["zip"])
    button = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, 'find-senator-map')))
    button.click()
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, 'district_name')))
    districtName = driver.find_element(By.ID, 'district_name').text
    district = int(''.join(filter(str.isdigit, districtName)))
    return district

def verifyLocation(userZip):
    # Parse content from Nebraska Zip Codes page
    url = "https://www.nebraska-demographics.com/zip_codes_by_population"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    # Get all senators
    table = soup.find("table", class_="ranklist table")
    rows = table.find_all("a")[0:]
    # Check if the user's zip is included in the zips
    for row in rows:
        zip = row.text
        if (str(userZip) == zip):
            return True
    return False