import requests
from bs4 import BeautifulSoup

def getParsedSenatorInfo() -> list[dict[str, str]]:
    # Parse content from Nebraska Legislature Senators page
    url = "https://nebraskalegislature.gov/senators/senator_list.php"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    # Get all senators
    table = soup.find("ul", class_="name_list")
    senators = table.find_all("li", class_="sen-list-item")[0:]

    # Find each senator's name, district, and email
    allSenators = []
    for senator in senators:
        name = senator.find(class_="col-9").text
        district = senator.find(class_="col-3").text

        senatorHref = senator.find("a")["href"]
        senatorUrl = f"https://nebraskalegislature.gov{senatorHref}"
        senatorResponse = requests.get(senatorUrl)
        senatorSoup = BeautifulSoup(senatorResponse.content, "html.parser")

        senatorRow = senatorSoup.find("address", class_="feature-content").text
        lines = [line.lstrip() for line in senatorRow.splitlines()]
        poBox = lines[1]
        email = lines[5][7:]

        senatorInfo = {
            "Name": name,
            "District": district,
            "PO_Box": poBox,
            "Email": email
        }
        allSenators.append(senatorInfo)

    return allSenators

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
        if (userZip == zip):
            return True

    return False