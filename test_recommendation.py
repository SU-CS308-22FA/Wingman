import unittest
from selenium import webdriver
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

class TestRecommendation(unittest.TestCase):
    def setUp(self):
        options = webdriver.ChromeOptions()
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        self.driver = webdriver.Chrome(options=options)
        self.driver.get("http://localhost:3000/")
        time.sleep(1)

    def test_recommendation(self):
        self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div/main[2]/div/div[2]/div/div[2]/button').click()
        time.sleep(1)
        mail = self.driver.find_element(By.XPATH, '/html/body/div/div[1]/div/main/div/form/div[1]/div/input')
        mail.send_keys("admin@spr1.com")
        time.sleep(1)
        passw = self.driver.find_element(By.XPATH, '/html/body/div/div[1]/div/main/div/form/div[2]/div/input')
        passw.send_keys("12345678")
        self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div/main/div/form/button').click()
        time.sleep(2)
        self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div/header/div/div/div[3]/button[5]').click()
        time.sleep(2)
        firstTeam = self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div/center/div[2]/div/div/div[1]/div/div/p').text
        secondTeam = self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div/center/div[2]/div/div/div[3]/div/div/p').text
        self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div/center/div[2]/div/div/div[2]/div/div/div[6]/button').click()
        time.sleep(5)
        matchscore = self.driver.find_element(By.XPATH, '/html/body/div[1]/div[1]/div/div/div[4]/div/div/div/div/div[1]/h5').text
        self.assertTrue(float(matchscore) <= 100 and float(matchscore) >= 0, "Tension score is not properly instantiated.")
        print("1/4 Tension score is accurate, first test has passed. ✅")
        hometeam = self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div/div/div[1]/div/div/div/div/div[2]/center/div/h5').text
        awayteam = self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div/div/div[1]/div/div/div/div/div[2]/center/div/h3[2]').text
        self.assertTrue(firstTeam == hometeam and secondTeam == awayteam, "Team names are not accurate")
        print("2/4 Team names are accurate, second test has passed. ✅")
        self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        firstrecommendation = self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div/div/div[8]/div')
         # Assert that the chart element exists
        self.assertTrue(firstrecommendation, "First recommendation does not exists")
        print("3/4 Tension recommendation card exists, third test has passed. ✅")
        secondrecommendation = self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div/div/div[11]/div') 
        self.assertTrue(secondrecommendation, "Second recommendation does not exists")
        print("4/4 Ratings recommendation card exists, fourth test has passed. ✅")
        time.sleep(4)
        self.driver.execute_script("window.scrollTo(0, 0);")
        time.sleep(3)
        self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div/header/div/div/div[3]/button[5]').click()
        time.sleep(2)
        self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div/center/div[1]/nav/ul/li[14]/button').click()
        time.sleep(1)
        firstTeam = self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div/center/div[3]/div/div/div[1]/div/div/p').text
        secondTeam = self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div/center/div[3]/div/div/div[3]/div/div/p').text
        self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div/center/div[3]/div/div/div[2]/div/div/div[5]/button').click()
        time.sleep(5)
        matchscore = self.driver.find_element(By.XPATH, '/html/body/div[1]/div[1]/div/div/div[4]/div/div/div/div/div[1]/h5').text
        self.assertTrue(float(matchscore) <= 100 and float(matchscore) >= 0, "Tension score is not properly instantiated.")
        print("Second round has started! 1/4 Tension score is accurate, first test has passed. ✅")
        hometeam = self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div/div/div[1]/div/div/div/div/div[2]/center/div/h5').text
        awayteam = self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div/div/div[1]/div/div/div/div/div[2]/center/div/h3[2]').text
        self.assertTrue(firstTeam == hometeam and secondTeam == awayteam, "Team names are not accurate")
        print("2/4 Team names are accurate, second test has passed. ✅")
        self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        firstrecommendation = self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div/div/div[8]/div')
         # Assert that the chart element exists
        self.assertTrue(firstrecommendation, "First recommendation does not exists")
        print("3/4 Tension recommendation card exists, third test has passed. ✅")
        secondrecommendation = self.driver.find_element(By.XPATH, '//*[@id="root"]/div[1]/div/div/div[11]/div') 
        self.assertTrue(secondrecommendation, "Second recommendation does not exists")
        print("4/4 Ratings recommendation card exists, fourth test has passed. ✅")
        time.sleep(3)
        self.driver.execute_script("window.scrollTo(0, 0);")
        time.sleep(3)
        print("All tests has passed! ✅ ")
        def tearDown(self):
                self.driver.close()

 