from fastapi import APIRouter, Request
import requests
from dotenv import load_dotenv
from newsapi import NewsApiClient
import os
import json
import requests
from bs4 import BeautifulSoup
from readability import Document
# Load the .env file
load_dotenv()


news_router = APIRouter(prefix='/news', tags=['News'])

newsapi = NewsApiClient(api_key=os.getenv('newsAPIKey'))


@news_router.get('/all')
async def get_news():
    all_articles = newsapi.get_everything(q='country',
                                          language='en',
                                          sort_by='publishedAt')
    return all_articles


@news_router.get('/country/{country}')
async def get_country_news(country: str):
    print(country)
    # Завантажуємо дані з JSON-файлу
    country_codes = load_country_codes('api/data/country_codes.json')

    country_code = get_country_code(country, country_codes).lower()
    # print(country_code)

    if country_code is None:
        return {"message": "Country not found"}

    country_codes_str = 'ae ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za'
    country_codes_list = country_codes_str.split()

    if country_code.lower() in country_codes_list:
        # print('yes')
        return newsapi.get_top_headlines(language='en',
                                         country=country_code.lower())
    else:
        # print('no')
        return newsapi.get_everything(q=country.lower(),
                                      language='en',
                                      sort_by='publishedAt')


@news_router.get('/parse-content')
async def parse_content(request: Request):
    query_params = request.query_params
    url = query_params.get("url", default=None)

    # Зробити запит на отримання HTML контенту статті
    article_response = requests.get(url)
    article_html = article_response.text

    # Використати Readability для вилучення основного контенту
    doc = Document(article_html)
    summary = doc.summary()

    # Використати BeautifulSoup для парсингу HTML
    soup = BeautifulSoup(summary, 'html.parser')
    content = soup.get_text()

    return content


def load_country_codes(filename):
    with open(filename, 'r') as file:
        return json.load(file)


def get_country_code(country_name, country_codes):
    return country_codes.get(country_name, "Країна не знайдена")

