# test_app.py
import pytest
import httpx
from fastapi.testclient import TestClient
from app.main import app
from api.routes.country import Order, CustomPredict
# Create a TestClient instance
client = TestClient(app)

client = TestClient(app)

@pytest.mark.asyncio
async def test_get_news():
    response = client.get('/news/all')
    assert response.status_code == 200
    articles = response.json()
    assert 'articles' in articles  # Перевіряємо, що в відповіді є ключ 'articles'
    assert isinstance(articles['articles'], list)  # Перевіряємо, що 'articles' є списком

@pytest.mark.asyncio
async def test_get_country_news():
    response = client.get('/news/country/USA')
    assert response.status_code == 200
    country_news = response.json()
    assert 'articles' in country_news  # Перевіряємо, що в відповіді є ключ 'articles'
    assert isinstance(country_news['articles'], list)  # Перевіряємо, що 'articles' є списком


@pytest.mark.asyncio
async def test_parse_content():
    url = 'https://example.com/article'
    response = client.get(f'/news/parse-content?url={url}')
    assert response.status_code == 200
    content = response.text
    assert isinstance(content, str)